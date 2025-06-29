import db from '../../db/db';
import { embeddingTasks, EmbeddingTask, NewEmbeddingTask } from '../../db/schema/embedding.task';
import { projects } from '../../db/schema/project';
import { eq, and, desc, sql, or } from 'drizzle-orm';
import { AppError } from '../../utils/http';
import axios from 'axios';
import { envConfig } from '../../configs/envConfig';
import { getPaginatedData, getPagination } from '../../utils/common';
import { ListQuery } from '../../types/types';

interface EmbeddingPaper {
  paperId: number;
  title: string;
  blobUrl: string;
  status: 'pending' | 'processing' | 'success' | 'failed';
  errorMessage?: string;
}

interface CreateEmbeddingTaskData {
  projectId: number;
}

interface ExternalUploadResponse {
  success: boolean;
  searchId: number;
  totalPapers: number;
  uploadedCount: number;
  papers: Array<{
    paperId: number;
    title: string;
    blobUrl: string;
    status: string;
  }>;
}

interface ExternalEmbeddingResponse {
  success: boolean;
  taskId: string;
  message: string;
}

// Helper: filter embedding tasks by keyword (taskId or status)
function buildEmbeddingTaskKeywordFilter(keyword: string) {
  if (!keyword) return undefined;
  return or(
    sql`LOWER(${embeddingTasks.taskId}) LIKE LOWER('%' || ${keyword} || '%')`,
    sql`LOWER(${embeddingTasks.status}) LIKE LOWER('%' || ${keyword} || '%')`
  );
}

export class EmbeddingTaskService {
  /**
   * Create a new embedding task by fetching papers from external service
   */
  async createEmbeddingTask(
    userId: number,
    data: CreateEmbeddingTaskData
  ): Promise<EmbeddingTask> {
    // Verify project belongs to user and get searchId
    const [project] = await db
      .select()
      .from(projects)
      .where(and(eq(projects.id, data.projectId), eq(projects.userId, userId)))
      .limit(1);

    if (!project) {
      throw new AppError('Project not found or access denied', 404);
    }

    if (!project.searchId) {
      throw new AppError('Project does not have a search ID', 400);
    }

    // Fetch papers from external service using the project's searchId
    const papersResponse = await this.fetchPapersFromExternalService(project.searchId);

    // Convert external papers to our format with pending status
    const papersWithPendingStatus: EmbeddingPaper[] = papersResponse.papers.map((paper: any) => ({
      paperId: paper.paperId,
      title: paper.title,
      blobUrl: paper.blobUrl,
      status: 'pending' as const // Override external status to pending
    }));

    // TODO: Call external embedding service to initiate processing
    // const externalTaskId = await this.initiateExternalEmbedding(papersWithPendingStatus);
    
    // Generate a temporary task ID since we're not calling external service yet
    const tempTaskId = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create embedding task in database
    const newTask: NewEmbeddingTask = {
      userId,
      projectId: data.projectId,
      taskId: tempTaskId, // Using temp task ID instead of external one
      searchId: parseInt(project.searchId),
      totalPapers: papersResponse.totalPapers,
      uploadedCount: papersResponse.uploadedCount,
      papers: papersWithPendingStatus,
      status: 'pending',
    };

    const [createdTask] = await db
      .insert(embeddingTasks)
      .values(newTask)
      .returning();

    return createdTask;
  }

  /**
   * Get all embedding tasks for a user with pagination
   */
  async getUserEmbeddingTasks(
    userId: number,
    options: ListQuery
  ) {
    const { page, size, keyword } = options;
    const pagination = getPagination({
      page: page,
      size: size,
    });
    
    // Build where clause with keyword filter and userId filter
    const keywordFilter = buildEmbeddingTaskKeywordFilter(keyword || '');
    const userFilter = eq(embeddingTasks.userId, userId);
    
    const whereClause = keywordFilter 
      ? and(keywordFilter, userFilter)
      : userFilter;
    
    const dataQuery = db
      .select()
      .from(embeddingTasks)
      .where(whereClause)
      .orderBy(desc(embeddingTasks.createdAt))
      .limit(pagination.limit)
      .offset(pagination.offset);
      
    const countQuery = db
      .select({ count: sql`count(*)` })
      .from(embeddingTasks)
      .where(whereClause);
      
    return getPaginatedData(dataQuery, countQuery, options, pagination);
  }

  /**
   * Get embedding task by ID for a specific user
   */
  async getEmbeddingTaskById(userId: number, taskId: number): Promise<EmbeddingTask> {
    const [task] = await db
      .select()
      .from(embeddingTasks)
      .where(and(eq(embeddingTasks.id, taskId), eq(embeddingTasks.userId, userId)))
      .limit(1);

    if (!task) {
      throw new AppError('Embedding task not found', 404);
    }

    return task;
  }

  /**
   * Update embedding task status via webhook
   */
  async updateTaskStatus(
    externalTaskId: string,
    status: string,
    papers?: EmbeddingPaper[]
  ): Promise<EmbeddingTask> {
    const [existingTask] = await db
      .select()
      .from(embeddingTasks)
      .where(eq(embeddingTasks.taskId, externalTaskId))
      .limit(1);

    if (!existingTask) {
      throw new AppError('Embedding task not found', 404);
    }

    const updateData: Partial<EmbeddingTask> = {
      status,
      updatedAt: new Date(),
    };

    // Update papers if provided
    if (papers) {
      updateData.papers = papers;
    }

    const [updatedTask] = await db
      .update(embeddingTasks)
      .set(updateData)
      .where(eq(embeddingTasks.taskId, externalTaskId))
      .returning();

    return updatedTask;
  }

  /**
   * Delete embedding task (only if it belongs to the user)
   */
  async deleteEmbeddingTask(userId: number, taskId: number): Promise<void> {
    const result = await db
      .delete(embeddingTasks)
      .where(and(eq(embeddingTasks.id, taskId), eq(embeddingTasks.userId, userId)))
      .returning();

    if (result.length === 0) {
      throw new AppError('Embedding task not found or access denied', 404);
    }
  }

  /**
   * Get embedding tasks by project ID for a specific user
   */
  async getEmbeddingTasksByProject(
    userId: number,
    projectId: number
  ): Promise<EmbeddingTask[]> {
    return await db
      .select()
      .from(embeddingTasks)
      .where(
        and(
          eq(embeddingTasks.userId, userId),
          eq(embeddingTasks.projectId, projectId)
        )
      )
      .orderBy(desc(embeddingTasks.createdAt));
  }

  /**
   * Initiate external embedding service
   */
  private async initiateExternalEmbedding(papers: EmbeddingPaper[]): Promise<string> {
    try {
      const response = await axios.post<ExternalEmbeddingResponse>(
        `${envConfig.EXTERNAL_SERVICE_BASE_URL}/embedding/initiate`,
        {
          papers: papers.map(paper => ({
            paperId: paper.paperId,
            title: paper.title,
            blobUrl: paper.blobUrl
          }))
        },
        {
          headers: {
            'Authorization': `Bearer ${envConfig.THINKSOURCE_API_TOKEN}`,
            'Content-Type': 'application/json'
          },
          timeout: 30000 // 30 seconds timeout
        }
      );

      if (!response.data.success || !response.data.taskId) {
        throw new AppError('Failed to initiate external embedding service', 500);
      }

      return response.data.taskId;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || 'External embedding service error';
        throw new AppError(`External service error: ${message}`, 500);
      }
      throw new AppError('Failed to initiate embedding task', 500);
    }
  }

  /**
   * Fetch papers from external service using searchId
   */
  private async fetchPapersFromExternalService(searchId: string): Promise<ExternalUploadResponse> {
    const url = `${envConfig.EXTERNAL_SERVICE_BASE_URL}/api/upload/search/${searchId}`;
    
    try {
      const response = await axios.post<ExternalUploadResponse>(
        url,
        {}, // Empty body for POST request
        {
          headers: {
            'Authorization': `Bearer ${envConfig.THINKSOURCE_API_TOKEN}`,
            'Content-Type': 'application/json'
          },
          timeout: 30000 // 30 seconds timeout
        }
      );

      if (!response.data.success) {
        throw new AppError('Failed to fetch papers from external service', 500);
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || 'External service error while fetching papers';
        throw new AppError(`External service error: ${message}`, 500);
      }
      
      throw new AppError('Failed to fetch papers from external service', 500);
    }
  }

  /**
   * Get embedding task by external task ID (for webhook/status checks)
   */
  async getTaskByExternalId(externalTaskId: string): Promise<EmbeddingTask | null> {
    const [task] = await db
      .select()
      .from(embeddingTasks)
      .where(eq(embeddingTasks.taskId, externalTaskId))
      .limit(1);

    return task || null;
  }
}

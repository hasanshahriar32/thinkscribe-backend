import { Request, Response, NextFunction } from 'express';
import { EmbeddingTaskService } from './embedding-task.service';
import { getAuthenticatedUserId } from '../../utils/auth';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { AppError } from '../../utils/http';

const embeddingTaskService = new EmbeddingTaskService();

export class EmbeddingTaskController {
  /**
   * Create a new embedding task
   * POST /embedding-tasks
   */
  createEmbeddingTask = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = await getAuthenticatedUserId(req, next);
    const { projectId } = req.body;

    const embeddingTask = await embeddingTaskService.createEmbeddingTask(userId, {
      projectId
    });

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'Embedding task created successfully!',
      data: embeddingTask,
    });
  });

  /**
   * Get all embedding tasks for the authenticated user
   * GET /embedding-tasks
   */
  getEmbeddingTasks = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = await getAuthenticatedUserId(req, next);
    const { page, size, keyword, sort, order } = req.query;

    const paginationOptions = {
      page: Number(page),
      size: Number(size),
      keyword: keyword as string,
      sort: sort as string,
      order: order as 'asc' | 'desc',
    };

    const result = await embeddingTaskService.getUserEmbeddingTasks(userId, paginationOptions);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Successfully Retrieved!',
      data: result,
    });
  });

  /**
   * Get embedding task by ID
   * GET /embedding-tasks/:id
   */
  getEmbeddingTaskById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = await getAuthenticatedUserId(req, next);
    const taskId = Number(req.params.id);

    const embeddingTask = await embeddingTaskService.getEmbeddingTaskById(userId, taskId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Successfully Retrieved!',
      data: embeddingTask,
    });
  });

  /**
   * Get embedding tasks by project ID
   * GET /embedding-tasks/project/:projectId
   */
  getEmbeddingTasksByProject = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = await getAuthenticatedUserId(req, next);
    const projectId = Number(req.params.projectId);

    const embeddingTasks = await embeddingTaskService.getEmbeddingTasksByProject(userId, projectId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Successfully Retrieved!',
      data: embeddingTasks,
    });
  });

  /**
   * Delete embedding task
   * DELETE /embedding-tasks/:id
   */
  deleteEmbeddingTask = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = await getAuthenticatedUserId(req, next);
    const taskId = Number(req.params.id);

    await embeddingTaskService.deleteEmbeddingTask(userId, taskId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Successfully Deleted!',
      data: null,
    });
  });

  /**
   * Webhook endpoint for status updates from external embedding service
   * POST /embedding-tasks/webhook/status-update
   */
  webhookStatusUpdate = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { taskId, status, papers, message } = req.body;

    // Verify webhook authenticity (you might want to add signature verification)
    const webhookToken = req.headers['x-webhook-token'];
    if (webhookToken !== process.env.WEBHOOK_SECRET_TOKEN) {
      throw new AppError('Invalid webhook token', 401);
    }

    const updatedTask = await embeddingTaskService.updateTaskStatus(taskId, status, papers);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Status updated successfully',
      data: {
        taskId: updatedTask.taskId,
        status: updatedTask.status,
        updatedAt: updatedTask.updatedAt
      },
    });
  });

  /**
   * Get task status (public endpoint for external services)
   * GET /embedding-tasks/status/:taskId
   */
  getTaskStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { taskId } = req.params;

    // This is a simple status check endpoint that doesn't require user authentication
    // but you might want to add API key authentication for security
    const task = await embeddingTaskService.getTaskByExternalId(taskId);
    
    if (!task) {
      throw new AppError('Task not found', 404);
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Task status retrieved',
      data: {
        taskId: task.taskId,
        status: task.status,
        totalPapers: task.totalPapers,
        completedPapers: task.papers.filter((p: any) => p.status === 'success').length,
        failedPapers: task.papers.filter((p: any) => p.status === 'failed').length,
        updatedAt: task.updatedAt
      },
    });
  });
}

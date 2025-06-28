import { NextFunction, Request, Response } from 'express';
import { AppError, responseData } from '../../utils/http';
import { MESSAGES } from '../../configs/messages';
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
  projectExists,
} from './project.service';
import { ListQuery } from '../../types/types';
import { Request as ExpressRequest } from 'express';
import { JwtPayload } from '../../types/express';

export type AuthedRequest = ExpressRequest & { user?: JwtPayload };

export async function getAllProjects(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await getProjects(req.query as unknown as ListQuery);
    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.RETRIVE,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function getOneProject(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const project = await getProject(req.params.id);
    if (!project) {
      throw new AppError('Project not found', 404);
    }
    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.RETRIVE,
      data: project,
    });
  } catch (error) {
    next(error);
  }
}

export async function createOneProject(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { title, description } = req.body;
    const result = await createProject({ title, description });
    responseData({
      res,
      status: 201,
      message: MESSAGES.SUCCESS.CREATE,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateOneProject(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const projectId = req.params.id;
    
    // Check if project exists
    const exists = await projectExists(projectId);
    if (!exists) {
      throw new AppError('Project not found', 404);
    }

    const result = await updateProject({
      id: projectId,
      data: req.body,
    });
    
    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.UPDATE,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteOneProject(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const projectId = req.params.id;
    
    // Check if project exists
    const exists = await projectExists(projectId);
    if (!exists) {
      throw new AppError('Project not found', 404);
    }

    await deleteProject(projectId);
    
    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.DELETE,
      data: { id: projectId },
    });
  } catch (error) {
    next(error);
  }
}

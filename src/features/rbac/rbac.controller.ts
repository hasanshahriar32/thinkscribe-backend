import { Request, Response } from 'express';
import { responseData, throwErr } from '../../utils/http';
import { MESSAGES } from '../../configs/messages';
import { getActions } from './rbac.service';
import { ExpressError } from '../../types';

export async function getAllActions(req: Request, res: Response) {
  try {
    const result = await getActions();

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.RETRIVE,
      data: result,
    });
  } catch (error) {
    throwErr({
      res,
      error,
      status: 500,
      message: 'Internal Server Error',
    });
  }
}

import { NextFunction, Request, Response } from 'express';
import { AppError, responseData } from '../../utils/http';
import { MESSAGES } from '../../configs/messages';
import {
  createProductCategory,
  deleteProductCategory,
  getProductCategory,
  getProductCategories,
  updateProductCategory,
  getExistingProductCategory,
  softDeleteMultiProductCategories,
  softDeleteProductCategory,
  deleteMultiProductCategories,
} from './product-category.service';
import db from '../../db/db';
import { Knex } from 'knex';
import { ListQuery } from '../../types/types';

export async function getAllProductCategories(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await getProductCategories(
      req.query as unknown as ListQuery
    );

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

export async function getOneProductCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const product = await getProductCategory(req.params.id);

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.RETRIVE,
      data: product,
    });
  } catch (error) {
    next(error);
  }
}

export async function createOneProductCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    const existingProductCategory = await getExistingProductCategory({
      name: req.body.name,
    });
    if (existingProductCategory)
      throw new AppError(`${req.body.name} is already existed!`, 400);

    const payload = {
      name: req.body.name,
      created_by: req.body.user.id,
    };
    const createdProductCategory = await createProductCategory(payload, trx);

    await trx.commit();

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.CREATE,
      data: createdProductCategory,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}

export async function updateOneProductCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    const payload = {
      name: req.body.name,
      updated_by: req.body.user.id,
    };
    const updatedProductCategory = await updateProductCategory(
      {
        id: req.params.id,
        data: payload,
      },
      trx
    );

    await trx.commit();

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.UPDATE,
      data: updatedProductCategory,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}

export async function deleteOneProductCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    const isExistedProductCategory = await getExistingProductCategory({
      id: req.params.id,
    });

    if (!isExistedProductCategory)
      throw new AppError(MESSAGES.ERROR.BAD_REQUEST, 400);

    const deletedProductCategory = await deleteProductCategory(req.params.id);

    await trx.commit();

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.DELETE,
      data: deletedProductCategory,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}

export async function deleteProductCategories(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    await deleteMultiProductCategories(req.body.ids, trx);

    await trx.commit();

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.DELETE,
      data: null,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}

export async function softDeleteOneProductCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    const isExistedProductCategory = await getExistingProductCategory({
      id: req.params.id,
    });

    if (!isExistedProductCategory)
      throw new AppError(MESSAGES.ERROR.BAD_REQUEST, 400);

    const deletedProductCategory = await softDeleteProductCategory(
      req.params.id
    );

    await trx.commit();

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.DELETE,
      data: deletedProductCategory,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}

export async function softDeleteProductCategories(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    await softDeleteMultiProductCategories(req.body.ids, trx);

    await trx.commit();

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.DELETE,
      data: null,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}

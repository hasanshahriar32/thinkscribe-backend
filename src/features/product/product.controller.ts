import { NextFunction, Request, Response } from 'express';
import { AppError, responseData } from '../../utils/http';
import { MESSAGES } from '../../configs/messages';
import {
  createMultiProducts,
  createProduct,
  deleteMultiProducts,
  deleteProduct,
  getExistingProduct,
  getProduct,
  getProducts,
  softDeleteMultiProducts,
  softDeleteProduct,
  updateProduct,
} from './product.service';
import db from '../../db/db';
import { Knex } from 'knex';
import { ListQuery } from '../../types/types';
import { v4 as uuidv4 } from 'uuid';

export async function getAllProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await getProducts(req.query as unknown as ListQuery);

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

export async function getOneProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const product = await getProduct(req.params.id);

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

export async function createOneProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    const existingProduct = await getExistingProduct({ name: req.body.name });
    if (existingProduct)
      throw new AppError(`${req.body.name} is already existed!`, 400);

    const payload = {
      id: uuidv4(),
      name: req.body.name,
      price: req.body.price,
      category_id: req.body.category_id,
      created_by: req.body.user.id,
    };
    const createdProduct = await createProduct(payload, trx);

    await trx.commit();

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.CREATE,
      data: createdProduct,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}

export async function createProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    const payload = req.body.products.map((pd: Record<string, unknown>) => ({
      id: uuidv4(),
      name: pd.name,
      price: pd.price,
      category_id: pd.category_id,
      created_by: req.body.user.id,
    }));
    const createdProducts = await createMultiProducts(payload, trx);

    await trx.commit();

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.CREATE,
      data: createdProducts,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}

export async function updateOneProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    const payload = {
      name: req.body.name,
      price: req.body.price,
      category_id: req.body.category_id,
      updated_by: req.body.user.id,
    };
    const updatedProduct = await updateProduct(
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
      data: updatedProduct,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}

export async function deleteOneProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    const deletedProduct = await deleteProduct(req.params.id, trx);

    await trx.commit();

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.DELETE,
      data: deletedProduct,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}

export async function deleteProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    console.log('controller', req.body.ids);
    const deletedProducts = await deleteMultiProducts(req.body.ids, trx);

    await trx.commit();

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.DELETE,
      data: deletedProducts,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}

export async function softDeleteOneProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    const isExistedProduct = await getExistingProduct({
      id: req.params.id,
    });

    if (!isExistedProduct) throw new AppError(MESSAGES.ERROR.BAD_REQUEST, 400);

    const deletedProduct = await softDeleteProduct(req.params.id);

    await trx.commit();

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.DELETE,
      data: deletedProduct,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}

export async function softDeleteProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    const deletedProducts = await softDeleteMultiProducts(req.body.ids, trx);

    await trx.commit();

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.DELETE,
      data: deletedProducts,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}

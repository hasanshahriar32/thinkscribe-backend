import { NextFunction, Request, Response } from 'express';
import { AppError, responseData } from '../../utils/http';
import { MESSAGES } from '../../configs/messages';
import {
  createProduct,
  deleteProduct,
  getExistingProduct,
  getProduct,
  getProducts,
  updateProduct,
} from './event-emit.service';
import db from '../../db/db';
import { Knex } from 'knex';
import { ListQuery } from '../../types/types';
import { eventBus } from '../../events/event-bus';

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
      name: req.body.name,
      price: req.body.price,
      category_id: req.body.category_id,
      created_by: req.body.user.id,
    };
    const createdProduct = await createProduct(payload, trx);

    /**
     * * This event need to be subscribed by
     * * product module
     * * product category module
     */
    // eventBus.emit('create-product', (req, trx) => {});

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
    const deletedProduct = await deleteProduct(req.params.id);

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

import { Router } from 'express';
import validator from './product.validator';
import { validateRequest } from '../../middlewares/validation';
import {
  createOneProduct,
  deleteOneProduct,
  getAllProducts,
  getOneProduct,
  updateOneProduct,
} from './product.controller';

const productRoutes = Router();

productRoutes.get(
  '/products',
  validateRequest(validator.select),
  getAllProducts
);
productRoutes.get(
  '/products/:id',
  validateRequest(validator.detail),
  getOneProduct
);
productRoutes.post(
  '/products',
  validateRequest(validator.create),
  createOneProduct
);
productRoutes.post(
  '/products/create-multi',
  validateRequest(validator.createMulti),
  createOneProduct
);
productRoutes.patch(
  '/products/:id',
  validateRequest(validator.update),
  updateOneProduct
);
productRoutes.delete(
  '/products/:id',
  validateRequest(validator.delete),
  deleteOneProduct
);
productRoutes.post(
  '/products/delete-multi',
  validateRequest(validator.deleteMulti),
  deleteOneProduct
);
productRoutes.delete(
  '/products/soft-delete/:id',
  validateRequest(validator.delete),
  deleteOneProduct
);
productRoutes.post(
  '/products/soft-delete-multi',
  validateRequest(validator.deleteMulti),
  deleteOneProduct
);

export default productRoutes;

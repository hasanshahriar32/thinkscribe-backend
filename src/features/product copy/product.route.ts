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

export default productRoutes;

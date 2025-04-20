import { Router } from 'express';
import validator from './product-category.validator';
import { validateRequest } from '../../middlewares/validation';
import {
  createOneProductCategory,
  deleteOneProductCategory,
  getAllProductCategories,
  getOneProductCategory,
  updateOneProductCategory,
} from './product-category.controller';

const productCategoryRoutes = Router();

productCategoryRoutes.get(
  '/product-categories',
  validateRequest(validator.select),
  getAllProductCategories
);
productCategoryRoutes.get(
  '/product-categories/:id',
  validateRequest(validator.detail),
  getOneProductCategory
);
productCategoryRoutes.post(
  '/product-categories',
  validateRequest(validator.create),
  createOneProductCategory
);
productCategoryRoutes.patch(
  '/product-categories/:id',
  validateRequest(validator.update),
  updateOneProductCategory
);
productCategoryRoutes.delete(
  '/product-categories/:id',
  validateRequest(validator.delete),
  deleteOneProductCategory
);
productCategoryRoutes.post(
  '/products/delete-multi',
  validateRequest(validator.deleteMulti),
  deleteOneProductCategory
);
productCategoryRoutes.delete(
  '/products/soft-delete/:id',
  validateRequest(validator.delete),
  deleteOneProductCategory
);
productCategoryRoutes.post(
  '/products/soft-delete-multi',
  validateRequest(validator.deleteMulti),
  deleteOneProductCategory
);

export default productCategoryRoutes;

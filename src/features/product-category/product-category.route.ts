import { Router } from 'express';
import validator from './product-category.validator';
import { validateRequest } from '../../middlewares/validation';
import {
  createOneProductCategory,
  createProductCategories,
  deleteOneProductCategory,
  deleteProductCategories,
  getAllProductCategories,
  getOneProductCategory,
  softDeleteOneProductCategory,
  softDeleteProductCategories,
  updateOneProductCategory,
} from './product-category.controller';
import verifyRBAC from '../../middlewares/rbac';
import { ACTIONS, MODULES, ROLES, SUB_MODULES } from '../../configs/rbac';

const productCategoryRoutes = Router();

productCategoryRoutes.get(
  '/product-categories',
  verifyRBAC({
    action: ACTIONS.VIEW,
    roles: [ROLES.ADMIN],
    module: MODULES.PRODUCT,
    subModule: SUB_MODULES.PRODUCT_CATEGORY,
  }),
  validateRequest(validator.select),
  getAllProductCategories
);
productCategoryRoutes.get(
  '/product-categories/:id',
  verifyRBAC({
    action: ACTIONS.VIEW,
    roles: [ROLES.ADMIN],
    module: MODULES.PRODUCT,
    subModule: SUB_MODULES.PRODUCT_CATEGORY,
  }),
  validateRequest(validator.detail),
  getOneProductCategory
);
productCategoryRoutes.post(
  '/product-categories',
  verifyRBAC({
    action: ACTIONS.CREATE,
    roles: [ROLES.ADMIN],
    module: MODULES.PRODUCT,
    subModule: SUB_MODULES.PRODUCT_CATEGORY,
  }),
  validateRequest(validator.create),
  createOneProductCategory
);
productCategoryRoutes.post(
  '/product-categories/create-multi',
  verifyRBAC({
    action: ACTIONS.CREATE,
    roles: [ROLES.ADMIN],
    module: MODULES.PRODUCT,
    subModule: SUB_MODULES.PRODUCT_CATEGORY,
  }),
  validateRequest(validator.createMulti),
  createProductCategories
);
productCategoryRoutes.patch(
  '/product-categories/:id',
  verifyRBAC({
    action: ACTIONS.UPDATE,
    roles: [ROLES.ADMIN],
    module: MODULES.PRODUCT,
    subModule: SUB_MODULES.PRODUCT_CATEGORY,
  }),
  validateRequest(validator.update),
  updateOneProductCategory
);
productCategoryRoutes.delete(
  '/product-categories/:id',
  verifyRBAC({
    action: ACTIONS.DELETE,
    roles: [ROLES.ADMIN],
    module: MODULES.PRODUCT,
    subModule: SUB_MODULES.PRODUCT_CATEGORY,
  }),
  validateRequest(validator.delete),
  deleteOneProductCategory
);
productCategoryRoutes.post(
  '/product-categories/delete-multi',
  verifyRBAC({
    action: ACTIONS.DELETE,
    roles: [ROLES.ADMIN],
    module: MODULES.PRODUCT,
    subModule: SUB_MODULES.PRODUCT_CATEGORY,
  }),
  validateRequest(validator.deleteMulti),
  deleteProductCategories
);
productCategoryRoutes.delete(
  '/product-categories/soft-delete/:id',
  verifyRBAC({
    action: ACTIONS.DELETE,
    roles: [ROLES.ADMIN],
    module: MODULES.PRODUCT,
    subModule: SUB_MODULES.PRODUCT_CATEGORY,
  }),
  validateRequest(validator.delete),
  softDeleteOneProductCategory
);
productCategoryRoutes.post(
  '/product-categories/soft-delete-multi',
  verifyRBAC({
    action: ACTIONS.DELETE,
    roles: [ROLES.ADMIN],
    module: MODULES.PRODUCT,
    subModule: SUB_MODULES.PRODUCT_CATEGORY,
  }),
  validateRequest(validator.deleteMulti),
  softDeleteProductCategories
);

export default productCategoryRoutes;

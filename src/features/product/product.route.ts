import { Router } from 'express';
import validator from './product.validator';
import { validateRequest } from '../../middlewares/validation';
import {
  createOneProduct,
  createProducts,
  deleteOneProduct,
  deleteProducts,
  getAllProducts,
  getOneProduct,
  softDeleteOneProduct,
  softDeleteProducts,
  updateOneProduct,
} from './product.controller';
import verifyRBAC from '../../middlewares/rbac';
import { ACTIONS, MODULES, ROLES, SUB_MODULES } from '../../configs/rbac';

const productRoutes = Router();

productRoutes.get(
  '/products',
  verifyRBAC({
    action: ACTIONS.VIEW,
    roles: [ROLES.ADMIN],
    module: MODULES.PRODUCT,
    subModule: SUB_MODULES.PRODUCT,
  }),
  validateRequest(validator.select),
  getAllProducts
);
productRoutes.get(
  '/products/:id',
  verifyRBAC({
    action: ACTIONS.VIEW,
    roles: [ROLES.ADMIN],
    module: MODULES.PRODUCT,
    subModule: SUB_MODULES.PRODUCT,
  }),
  validateRequest(validator.detail),
  getOneProduct
);
productRoutes.post(
  '/products',
  verifyRBAC({
    action: ACTIONS.CREATE,
    roles: [ROLES.ADMIN],
    module: MODULES.PRODUCT,
    subModule: SUB_MODULES.PRODUCT,
  }),
  validateRequest(validator.create),
  createOneProduct
);
productRoutes.post(
  '/products/create-multi',
  verifyRBAC({
    action: ACTIONS.CREATE,
    roles: [ROLES.ADMIN],
    module: MODULES.PRODUCT,
    subModule: SUB_MODULES.PRODUCT,
  }),
  validateRequest(validator.createMulti),
  createProducts
);
productRoutes.patch(
  '/products/:id',
  verifyRBAC({
    action: ACTIONS.UPDATE,
    roles: [ROLES.ADMIN],
    module: MODULES.PRODUCT,
    subModule: SUB_MODULES.PRODUCT,
  }),
  validateRequest(validator.update),
  updateOneProduct
);
productRoutes.delete(
  '/products/:id',
  verifyRBAC({
    action: ACTIONS.DELETE,
    roles: [ROLES.ADMIN],
    module: MODULES.PRODUCT,
    subModule: SUB_MODULES.PRODUCT,
  }),
  validateRequest(validator.delete),
  deleteOneProduct
);
productRoutes.post(
  '/products/delete-multi',
  verifyRBAC({
    action: ACTIONS.DELETE,
    roles: [ROLES.ADMIN],
    module: MODULES.PRODUCT,
    subModule: SUB_MODULES.PRODUCT,
  }),
  validateRequest(validator.deleteMulti),
  deleteProducts
);
productRoutes.delete(
  '/products/soft-delete/:id',
  verifyRBAC({
    action: ACTIONS.DELETE,
    roles: [ROLES.ADMIN],
    module: MODULES.PRODUCT,
    subModule: SUB_MODULES.PRODUCT,
  }),
  validateRequest(validator.delete),
  softDeleteOneProduct
);
productRoutes.post(
  '/products/soft-delete-multi',
  verifyRBAC({
    action: ACTIONS.DELETE,
    roles: [ROLES.ADMIN],
    module: MODULES.PRODUCT,
    subModule: SUB_MODULES.PRODUCT,
  }),
  validateRequest(validator.deleteMulti),
  softDeleteProducts
);

export default productRoutes;

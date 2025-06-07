import { Router } from 'express';
import authRoutes from './features/auth/auth.route';
import productRoutes from './features/product/product.route';
import userRoutes from './features/user/user.route';
import { verifyToken } from './middlewares/jwt';
import actionRoutes from './features/rbac/action/action.route';
import permissionRoutes from './features/rbac/permission/permission.route';
import roleRoutes from './features/rbac/role/role.route';
import channelRoutes from './features/rbac/channel/channel.route';
import moduleRoutes from './features/rbac/module/module.route';
import subModuleRoutes from './features/rbac/sub-module/sub-module.route';
import productCategoryRoutes from './features/product-category/product-category.route';

const routes = Router();

// Public routes (No authentication required)
routes.use('/auth', authRoutes);

// Protected routes (Require JWT authentication)
routes.use('/', verifyToken, moduleRoutes);
routes.use('/', verifyToken, subModuleRoutes);
routes.use('/', verifyToken, channelRoutes);
routes.use('/', verifyToken, roleRoutes);
routes.use('/', verifyToken, actionRoutes);
routes.use('/', verifyToken, permissionRoutes);
routes.use('/', verifyToken, productCategoryRoutes);
routes.use('/', verifyToken, productRoutes);
routes.use('/', verifyToken, userRoutes);

export default routes;

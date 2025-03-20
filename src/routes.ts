import { Router } from 'express';
import authRoutes from './features/auth/auth.route';
import productRoutes from './features/product/product.route';
import userRoutes from './features/user/user.route';
import productCategoryRoutes from './features/product-category/product-category.route';
import { verifyToken } from './middlewares/jwt';
import moduleRoutes from './features/module/module.route';
import channelRoutes from './features/channel/channel.route';
import roleRoutes from './features/role/role.route';
import subModuleRoutes from './features/sub-module/sub-module.route';
import actionRoutes from './features/action/action.route';

const routes = Router();

// Public routes (No authentication required)
routes.use('/api/auth', authRoutes);

// Protected routes (Require JWT authentication)
routes.use('/api', verifyToken, moduleRoutes);
routes.use('/api', verifyToken, subModuleRoutes);
routes.use('/api', verifyToken, channelRoutes);
routes.use('/api', verifyToken, roleRoutes);
routes.use('/api', verifyToken, actionRoutes);
routes.use('/api', verifyToken, productCategoryRoutes);
routes.use('/api', verifyToken, productRoutes);
routes.use('/api', verifyToken, userRoutes);

export default routes;

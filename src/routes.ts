import { Router } from 'express';
import authRoutes from './features/auth/auth.route';
import rbacRoutes from './features/rbac/rbac.route';
import productRoutes from './features/product/product.route';
import userRoutes from './features/user/user.route';
import productCategoryRoutes from './features/product-category/product-category.route';
import { verifyToken } from './middlewares/jwt';

const routes = Router();

// Public routes (No authentication required)
routes.use('/api/auth', authRoutes);

// Protected routes (Require JWT authentication)
routes.use('/api', verifyToken, rbacRoutes);
routes.use('/api', verifyToken, productCategoryRoutes);
routes.use('/api', verifyToken, productRoutes);
routes.use('/api', verifyToken, userRoutes);

export default routes;

import { Router } from 'express';
import authRoutes from './features/auth/auth.route';
import rbacRoutes from './features/rbac/rbac.route';
import productRoutes from './features/product/product.route';
import userRoutes from './features/user/user.route';
import productCategoryRoutes from './features/product-category/product-category.route';

const routes = Router();

routes.use('/api/auth', authRoutes);
routes.use('/api', rbacRoutes);

routes.use('/api', productCategoryRoutes);
routes.use('/api', productRoutes);
routes.use('/api', userRoutes);

export default routes;

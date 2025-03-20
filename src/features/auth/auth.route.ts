import { Router } from 'express';
import { login, refreshToken } from './auth.controller';
import { verifyRefreshToken } from '../../middlewares/jwt';

const authRoutes = Router();

authRoutes.post('/login', login);
authRoutes.post('/refresh-token', verifyRefreshToken as any, refreshToken);

export default authRoutes;

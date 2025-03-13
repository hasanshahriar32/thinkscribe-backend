import { Router } from 'express';
import { login, refreshToken } from './auth.controller';

const authRoutes = Router();

authRoutes.post('/login', login);
authRoutes.post('/refresh-token', refreshToken);

export default authRoutes;

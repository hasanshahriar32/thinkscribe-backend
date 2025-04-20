import { Router } from 'express';
import { login, refreshToken } from './auth.controller';
import { verifyRefreshToken } from '../../middlewares/jwt';
import { validateRequest } from '../../middlewares/validation';
import validator from './auth.validator';

const authRoutes = Router();

authRoutes.post('/login', validateRequest(validator.login), login);
authRoutes.post('/refresh-token', verifyRefreshToken, refreshToken);

export default authRoutes;

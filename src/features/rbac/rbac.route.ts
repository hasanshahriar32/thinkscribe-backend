import { Router } from 'express';
import { getAllActions } from './rbac.controller';

const rbacRoutes = Router();

rbacRoutes.get('/actions', getAllActions);

export default rbacRoutes;

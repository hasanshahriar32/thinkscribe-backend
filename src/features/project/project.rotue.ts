import { Router } from 'express';
import validator from './project.validator';
import { validateRequest } from '../../middlewares/validation';
import {
  createOneProject,
  deleteOneProject,
  getAllProjects,
  getOneProject,
  updateOneProject,
} from './project.controller';
import verifyRBAC from '../../middlewares/rbac';
import { ACTIONS, MODULES, ROLES, SUB_MODULES } from '../../configs/rbac';

const projectRoutes = Router();

// =========================
// GET /projects
// - Get all projects with pagination and search
// - RBAC will be configured later
// =========================
projectRoutes.get(
  '/projects',
  // verifyRBAC({
  //   action: ACTIONS.VIEW,
  //   roles: [ROLES.ADMIN, ROLES.USER], // Configure as needed
  //   module: MODULES.PROJECT_MANAGEMENT, // Add to rbac config
  //   subModule: SUB_MODULES.PROJECT, // Add to rbac config
  // }),
  validateRequest(validator.select),
  getAllProjects
);

// =========================
// GET /projects/:id
// - Get a single project by ID
// - RBAC will be configured later
// =========================
projectRoutes.get(
  '/projects/:id',
  // verifyRBAC({
  //   action: ACTIONS.VIEW,
  //   roles: [ROLES.ADMIN, ROLES.USER],
  //   module: MODULES.PROJECT_MANAGEMENT,
  //   subModule: SUB_MODULES.PROJECT,
  // }),
  validateRequest(validator.detail),
  getOneProject
);

// =========================
// POST /projects
// - Create a new project
// - RBAC will be configured later
// =========================
projectRoutes.post(
  '/projects',
  // verifyRBAC({
  //   action: ACTIONS.CREATE,
  //   roles: [ROLES.ADMIN, ROLES.USER],
  //   module: MODULES.PROJECT_MANAGEMENT,
  //   subModule: SUB_MODULES.PROJECT,
  // }),
  validateRequest(validator.create),
  createOneProject
);

// =========================
// PUT /projects/:id
// - Update an existing project
// - RBAC will be configured later
// =========================
projectRoutes.put(
  '/projects/:id',
  // verifyRBAC({
  //   action: ACTIONS.UPDATE,
  //   roles: [ROLES.ADMIN, ROLES.USER],
  //   module: MODULES.PROJECT_MANAGEMENT,
  //   subModule: SUB_MODULES.PROJECT,
  // }),
  validateRequest(validator.update),
  updateOneProject
);

// =========================
// DELETE /projects/:id
// - Delete a project
// - RBAC will be configured later
// =========================
projectRoutes.delete(
  '/projects/:id',
  // verifyRBAC({
  //   action: ACTIONS.DELETE,
  //   roles: [ROLES.ADMIN], // Only admin can delete
  //   module: MODULES.PROJECT_MANAGEMENT,
  //   subModule: SUB_MODULES.PROJECT,
  // }),
  validateRequest(validator.delete),
  deleteOneProject
);

export default projectRoutes;
// Drizzle ORM RBAC seed script for full RBAC structure
import db from '../src/db/db';
import {
  roles,
  modules,
  subModules,
  actions,
  permissions,
  rolePermissions,
  userRoles,
} from '../src/db/schema/rbac';

async function seedRBAC() {
  // 1. Insert roles
  const [adminRole, userRole] = await db
    .insert(roles)
    .values([
      { name: 'ADMIN', description: 'Administrator', isActive: true },
      { name: 'USER', description: 'Standard User', isActive: true },
    ])
    .returning();

  // 2. Insert modules
  const [userModule, productModule] = await db
    .insert(modules)
    .values([
      {
        name: 'USER_MANAGEMENT',
        description: 'User Management',
        isActive: true,
      },
      { name: 'PRODUCT', description: 'Product Management', isActive: true },
    ])
    .returning();

  // 3. Insert submodules
  const [
    userSubModule,
    userRoleAssignSubModule,
    productSubModule,
    productCategorySubModule,
  ] = await db
    .insert(subModules)
    .values([
      {
        moduleId: userModule.id,
        name: 'USER',
        description: 'User',
        isActive: true,
      },
      {
        moduleId: userModule.id,
        name: 'USER_ROLE_ASSIGN',
        description: 'User Role Assignment',
        isActive: true,
      },
      {
        moduleId: productModule.id,
        name: 'PRODUCT',
        description: 'Product',
        isActive: true,
      },
      {
        moduleId: productModule.id,
        name: 'PRODUCT_CATEGORY',
        description: 'Product Category',
        isActive: true,
      },
    ])
    .returning();

  // 4. Insert actions
  const [viewAction, createAction, updateAction, deleteAction] = await db
    .insert(actions)
    .values([
      { name: 'VIEW', description: 'View' },
      { name: 'CREATE', description: 'Create' },
      { name: 'UPDATE', description: 'Update' },
      { name: 'DELETE', description: 'Delete' },
    ])
    .returning();

  // 5. Insert permissions (example: admin can view, create, update, delete users)
  const perms = await db
    .insert(permissions)
    .values([
      // User Management - USER
      {
        actionId: viewAction.id,
        moduleId: userModule.id,
        subModuleId: userSubModule.id,
        name: 'VIEW_USER',
        description: 'View users',
      },
      {
        actionId: createAction.id,
        moduleId: userModule.id,
        subModuleId: userSubModule.id,
        name: 'CREATE_USER',
        description: 'Create users',
      },
      {
        actionId: updateAction.id,
        moduleId: userModule.id,
        subModuleId: userSubModule.id,
        name: 'UPDATE_USER',
        description: 'Update users',
      },
      {
        actionId: deleteAction.id,
        moduleId: userModule.id,
        subModuleId: userSubModule.id,
        name: 'DELETE_USER',
        description: 'Delete users',
      },
      // User Management - USER_ROLE_ASSIGN
      {
        actionId: viewAction.id,
        moduleId: userModule.id,
        subModuleId: userRoleAssignSubModule.id,
        name: 'VIEW_USER_ROLE_ASSIGN',
        description: 'View user role assignments',
      },
      // Product Management - PRODUCT
      {
        actionId: viewAction.id,
        moduleId: productModule.id,
        subModuleId: productSubModule.id,
        name: 'VIEW_PRODUCT',
        description: 'View products',
      },
      {
        actionId: createAction.id,
        moduleId: productModule.id,
        subModuleId: productSubModule.id,
        name: 'CREATE_PRODUCT',
        description: 'Create products',
      },
      // Product Management - PRODUCT_CATEGORY
      {
        actionId: viewAction.id,
        moduleId: productModule.id,
        subModuleId: productCategorySubModule.id,
        name: 'VIEW_PRODUCT_CATEGORY',
        description: 'View product categories',
      },
    ])
    .returning();

  // 6. Assign permissions to roles (admin gets all, user gets only view)
  await db.insert(rolePermissions).values([
    // Admin gets all permissions
    ...perms.map((p) => ({ roleId: adminRole.id, permissionId: p.id })),
    // User gets only view permissions
    { roleId: userRole.id, permissionId: perms[0].id }, // VIEW_USER
    { roleId: userRole.id, permissionId: perms[4].id }, // VIEW_USER_ROLE_ASSIGN
    { roleId: userRole.id, permissionId: perms[5].id }, // VIEW_PRODUCT
    { roleId: userRole.id, permissionId: perms[7].id }, // VIEW_PRODUCT_CATEGORY
  ]);

  // 7. Assign roles to users (replace userId: 1, 2 with real user ids)
  await db.insert(userRoles).values([
    { userId: 1, roleId: adminRole.id },
    { userId: 2, roleId: userRole.id },
  ]);

  console.log('RBAC seed complete');
}

seedRBAC()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

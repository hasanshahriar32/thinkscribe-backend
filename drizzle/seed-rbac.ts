// Drizzle ORM RBAC seed script example
import db from '../src/db/db';
import { roles, modules, subModules, actions, permissions, rolePermissions, userRoles } from '../src/db/schema/rbac';

async function seedRBAC() {
  // 1. Insert roles
  const [adminRole] = await db.insert(roles).values({ name: 'ADMIN', description: 'Administrator', isActive: true }).returning();
  // 2. Insert modules
  const [userModule] = await db.insert(modules).values({ name: 'USER_MANAGEMENT', description: 'User Management', isActive: true }).returning();
  // 3. Insert submodules
  const [userSubModule] = await db.insert(subModules).values({ moduleId: userModule.id, name: 'USER', description: 'User', isActive: true }).returning();
  // 4. Insert actions
  const [viewAction] = await db.insert(actions).values({ name: 'VIEW', description: 'View' }).returning();
  // 5. Insert permissions
  const [viewUserPerm] = await db.insert(permissions).values({
    actionId: viewAction.id,
    moduleId: userModule.id,
    subModuleId: userSubModule.id,
    name: 'VIEW_USER',
    description: 'View users',
  }).returning();
  // 6. Assign permission to role
  await db.insert(rolePermissions).values({ roleId: adminRole.id, permissionId: viewUserPerm.id });
  // 7. Assign role to a user (replace userId: 1 with a real user id)
  await db.insert(userRoles).values({ userId: 1, roleId: adminRole.id });
  console.log('RBAC seed complete');
}

seedRBAC().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });

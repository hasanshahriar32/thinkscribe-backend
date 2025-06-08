// drizzle/seed-initial-data.ts
import db from '../src/db/db';
import { products } from '../src/db/schema/products';
import { actions, modules, permissions, rolePermissions, roles, subModules, userRoles } from '../src/db/schema/rbac';
import { users } from '../src/db/schema/users';

async function seed() {
  // --- USERS ---
  const [user1, user2] = await db.insert(users).values([
    {
      firstName: 'Alice',
      lastName: 'Admin',
      emails: JSON.stringify([{ email: 'alice@demo.com', primary: true }]),
      isActive: true,
      isDeleted: false,
    },
    {
      firstName: 'Bob',
      lastName: 'User',
      emails: JSON.stringify([{ email: 'bob@demo.com', primary: true }]),
      isActive: true,
      isDeleted: false,
    },
  ]).returning();

  // --- ROLES ---
  const [adminRole, userRole] = await db.insert(roles).values([
    { name: 'admin', description: 'Administrator', isActive: true },
    { name: 'user', description: 'Regular User', isActive: true },
  ]).returning();

  // --- MODULES ---
  const [mod1] = await db.insert(modules).values([
    { name: 'User Management', description: 'Manage users', isActive: true },
  ]).returning();

  // --- SUBMODULES ---
  const [subMod1] = await db.insert(subModules).values([
    { moduleId: mod1.id, name: 'User List', description: 'List users', isActive: true },
  ]).returning();

  // --- ACTIONS ---
  const [actionView, actionEdit] = await db.insert(actions).values([
    { name: 'view', description: 'View resource' },
    { name: 'edit', description: 'Edit resource' },
  ]).returning();

  // --- PERMISSIONS ---
  const [permView, permEdit] = await db.insert(permissions).values([
    {
      actionId: actionView.id,
      moduleId: mod1.id,
      subModuleId: subMod1.id,
      name: 'user:view',
      description: 'View users',
    },
    {
      actionId: actionEdit.id,
      moduleId: mod1.id,
      subModuleId: subMod1.id,
      name: 'user:edit',
      description: 'Edit users',
    },
  ]).returning();

  // --- ROLE PERMISSIONS ---
  await db.insert(rolePermissions).values([
    { roleId: adminRole.id, permissionId: permView.id },
    { roleId: adminRole.id, permissionId: permEdit.id },
    { roleId: userRole.id, permissionId: permView.id },
  ]);

  // --- USER ROLES ---
  await db.insert(userRoles).values([
    { userId: user1.id, roleId: adminRole.id },
    { userId: user2.id, roleId: userRole.id },
  ]);

  // --- PRODUCTS ---
  await db.insert(products).values([
    { name: 'Demo Product', price: 1000 },
  ]);

  // Add more seeding as needed for other tables

  console.log('Seed complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});

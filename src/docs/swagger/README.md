# Thinkscribe Backend Swagger API Documentation

This folder contains the OpenAPI 3.0 (Swagger) documentation for the Thinkscribe backend, fully migrated to Postgres/Drizzle ORM with robust, normalized RBAC. All endpoints enforce RBAC and use the new Postgres schema. Legacy MySQL/Knex code has been removed.

## Structure

- `auth.yml`: Authentication endpoints (login, JWT validation, etc.)
- `users.yml`: User management endpoints with Clerk integration
- `products.yml`: Product and product category management endpoints
- `projects.yml`: Project management endpoints with PDF list support
- `rbac_endpoints.yml`: Detailed RBAC endpoints (roles, modules, sub-modules, permissions, actions, channels, etc.)

## API Modules

### Authentication (`auth.yml`)

- JWT-based authentication with Clerk integration
- Token validation and refresh endpoints

### Users (`users.yml`)

- User CRUD operations with Clerk synchronization
- Profile management and user search

### Products (`products.yml`)

- Product and category management
- Inventory and pricing operations

### Projects (`projects.yml`)

- Project lifecycle management
- PDF document association and management
- Search and filtering capabilities
- Full CRUD operations with pagination

### RBAC (`rbac_endpoints.yml`)

- Role-based access control endpoints
- Permission and module management

## Usage

- Import `openapi.yml` into Swagger UI, Redoc, or any OpenAPI-compatible tool.
- You can reference or merge `rbac_endpoints.yml` and `tags.yml` for a complete API explorer experience.

## RBAC & Security

- All endpoints are protected by JWT bearer authentication.
- RBAC is enforced at all layers, using the new normalized Postgres schema and Drizzle ORM.

## Error Response Format

All error responses use the following format (via the sendResponse utility):

```json
{
  "success": false,
  "statusCode": 401,
  "message": "Unauthorized Access!",
  "data": [
    {
      "path": "/api/v1/users",
      "message": "Unauthorized Access!"
    }
  ],
  "meta": null
}
```

- `statusCode`: HTTP status code (e.g., 401, 404, 500)
- `message`: Human-readable error message
- `data`: Array of error details (each with `path` and `message`)
- `meta`: Optional metadata (usually null for errors)

## Maintainers

- Thinkscribe Dev Team

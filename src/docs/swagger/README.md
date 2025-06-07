# Scalar API Documentation

This project serves OpenAPI documentation using Scalar UI, powered by the OpenAPI YAML files in this folder.

- **Docs route:** `/docs/scalar` (protected by basic auth, see `envConfig.ts` for credentials)
- **OpenAPI spec:** `openapi.yml`, `tags.yml`, `rbac_endpoints.yml`
- **How it works:**
  - The route is implemented in `src/docs/swagger.route.ts` using Scalar's ESM API Reference component.
  - All documentation is generated from YAML and served as a modern, interactive browser UI.

## How to Update

- Edit the YAML files in this folder to update the API docs.
- The docs are automatically copied to the production build output.

## Legacy Note

- Swagger UI and swagger-jsdoc are no longer used. All documentation is now served via Scalar.
- The API docs are fully in sync with the Drizzle ORM/Postgres backend and RBAC structure.

---

For more details, see the main technical documentation in `src/docs/tech_docs.md`.

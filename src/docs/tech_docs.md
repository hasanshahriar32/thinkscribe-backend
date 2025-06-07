# Technical Documentation

Welcome to the **RBAC Express.js Starter Template** – a robust and scalable foundation for building secure RESTful APIs with **Role-Based Access Control (RBAC)**.

**Now powered by Drizzle ORM and PostgreSQL.**

This template is crafted with best practices in mind, using **Node.js**, **Express.js**, **TypeScript**, **PostgreSQL**, and **Drizzle ORM**. It is ideal for building admin panels, internal tools, or any application requiring fine-grained permission control.

This documentation includes the following key areas:

- [API Documentation](#api-documentation)
- [ERD](#erd)
- [Architecture](#architecture)
- [Folder Structure](#folder-structure)
- [RBAC Implementation](#rbac-implementation)
- [Logging](#logging)
- [Integrating With External Service APIs](#integrating-with-external-service-apis)
- [Environment Configuration](#environment-configuration)

---

## API Documentation

- OpenAPI/Swagger docs are in `docs/swagger/` and served via Scalar UI at `/docs/scalar` (protected by basic auth).
- Postman collection: `src/docs/rbac_express.postman_collection.json`.

## ERD

🔗 [View on dbdiagram.io](https://dbdiagram.io/d/680675261ca52373f5c46e4d)

🗃️ SQL schema: `src/docs/rbac_express.sql`.

![ERD](./erd.png)

## Architecture

This project follows a **Feature-Based Architecture**, organizing code by business features rather than technical concerns (e.g., routes, controllers, models, etc.).

### Why Feature-Based?

- **High Scalability:** Easy to scale and manage large codebases.
- **Better Maintainability:** Easier to locate, update, and test business logic per domain.
- **Separation of Concerns:** Reduces coupling between unrelated parts of the codebase.
- **Improved Developer Productivity:** Developers can focus on isolated features.
- **Modularity & Reusability:** Promotes reusable and encapsulated modules.

## Folder Structure

```
📁 thinkscribe-backend
├── 📁 src
│   ├── 📁 configs
│   │   ├── envConfig.ts   # Centralized environment config
│   │   ├── rbac.ts
│   │   ├── messages.ts
│   │   └── log-formats.ts
│   ├── 📁 cron-jobs
│   ├── 📁 db
│   │   ├── db.ts          # Drizzle ORM/Postgres connection
│   │   └── schema/
│   ├── 📁 docs
│   │   ├── tech_docs.md   # This file
│   │   └── swagger/
│   ├── 📁 external-services
│   ├── 📁 features
│   ├── 📁 middlewares
│   ├── 📁 storage
│   ├── 📁 types
│   ├── 📁 utils
│   ├── app.ts
│   ├── api-client.ts
│   ├── routes.ts
│   └── server.ts
├── drizzle/
├── package.json
├── tsconfig.json
├── eslint.config.cjs
└── ...
```

## RBAC Implementation

- **RBAC is enforced at all layers** using a normalized Postgres schema and Drizzle ORM.
- Main RBAC schema: `src/db/schema/rbac.ts`
- RBAC middleware: `src/middlewares/rbac.ts`
- RBAC config: `src/configs/rbac.ts`
- Update permissions via `/api/permissions` (PATCH).

## Logging

- **Access Logging:** via Morgan (console output).
- **Audit Logging:** custom middleware, logs to `src/storage/logs/audit.log`.
- Log format: `src/configs/log-formats.ts`.
- Use `logAudit` from `src/utils/log.ts` for manual audit events.

## Integrating With External Service APIs

- Uses a custom Axios instance: `src/api-client.ts`.
- Integrated with audit logging.
- Example: SMS via `src/external-services/sms-poh.ts` (uses envConfig for secrets).

## Environment Configuration

- All environment variables are managed in `src/configs/envConfig.ts`.
- On startup, required variables are checked and missing ones are warned/thrown.
- Secrets are exposed as constants (e.g., `DATABASE_URL`, `JWT_SECRET`, `DOC_USER`, etc.).
- See `.env.example` for all required variables.

## 👨‍💻 Author

**Sai Min Pyae Kyaw**

💼 Passionate Full Stack Developer | Node.js | TypeScript | React | PostgreSQL  
📍 Based in Myanmar

### 🌐 Connect with me

- 💼 [LinkedIn](https://www.linkedin.com/in/sai-min-pyae-kyaw-369005200/)
- 💻 [GitHub](https://github.com/MinPyaeKyaw)
- 🌍 [Facebook](https://www.facebook.com/minpyae.kyaw.73)

---

Made with ❤️ by Sai Min Pyae Kyaw

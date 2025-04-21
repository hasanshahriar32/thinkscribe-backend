# Technical Documentation

Welcome to the **RBAC Express.js Starter Template** – a robust and scalable foundation for building secure RESTful APIs with **Role-Based Access Control (RBAC)**.

This template is crafted with best practices in mind, using **Node.js**, **Express.js**, **TypeScript**, **MySQL**, and **Knex**, and is ideal for building admin panels, internal tools, or any application requiring fine-grained permission control.

This documentation includes the following key areas:

- [ERD Diagram](#erd-diagram)
- [Architecture](#architecture)
- [Folder Structure](#folder-structure)
- [RBAC Implementation](#rbac-implementation)
- [Logging](#logging)
- [Integrating With External Service APIs](#integrating-with-external-service-apis)

## ERD Diagram

🔗 [View on dbdiagram.io](https://dbdiagram.io/d/680675261ca52373f5c46e4d)

Get a SQL file named `rbac_express.sql` in `src/docs` folder.

![ERD](./erd.png)

## Architecture

### Advantages of Feature-Based Architecture

This project follows a **Feature-Based Architecture**, organizing code by business features rather than technical concerns (e.g., routes, controllers, models, etc.). You can find the folder structure in the [Folder Structure](#folder-structure) section.

Below are the reasons why I chose Feature-Based Architecture:

#### 1. **High Scalability**

- Easy to scale and manage large codebases.
- Teams can work on separate features independently without conflicts.

#### 2. **Better Maintainability**

- Makes it easy to locate, update, and test business logic related to a specific domain.
- Bug tracking and debugging are easier when everything related to a feature is in one place.

#### 3. **Separation of Concerns**

- Clean separation of different domains reduces coupling between unrelated parts of the codebase.

#### 4. **Improved Developer Productivity**

- Developers only need to understand and focus on the feature they are working on.
- Onboarding new developers is easier as they can explore one feature at a time.

#### 5. **Modularity & Reusability**

- Promotes reusable and encapsulated modules.
- Makes it easier to extract features into separate packages or microservices if needed.

## Folder Structure

```
📁 rbac-expressjs-starter
├── 📁 src
│   ├── 📁 config
│   ├── 📁 cron-jobs
│   ├── 📁 docs
│   ├── 📁 external-services
│   ├── 📁 middlewares
│   │   ├── 📝 audit-log.ts
│   │   ├── 📝 error-handler.ts
│   │   ├── 📝 jwt.ts
│   │   ├── 📝 multer-upload.ts
│   │   ├── 📝 rbac.ts
│   │   ├── 📝 validation.ts
│   ├── 📁 features
│   │   ├── 📁 product
│   │   │   ├── 📝 route.ts
│   │   │   ├── 📝 controller.ts
│   │   │   ├── 📝 service.ts
│   │   │   ├── 📝 validator.ts
│   │   ├── 📁 ...
│   ├── 📁 storage
│   │   ├── 📁 logs
│   │   │   ├── 📝 audit.log
│   │   ├── 📁 uploads
│   ├── 📁 types
│   ├── 📁 utils
│   │   ├── 📝 common.ts
│   │   ├── 📝 http.ts
│   │   ├── 📝 log.ts
│   │   ├── 📝 node-mailer.ts
│   ├── 📝 app.ts
│   ├── 📝 api-client.ts
│   ├── 📝 routes.ts
│   └── 📝 server.ts
├── 📝 .dockerignore
├── 📝 .env
├── 📝 .gitignore
├── 📝 .prettierrc.json
├── 📝 Dockerfile
├── 📝 eslint.config.cjs
├── 📝 nodemon.json
├── 📝 package.json
├── 📝 tsconfig.json
└── 📝 README.md

```

## RBAC Implementation

## Logging

This project implements **two types of logging** using **Morgan** and a **custom audit logging system**:

### 1. Access Logging (via Morgan)

- **Purpose**: Automatically records all incoming HTTP requests.
- **Implementation**: Uses the standard Morgan setup.
- **Output**: Logs are typically written to the console.

### 2. Audit Logging (Custom Implementation)

- **Purpose**: Tracks sensitive or critical operations such as:
  - External API calls
  - Internal service interactions
  - User actions requiring traceability (e.g., login, data changes)

#### 📁 File Location

- Audit logs are stored in:  
  `src/storage/logs/audit.log`

#### 🧾 Log Format

- The structure and format of audit logs are defined in:  
  `config/log-format.ts`

#### ⚙️ How It Works

- A **custom middleware** (located in `middlewares/`) is used to automatically capture audit-related logs for specific routes or actions.
- A reusable utility function `logAudit` is exported from:  
  `utils/log.ts`  
  This function allows you to **manually log important events** from anywhere in the application.

## Integrating With External Service APIs

To interact with external services via their APIs, this project uses an Axios instance named apiClient. This instance is configured in the `/src/api-client.ts` file and is already integrated with the audit logging system to track API requests and responses.

By using the apiClient, you ensure that all external API calls are logged for auditing purposes.

## 👨‍💻 Author

**Sai Min Pyae Kyaw**

💼 Passionate Full Stack Developer | Node.js | TypeScript | React | MySQL  
📍 Based in Myanmar

### 🌐 Connect with me

- 💼 [LinkedIn](https://www.linkedin.com/in/sai-min-pyae-kyaw-369005200/)
- 💻 [GitHub](https://github.com/MinPyaeKyaw)
- 🌍 [Facebook](https://www.facebook.com/minpyae.kyaw.73)

Made with ❤️ by Sai Min Pyae Kyaw

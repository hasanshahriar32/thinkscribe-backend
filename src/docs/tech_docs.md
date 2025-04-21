# Technical Documentation

Welcome to the **RBAC Express.js Starter Template** – a robust and scalable foundation for building secure RESTful APIs with **Role-Based Access Control (RBAC)**.

This template is crafted with best practices in mind, using **Node.js**, **Express.js**, **TypeScript**, **MySQL**, and **Knex**, and is ideal for building admin panels, internal tools, or any application requiring fine-grained permission control.

This documentation includes the following key areas:

- [ERD Diagram](#erd-diagram)
- [Architecture](#architecture)
- [Folder Structure](#folder-structure)
- [RBAC Implementation](#rbac-implementation)
- [Logging](#logging)
- [Integrating With External Services](#integrating-with-external-services)

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
📁 rbac-expressjs-starter  // Root folder for the project
├── 📁 src  // Source code folder
│   ├── 📁 config  // Configuration files
│   ├── 📁 cron-jobs  // Cron jobs for scheduled tasks
│   ├── 📁 docs  // Documentation files
│   ├── 📁 external-services  // Integrations of external services
│   ├── 📁 middlewares  // Custom middleware for the app
│   │   ├── 📝 audit-log.ts  // Middleware for audit logging
│   │   ├── 📝 error-handler.ts  // Middleware for global error handling
│   │   ├── 📝 jwt.ts  // Middleware for JWT authentication
│   │   ├── 📝 multer-upload.ts  // Middleware for file uploads
│   │   ├── 📝 rbac.ts  // Middleware for role-based access control (RBAC)
│   │   ├── 📝 validation.ts  // Middleware for request validation
│   ├── 📁 features  // Feature-based architecture folder
│   │   ├── 📁 product  // Feature for product-related logic
│   │   │   ├── 📝 route.ts  // Defines routes for product feature
│   │   │   ├── 📝 controller.ts  // Business logic for product feature
│   │   │   ├── 📝 service.ts  // Services for product feature
│   │   │   ├── 📝 validator.ts  // Request validation logic for product feature
│   │   ├── 📁 ...  // Other feature folders (e.g., user, rbac, etc.)
│   ├── 📁 storage  // Storage-related functionality
│   │   ├── 📁 logs  // Folder for log files
│   │   │   ├── 📝 audit.log  // Audit log file
│   │   ├── 📁 uploads  // Folder for uploaded files
│   ├── 📁 types  // TypeScript type definitions
│   ├── 📁 utils  // Utility functions
│   ├── 📝 app.ts  // Main app file that initializes the server
│   ├── 📝 api-client.ts  // API client for making external requests
│   ├── 📝 routes.ts  // Centralized routing file
│   └── 📝 server.ts  // Server setup and initialization
├── 📝 .dockerignore  // Specifies files to be ignored by Docker
├── 📝 .env  // Environment variable configurations
├── 📝 .gitignore  // Specifies files and folders to be ignored by Git
├── 📝 .prettierrc.json  // Prettier configuration for code formatting
├── 📝 Dockerfile  // Docker configuration file for building the app's container
├── 📝 eslint.config.cjs  // ESLint configuration for linting code
├── 📝 nodemon.json  // Nodemon configuration for development server
├── 📝 package.json  // Project dependencies and scripts
├── 📝 tsconfig.json  // TypeScript configuration file
└── 📝 README.md  // Project documentation

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

## Integrating With External Services

(Outline how the app integrates with third-party APIs, services like AWS, Auth0, etc.)

## 👨‍💻 Author

**Sai Min Pyae Kyaw**

💼 Passionate Full Stack Developer | Node.js | TypeScript | React | MySQL  
📍 Based in Myanmar

### 🌐 Connect with me

- 💼 [LinkedIn](https://www.linkedin.com/in/sai-min-pyae-kyaw-369005200/)
- 💻 [GitHub](https://github.com/MinPyaeKyaw)
- 🌍 [Facebook](https://www.facebook.com/minpyae.kyaw.73)

Made with ❤️ by Sai Min Pyae Kyaw

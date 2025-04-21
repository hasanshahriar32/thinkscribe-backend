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

(Explain your system's layered architecture, request flow, technologies used, etc.)

## Folder Structure

```
📁 rbac-expressjs-starter
├── 📁 src
│ ├── 📁 config
│ ├── 📁 cron-jobs
│ ├── 📁 docs
│ ├── 📁 external-services
│ ├── 📁 middlewares
│ ├── 📁 features
│ ├── 📁 storage
│ ├── 📁 types
│ ├── 📁 utils
│ ├── app.ts
│ ├── api-client.ts
│ ├── routes.ts
│ └── server.ts
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## RBAC Implementation

## Logging

This project implements **two types of logging** using **Morgan** and a **custom audit logging system**:

### 1. Access Logging (via Morgan)

- **Purpose**: Automatically records all incoming HTTP requests.
- **Implementation**: Uses the standard Morgan setup.
- **Output**: Logs are typically written to the console or an access log file, depending on your environment configuration.

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

```

```

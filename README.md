# Node.js Backend Projects

![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-v5-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-4169E1?logo=postgresql&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue)

A progressive collection of **13 Node.js backend projects** built through [The Odin Project](https://www.theodinproject.com/) curriculum. Each project introduces new concepts, tools, and architectural patterns — progressing from bare HTTP servers to full-stack applications with authentication, ORM-backed databases, and real-time communication.

---

## Table of Contents

- [Featured Projects](#featured-projects)
- [Architecture Overview](#architecture-overview)
- [Tech Stack](#tech-stack)
- [Projects Overview](#projects-overview)
- [Getting Started](#getting-started)
- [Project Details](#project-details)
- [Security Practices](#security-practices)
- [Future Improvements](#future-improvements)
- [License](#license)

---

## Featured Projects

| Project | What It Demonstrates | Link |
|---------|----------------------|------|
| **10 – Members Only** | Role-based access control, email-verified membership, Passport.js, bcrypt, session management | [View →](https://github.com/sadykovIsmail/node.js/tree/main/10-members-only) |
| **13 – Social Media App** | REST API design, JWT authentication, real-time messaging with Socket.io, Prisma ORM | [View →](https://github.com/sadykovIsmail/node.js/tree/main/13-social-media-app) |
| **08 – Inventory App** | Full CRUD with Sequelize ORM, relational data modeling, admin-protected routes | [View →](https://github.com/sadykovIsmail/node.js/tree/main/08-inventory-app) |

---

## Architecture Overview

This repository demonstrates three architectural patterns across its projects, applied progressively as complexity grows.

### Progression

| Projects | Pattern | Description |
|----------|---------|-------------|
| 01–03 | Single-file | All logic in one file — routing, handling, and response |
| 04–05 | Flat Express | Express with views, no separation of concerns |
| 06–07 | MVC (in-memory / raw SQL) | Routes, controllers, and views separated |
| 08–12 | Full MVC + ORM | Models, controllers, routes, views, middleware layers |
| 13 | REST API + WebSocket | Stateless API with JWT auth and Socket.io real-time layer |

### MVC Request Flow (Projects 06–12)

```
HTTP Request
     │
     ▼
Express Router  ──► Middleware (auth, validation)
     │
     ▼
Controller  ──► Model / Database (pg, Sequelize, or Prisma)
     │
     ▼
View (EJS template) or JSON Response
```

### Real-Time Architecture (Project 13)

```
REST Client ──► Express Routes ──► Prisma (PostgreSQL)
                     │
Socket.io Client ──► Socket.io Server ──► Room-based message broadcast
```

---

## Tech Stack

| Category | Technologies |
|----------|--------------|
| Runtime | Node.js v18+ |
| Framework | Express.js v5 |
| Templating | EJS |
| Databases | PostgreSQL, Sequelize ORM, Prisma ORM |
| Authentication | Passport.js (Local Strategy), bcryptjs, express-session, JWT |
| Real-time | Socket.io |
| Email | Nodemailer (Gmail SMTP) |
| Validation | express-validator |
| Utilities | dotenv, CORS, body-parser |

---

## Projects Overview

| # | Project | Description | Key Tech |
|---|---------|-------------|----------|
| 01 | [Hello World](#01-hello-world) | Bare Node.js HTTP server, no frameworks | Node.js |
| 02 | [Basic Information Site](#02-basic-information-site) | Multi-page static site with custom routing | Node.js |
| 03 | [Hello World Express](#03-hello-world-express) | Intro to Express routing and middleware | Express.js |
| 04 | [Express EJS App](#04-express-ejs-app) | Dynamic pages with server-side rendering | Express.js, EJS |
| 05 | [Message Board](#05-message-board) | In-memory CRUD message board | Express.js, EJS |
| 06 | [Profile App](#06-profile-app) | Server-side form validation with inline errors | Express.js, express-validator |
| 07 | [Express + PostgreSQL](#07-express--postgresql) | Raw SQL queries via the `pg` driver | Express.js, PostgreSQL |
| 08 | [Inventory App](#08-inventory-app) | Full CRUD inventory system with categories and stock tracking | Express.js, Sequelize, PostgreSQL |
| 09 | [Authentication](#09-authentication) | User registration and login with hashed passwords and sessions | Express.js, Passport.js, bcrypt |
| 10 | [Members Only](#10-members-only) | Role-based access control with email-verified membership | Express.js, Passport.js, Nodemailer |
| 11 | [Prisma Demo](#11-prisma-demo) | Schema-first ORM with migrations and Prisma Client | Prisma, PostgreSQL |
| 12 | [File Uploader](#12-file-uploader) | Authenticated file upload with Prisma persistence | Express.js, Prisma, Passport.js |
| 13 | [Social Media App](#13-social-media-app) | REST API with JWT auth and real-time messaging via Socket.io | Express.js, Socket.io, Prisma |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [PostgreSQL](https://www.postgresql.org/) (required for projects 07–13)
- Git

### Setup

```bash
git clone https://github.com/sadykovIsmail/node.js.git
cd node.js
```

### Run Any Project

```bash
# 1. Navigate to the project directory
cd 10-members-only

# 2. Install dependencies
npm install

# 3. Start the server
npm start        # production mode
npm run dev      # development mode with auto-reload (where available)
```

Then open your browser at `http://localhost:3000`.

> **Database projects (07–13):** Create a `.env` file in the project directory and configure the required environment variables. Check the project's `app.js` or `index.js` for expected variable names. A typical setup:
>
> ```
> DATABASE_URL=postgresql://user:password@host:5432/dbname
> SESSION_SECRET=your-secret-key
> PORT=3000
> ```

---

## Project Details

### 01. Hello World

A minimal HTTP server using Node's built-in `http` module — no frameworks or dependencies. Responds with `"Hello, World!"` on every request.

**Concepts:** `http.createServer`, request/response cycle

---

### 02. Basic Information Site

Multi-page site served by Node.js. Manually routes requests to static HTML files (`index`, `about`, `contact`) with a custom 404 handler.

**Concepts:** File system routing, serving static HTML, 404 handling

---

### 03. Hello World Express

Introduction to Express.js. Replaces manual routing from project 02 with Express's router abstraction.

**Concepts:** Express routing, middleware basics

---

### 04. Express EJS App

Introduces server-side rendering using the EJS template engine. Passes dynamic data from the server to the view layer.

**Concepts:** Template engines, `res.render()`, dynamic views

---

### 05. Message Board

A CRUD message board backed by in-memory storage. Users can create, view, and browse messages.

**Concepts:** POST/GET routes, in-memory data, EJS forms, CRUD

---

### 06. Profile App

A user profile form with server-side validation via `express-validator`. Validation errors are displayed inline. First project to use a dedicated controller layer.

**Concepts:** Input validation, error rendering, MVC-style controller/route separation

---

### 07. Express + PostgreSQL

Express API connected to PostgreSQL using the `pg` driver and parameterized raw SQL queries.

**Concepts:** Database connections, parameterized queries, `pg` client, environment variables

---

### 08. Inventory App

A full inventory management system with product categories, stock tracking, and complete CRUD operations. Admin routes are password-protected.

**Concepts:** Sequelize ORM, relational data modeling, RESTful routing, EJS layouts, admin route protection

---

### 09. Authentication

User registration and login built with Passport.js (local strategy). Passwords are hashed with bcrypt (10 salt rounds) and sessions are managed with `express-session`.

**Concepts:** Passport.js local strategy, bcrypt password hashing, session management, protected routes

---

### 10. Members Only

A club-style application with role-based access control. Users register, request a membership code delivered by email, and unlock exclusive content after verification.

**Features:**
- Secure registration and login (bcrypt + Passport.js)
- Membership code generation and email delivery (Nodemailer via Gmail SMTP)
- Members-only post creation and viewing
- Flash messages for user feedback

**Concepts:** Nodemailer, role-based authorization, flash messages, PostgreSQL with raw `pg`

---

### 11. Prisma Demo

Explores Prisma ORM as a modern alternative to raw SQL and Sequelize. Covers schema definition, migrations, and basic CRUD with Prisma Client.

**Concepts:** Prisma schema, `prisma migrate`, Prisma Client, ES modules

---

### 12. File Uploader

An authenticated web application with file upload capabilities. Uses Prisma for data persistence and Passport.js for session-based authentication.

**Features:**
- User signup / login / logout
- Dashboard listing uploaded files
- Session-based authentication

**Concepts:** File handling, Prisma with PostgreSQL, express-validator, passport-local

---

### 13. Social Media App

A REST API backend for a social media platform with JWT-based authentication and real-time private messaging via Socket.io.

**Features:**
- User registration and login (JWT)
- Post creation, feed, likes, and comments
- Friend request and acceptance system
- Real-time direct messaging (Socket.io)

**API Routes:**

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Authenticate and receive JWT |
| GET | `/api/auth/me` | JWT | Get current user profile |
| GET | `/api/posts` | JWT | Fetch post feed |
| POST | `/api/posts` | JWT | Create a post |
| POST | `/api/posts/:id/like` | JWT | Toggle like on a post |
| POST | `/api/posts/:id/comments` | JWT | Add a comment |
| DELETE | `/api/posts/:id` | JWT | Delete own post |
| GET | `/api/users` | JWT | List users |
| POST | `/api/friends/request` | JWT | Send friend request |
| GET | `/api/friends/requests` | JWT | List pending requests |
| POST | `/api/friends/accept/:id` | JWT | Accept friend request |
| GET | `/api/friends/list` | JWT | List friends |
| GET/POST | `/api/messages` | JWT | Read / send direct messages |

**Socket.io Events:** `join`, `send_message`, `receive_message`, `disconnect`

**Concepts:** REST API design, JWT authentication, Socket.io, Prisma ORM, ES modules, CORS configuration

---

## Security Practices

The following security measures are applied across the more advanced projects:

| Practice | Projects | Implementation |
|----------|----------|----------------|
| Password hashing | 09, 10, 13 | bcrypt with 10 salt rounds |
| SQL injection prevention | 07, 09, 10 | Parameterized queries via `pg` (`$1`, `$2` placeholders) |
| Session security | 09, 10 | `express-session` with secret from environment variable |
| JWT authentication | 13 | Signed tokens with `jsonwebtoken`, verified on every protected route |
| Route protection | 10, 13 | Custom middleware (`isLoggedIn`, `isMember`, `authenticateToken`) |
| Role-based access | 10 | Membership status checked before serving protected content |
| Input validation | 06, 10, 12 | `express-validator` sanitizes and validates all user input |
| Environment variables | 08, 10, 12, 13 | Credentials stored in `.env`, never hardcoded in production code |

---

## Future Improvements

These improvements would bring the projects closer to production-grade quality:

- **Automated testing** — unit and integration tests with Jest and Supertest
- **Docker support** — `Dockerfile` and `docker-compose.yml` for reproducible local environments
- **Rate limiting** — `express-rate-limit` on auth endpoints to prevent brute-force attacks
- **Centralized error handling** — a global Express error middleware to standardize error responses
- **Logging** — structured request logging with Morgan (dev) and Winston (production)
- **Session persistence** — Redis-backed sessions instead of in-memory storage
- **CI/CD pipeline** — GitHub Actions for automated linting and test runs on push
- **HTTPS** — TLS termination via reverse proxy (Nginx) or a managed platform

---

## License

[MIT License](LICENSE)

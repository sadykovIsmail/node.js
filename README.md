# Node.js Backend Projects

![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-v5-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-4169E1?logo=postgresql&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue)

A progressive collection of **13 Node.js backend projects** built through [The Odin Project](https://www.theodinproject.com/) curriculum. Each project introduces new concepts, tools, and architectural patterns — progressing from bare HTTP servers to full-stack applications with authentication, ORM-backed databases, and real-time communication.

---

## Table of Contents

- [Featured Projects](#featured-projects)
- [Tech Stack](#tech-stack)
- [Projects Overview](#projects-overview)
- [Getting Started](#getting-started)
- [Project Details](#project-details)
- [License](#license)

---

## Featured Projects

| Project | What It Demonstrates | Link |
|---------|----------------------|------|
| **10 – Members Only** | Role-based access control, email-verified membership, Passport.js, bcrypt, session management | [View →](https://github.com/sadykovIsmail/node.js/tree/main/10-members-only) |
| **13 – Social Media App** | REST API design, real-time messaging with Socket.io, Prisma ORM, friend/follow system | [View →](https://github.com/sadykovIsmail/node.js/tree/main/13-social-media-app) |
| **08 – Inventory App** | Full CRUD with Sequelize ORM, relational data modeling, admin-protected routes | [View →](https://github.com/sadykovIsmail/node.js/tree/main/08-inventory-app) |

---

## Tech Stack

| Category | Technologies |
|----------|--------------|
| Runtime | Node.js v18+ |
| Framework | Express.js v5 |
| Templating | EJS |
| Databases | PostgreSQL, Sequelize ORM, Prisma ORM |
| Authentication | Passport.js (Local Strategy), bcryptjs, express-session |
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
| 13 | [Social Media App](#13-social-media-app) | REST API with real-time messaging via Socket.io | Express.js, Socket.io, Prisma |

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

A user profile form with server-side validation via `express-validator`. Validation errors are displayed inline.

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

A REST API backend for a social media platform with real-time private messaging via Socket.io.

**Features:**
- User authentication and profiles
- Post creation and feed
- Friend/follow system
- Real-time direct messaging (Socket.io)

**API Routes:**

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Authenticate and start session |
| GET/POST | `/api/posts` | Read feed / create a post |
| GET | `/api/users` | List users |
| POST | `/api/friends` | Send a friend request |
| GET/POST | `/api/messages` | Read / send direct messages |

**Socket.io Events:** `join`, `send_message`, `receive_message`, `disconnect`

**Concepts:** REST API design, Socket.io, Prisma ORM, ES modules, CORS configuration

---

## License

[MIT License](LICENSE)

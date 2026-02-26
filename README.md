# Node.js Backend Projects

A progressive collection of **13 Node.js backend projects** built through [The Odin Project](https://www.theodinproject.com/) curriculum. Each project introduces new concepts, tools, and architectural patterns — progressing from basic HTTP servers to full-stack applications with real-time communication.

---

## Table of Contents

- [Projects Overview](#projects-overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Details](#project-details)
- [Skills Developed](#skills-developed)
- [License](#license)

---

## Projects Overview

| # | Project | Description | Key Tech |
|---|---------|-------------|----------|
| 01 | [Hello World](#01-hello-world) | Bare Node.js HTTP server | Node.js |
| 02 | [Basic Information Site](#02-basic-information-site) | Static site served with Node.js | Node.js, HTML |
| 03 | [Hello World Express](#03-hello-world-express) | Intro to Express routing | Express.js |
| 04 | [Express EJS App](#04-express-ejs-app) | Dynamic pages with EJS templating | Express.js, EJS |
| 05 | [Message Board](#05-message-board) | CRUD message board | Express.js, EJS |
| 06 | [Profile App](#06-profile-app) | Form handling and validation | Express.js, EJS, express-validator |
| 07 | [Express + PostgreSQL](#07-express--postgresql) | First database integration | Express.js, PostgreSQL, pg |
| 08 | [Inventory App](#08-inventory-app) | Full CRUD inventory management | Express.js, Sequelize, PostgreSQL |
| 09 | [Authentication](#09-authentication) | User auth with sessions | Express.js, Passport.js, bcrypt |
| 10 | [Members Only](#10-members-only) | Role-based access control | Express.js, Passport.js, Nodemailer |
| 11 | [Prisma Demo](#11-prisma-demo) | ORM exploration with Prisma | Prisma, PostgreSQL |
| 12 | [File Uploader](#12-file-uploader) | File upload with auth | Express.js, Prisma, Passport.js |
| 13 | [Social Media App](#13-social-media-app) | REST API + real-time messaging | Express.js, Socket.io, Prisma |

---

## Tech Stack

- **Runtime:** Node.js v18+
- **Framework:** Express.js v5
- **Templating:** EJS
- **Databases:** PostgreSQL, Prisma ORM, Sequelize ORM
- **Authentication:** Passport.js, bcrypt, express-session
- **Real-time:** Socket.io
- **Email:** Nodemailer
- **Validation:** express-validator
- **Other:** dotenv, CORS, body-parser

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [PostgreSQL](https://www.postgresql.org/) (required for projects 07–13)
- Git

### Clone the repository

```bash
git clone https://github.com/sadykovIsmail/node.js.git
cd node.js
```

### Run any project

```bash
# Navigate to a project folder
cd 05-message-board

# Install dependencies
npm install

# Start the server
npm start
# or for dev mode (where available)
npm run dev
```

Then open your browser at `http://localhost:3000`.

> **Note:** Projects 07–13 require a running PostgreSQL instance. Copy `.env.example` to `.env` (if present) and configure your database connection string before starting.

---

## Project Details

### 01. Hello World

A minimal HTTP server built with Node's built-in `http` module — no frameworks. Responds with `"Hello, World!"` to every request.

**Concepts:** `http.createServer`, request/response cycle

---

### 02. Basic Information Site

A multi-page static site served by Node.js. Routes requests to different HTML files (`index`, `about`, `contact`, `404`).

**Concepts:** File system routing, serving static HTML, 404 handling

---

### 03. Hello World Express

First steps with Express.js. Sets up basic routes and demonstrates how Express simplifies HTTP handling.

**Concepts:** Express routing, middleware basics

---

### 04. Express EJS App

Introduces server-side rendering using EJS templates. Passes dynamic data from the server to the view layer.

**Concepts:** Template engines, `res.render()`, dynamic views

---

### 05. Message Board

A simple message board where users can create and view messages. First CRUD application.

**Concepts:** POST/GET routes, in-memory data, EJS forms, CRUD

---

### 06. Profile App

A profile form with server-side input validation using `express-validator`. Displays validation errors inline.

**Concepts:** Form validation, error handling, MVC-style controller/route separation

---

### 07. Express + PostgreSQL

First database-backed application. Connects to PostgreSQL using the `pg` driver and performs raw SQL queries.

**Concepts:** Database connections, raw SQL, `pg` client, environment variables

---

### 08. Inventory App

A full inventory management system with product categories, stock tracking, and complete CRUD operations. Uses Sequelize as the ORM and EJS layouts for a consistent UI.

**Concepts:** Sequelize ORM, relational data modeling, RESTful routing, EJS layouts, CORS

---

### 09. Authentication

Implements user registration, login, and logout using Passport.js (local strategy). Passwords are hashed with bcrypt and sessions are managed with express-session.

**Concepts:** Passport.js local strategy, bcrypt password hashing, session management, protected routes

---

### 10. Members Only

A club-style app with role-based access control. Users can register, request a membership code (sent via email), and unlock exclusive content upon verification.

**Features:**
- Secure registration and login (bcrypt + Passport.js)
- Membership code generation and email delivery (Nodemailer)
- Members-only post creation and viewing
- Flash messages for user feedback

**Concepts:** Nodemailer, role-based authorization, flash messages, PostgreSQL with raw `pg`

---

### 11. Prisma Demo

An introductory project exploring Prisma ORM as a modern alternative to raw SQL and Sequelize. Demonstrates schema definition, migrations, and basic queries.

**Concepts:** Prisma schema, `prisma migrate`, Prisma Client, ES modules

---

### 12. File Uploader

A web application with user authentication and file upload capabilities. Built with Prisma for data persistence and Passport.js for session-based auth.

**Features:**
- User signup / login / logout
- Dashboard with uploaded files
- Session-based authentication

**Concepts:** File handling, Prisma with PostgreSQL, express-validator, passport-local

---

### 13. Social Media App

The most advanced project — a REST API backend for a social media platform with real-time messaging via Socket.io.

**Features:**
- User authentication and profiles
- Post creation and feed
- Friend/follow system
- Real-time private messaging (Socket.io)

**Concepts:** REST API design, Socket.io, Prisma, ES modules, CORS configuration

---

## Skills Developed

- Building HTTP servers from scratch with Node.js
- Structuring Express.js applications (MVC, routes, controllers, middleware)
- Server-side rendering with EJS templating
- Relational database design and querying (PostgreSQL)
- ORM usage with both Sequelize and Prisma
- User authentication: sessions, Passport.js, bcrypt
- Role-based access control and route protection
- Input validation and sanitization
- Real-time communication with Socket.io
- Email integration with Nodemailer
- RESTful API design
- Working with environment variables and `.env` configuration

---

## License

[MIT License](LICENSE)

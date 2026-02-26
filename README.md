<div align="center">

# Backend Engineering Portfolio

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express.js](https://img.shields.io/badge/Express.js-v5-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://postgresql.org)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://prisma.io)
[![Sequelize](https://img.shields.io/badge/Sequelize-6.x-52B0E7?style=flat-square&logo=sequelize&logoColor=white)](https://sequelize.org)
[![Socket.io](https://img.shields.io/badge/Socket.io-Realtime-010101?style=flat-square&logo=socket.io&logoColor=white)](https://socket.io)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)](https://jwt.io)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

**13 backend systems** spanning REST APIs, real-time messaging, auth pipelines, and ORM-backed databases —
progressing from bare HTTP to production-style Node.js architecture.

</div>

---

## Engineering Highlights

- Designed a **JWT-authenticated REST API** with 15 endpoints, a social graph, post interactions, and real-time Socket.io messaging
- Enforced **role-based access control** via composable Express middleware — `isLoggedIn` / `isMember` guard layers
- Implemented a **transactional email verification flow** using Nodemailer SMTP with one-time 6-digit codes
- Applied **parameterized SQL throughout** all `pg`-backed projects — no string-concatenated queries
- Compared **three database abstraction layers** in the same stack: raw `pg`, Sequelize ORM, and schema-driven Prisma
- Structured applications using **MVC patterns** with separated routes, controllers, models, and middleware from project 06 onward
- Configured **Socket.io room-based delivery** (`user_{id}`) for targeted real-time message broadcast

---

## System Architecture

```mermaid
graph LR
    subgraph Clients
        A[HTTP Client]
        B[WebSocket Client]
    end

    subgraph Express Application
        C[Router]
        D["JWT / Session / RBAC<br/>Middleware"]
        E[Controllers]
    end

    subgraph Data Layer
        F[(PostgreSQL)]
        G[Prisma ORM]
        H[Sequelize ORM]
        I[raw pg]
    end

    subgraph Services
        J["Socket.io<br/>Room Broadcast"]
        K["Nodemailer<br/>SMTP"]
    end

    A -->|Bearer Token| C
    B --> J
    C --> D --> E
    E --> G & H & I
    G & H & I --> F
    E --> K
    J --> F
```

---

## Featured Projects

### 13 · Social Media API

> Express · Prisma · Socket.io · JWT · CORS

Production-style REST API backend for a social platform. JWT-protected, stateless, with a social graph and real-time messaging layer.

| | |
|---|---|
| **Auth** | JWT (7-day), bcrypt (10 rounds) |
| **Real-time** | Socket.io — room-based delivery (`user_{id}`) |
| **ORM** | Prisma with schema-driven migrations |
| **Endpoints** | 15 across auth, posts, friends, users, messages |

[View Project →](./13-social-media-app) · [README →](./13-social-media-app/README.md)

---

### 10 · Members Only

> Express · Passport.js · Nodemailer · bcrypt · PostgreSQL

Two-tier RBAC system. Unauthenticated users see nothing. Logged-in users request membership. Verified members unlock content.

| | |
|---|---|
| **Auth** | Passport.js local strategy + bcrypt |
| **Access Control** | `isLoggedIn` / `isMember` middleware chain |
| **Email** | Nodemailer SMTP — 6-digit OTP generation and delivery |
| **DB** | Raw PostgreSQL with parameterized queries |

[View Project →](./10-members-only) · [README →](./10-members-only/README.md)

---

### 08 · Inventory App

> Express · Sequelize · PostgreSQL · EJS Layouts

Full CRUD inventory system with admin-protected delete operations and shared layout templating.

| | |
|---|---|
| **ORM** | Sequelize with sync-based schema management |
| **Auth** | Admin password gate on destructive routes |
| **Routing** | RESTful — GET / POST / edit / delete per resource |
| **UI** | `express-ejs-layouts` for consistent page chrome |

[View Project →](./08-inventory-app) · [README →](./08-inventory-app/README.md)

---

## API Reference — Project 13

| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `POST` | `/api/auth/register` | — | Register — returns `{ user, token }` |
| `POST` | `/api/auth/login` | — | Login — returns `{ user, token }` |
| `GET` | `/api/auth/me` | JWT | Current user profile |
| `GET` | `/api/posts` | JWT | Feed — latest 20 with comments + like count |
| `POST` | `/api/posts` | JWT | Create post |
| `POST` | `/api/posts/:id/like` | JWT | Toggle like |
| `POST` | `/api/posts/:id/comments` | JWT | Add comment |
| `DELETE` | `/api/posts/:id` | JWT | Delete own post |
| `POST` | `/api/friends/request` | JWT | Send friend request |
| `GET` | `/api/friends/requests` | JWT | Pending incoming requests |
| `POST` | `/api/friends/accept/:id` | JWT | Accept → create Friendship record |
| `GET` | `/api/friends/list` | JWT | Friends list |
| `GET` | `/api/users` | JWT | All users |
| `GET` | `/api/messages` | JWT | Direct message thread |
| `POST` | `/api/messages` | JWT | Send direct message |

**Socket.io:** `join` · `send_message` · `receive_message` · `disconnect`

---

## Security Practices

| Practice | Applied In | Detail |
|----------|-----------|--------|
| Password hashing | 09, 10, 13 | bcrypt — 10 salt rounds |
| SQL injection prevention | 07, 09, 10 | Parameterized `pg` queries (`$1`, `$2`) |
| JWT authentication | 13 | `jsonwebtoken` — signed, 7-day expiry, verified per request |
| Route protection | 10, 13 | Custom middleware: `isLoggedIn`, `isMember`, `authenticateToken` |
| Role-based access | 10 | `membership_status` enforced before serving protected content |
| Input validation | 06, 10, 12 | `express-validator` — sanitization + inline error rendering |
| Credentials isolation | 08–13 | `.env` via `dotenv` — no hardcoded secrets in application code |

---

## Project Index

| # | Project | Key Technologies | Concepts |
|---|---------|-----------------|---------|
| 01 | [Hello World](./01-hello-world) | Node.js | `http.createServer`, request/response cycle |
| 02 | [Information Site](./02-basic-information-site) | Node.js | Static routing, `res.sendFile`, 404 handling |
| 03 | [Hello World Express](./03-hello-world-express) | Express.js | Router abstraction, middleware chain |
| 04 | [EJS App](./04-express-ejs-app) | Express, EJS | Server-side rendering, `res.render`, dynamic views |
| 05 | [Message Board](./05-message-board) | Express, EJS | CRUD, in-memory state, Post/Redirect/Get |
| 06 | [Profile App](./06-profile) | Express, express-validator | MVC, controller layer, inline validation errors |
| 07 | [Express + PostgreSQL](./07-express-pg-app) | Express, pg | Raw SQL, parameterized queries, `pg.Pool` |
| 08 | [Inventory App](./08-inventory-app) | Express, Sequelize, PostgreSQL | Sequelize ORM, relational modeling, admin auth |
| 09 | [Authentication](./09-authentication) | Express, Passport.js, bcrypt | Passport local strategy, session auth, bcrypt |
| 10 | [Members Only](./10-members-only) | Express, Passport.js, Nodemailer | RBAC, email OTP, middleware guards |
| 11 | [Prisma Demo](./11-prisma-demo) | Prisma, PostgreSQL | Schema-first ORM, `prisma migrate`, relations |
| 12 | [File Uploader](./12-file-uploader) | Express, Prisma, Passport.js | File handling, session auth, Prisma client |
| 13 | [Social Media API](./13-social-media-app) | Express, Socket.io, Prisma, JWT | REST API, WebSockets, JWT, social graph |

---

## Getting Started

```bash
git clone https://github.com/sadykovIsmail/node.js.git
cd node.js/<project-folder>
npm install
npm start
```

Database projects (07–13) require a `.env` file:

```env
DATABASE_URL=postgresql://user:password@host:5432/dbname
SESSION_SECRET=your-secret
PORT=3000
```

> Each project has its own README with the full schema, env vars, and setup steps.

---

## Production Roadmap

- [ ] Automated tests — Jest + Supertest integration suite
- [ ] Docker — `Dockerfile` + `docker-compose.yml` for portable dev environments
- [ ] Rate limiting — `express-rate-limit` on all auth endpoints
- [ ] Centralized error middleware — standardized error shape across all APIs
- [ ] Structured logging — Morgan (dev) + Winston (production)
- [ ] Redis sessions — replace in-memory session store
- [ ] CI/CD — GitHub Actions on push (lint, test, build)

---

<div align="center">

[MIT License](LICENSE) · [The Odin Project](https://www.theodinproject.com/)

</div>

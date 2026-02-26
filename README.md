<div align="center">

# Node.js Backend Systems

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express.js](https://img.shields.io/badge/Express.js-v5-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://postgresql.org)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://prisma.io)
[![Sequelize](https://img.shields.io/badge/Sequelize-6.x-52B0E7?style=flat-square&logo=sequelize&logoColor=white)](https://sequelize.org)
[![Socket.io](https://img.shields.io/badge/Socket.io-Realtime-010101?style=flat-square&logo=socket.io&logoColor=white)](https://socket.io)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)](https://jwt.io)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

Secure, structured backend systems built with Node.js —
JWT auth pipelines, RBAC middleware, REST APIs, and real-time communication.

</div>

---

## Engineering Approach

- **Secure by default** — bcrypt hashing, parameterized queries, and auth middleware are applied before any business logic executes, not bolted on afterward
- **Middleware-driven access control** — composable Express guards (`isLoggedIn`, `isMember`, `authenticateToken`) enforce access tiers without coupling policy to controllers
- **Explicit API contracts** — RESTful routes follow consistent HTTP semantics; request bodies are validated server-side before reaching the data layer
- **Progressive architectural rigor** — each system increases structural complexity, from single-file handlers to full MVC with ORM-abstracted, migration-managed data layers

---

## Engineering Highlights

- Role-based access control via `isLoggedIn` / `isMember` middleware — membership tier verified before any controller runs
- JWT pipeline — `Bearer` token extraction, `jsonwebtoken.verify()` signature check, and `req.user` injection on every protected route
- 15-endpoint REST API with a social graph — posts, likes, comments, friend requests, and direct messaging
- Three ORM abstraction levels in one codebase — raw `pg`, Sequelize, and schema-driven Prisma migrations
- Socket.io room-based delivery — `user_{id}` rooms target messages to individual recipients without global broadcast
- Parameterized SQL across all `pg`-backed routes — `$1`/`$2` placeholders, injection-safe by construction
- Server-side input validation with `express-validator` — sanitization and structured inline error rendering

---

## System Architecture

```mermaid
graph LR
    subgraph Clients
        A[REST Client]
        B[WebSocket Client]
    end

    subgraph Application
        C[Express Router]
        D["Auth Middleware<br/>JWT · Session · RBAC"]
        E[Controllers]
    end

    subgraph Database
        F[(PostgreSQL)]
    end

    subgraph Services
        G["Socket.io<br/>Room Broadcast"]
        H["Nodemailer<br/>SMTP"]
    end

    A -->|HTTP + Bearer Token| C
    C --> D --> E
    E -->|Prisma · Sequelize · raw pg| F
    B --> G
    G --> F
    E --> H
```

---

## System Evolution

| Stage | Projects | Architecture | Added Complexity |
|-------|----------|-------------|-----------------|
| Foundations | 01–03 | Single-file server | HTTP module, Express router, middleware chain |
| Server-Side Rendering | 04–05 | Flat Express + EJS | Templating engine, in-memory CRUD, form handling |
| MVC | 06–07 | Routes / Controllers / Views | Controller layer, input validation, raw SQL via `pg` |
| ORM Layer | 08, 11 | Full MVC + ORM | Sequelize, Prisma, schema-first migrations |
| Auth Systems | 09, 10, 12 | MVC + Auth Middleware | Passport.js, bcrypt, sessions, RBAC, email OTP |
| Real-Time API | 13 | Stateless REST + WebSocket | JWT, Socket.io rooms, social graph, Prisma |

---

## Featured Projects

### 13 · Social Media API

`Express` `Prisma` `Socket.io` `JWT` `PostgreSQL`

JWT-authenticated REST API with a social graph and real-time private messaging.

| | |
|---|---|
| **Auth** | JWT — signed tokens, 7-day expiry, verified per request |
| **Real-time** | Socket.io rooms — `user_{id}` targeted delivery |
| **Data** | Prisma ORM with schema-driven migrations |
| **Surface** | 15 endpoints — auth, posts, friends, users, messages |

[View →](./13-social-media-app) · [README →](./13-social-media-app/README.md)

---

### 10 · Members Only

`Express` `Passport.js` `Nodemailer` `bcrypt` `PostgreSQL`

Two-tier RBAC system with email-verified membership. Access is enforced by middleware, not route logic.

| | |
|---|---|
| **Auth** | Passport.js local strategy + bcrypt (10 rounds) |
| **Access Control** | `isLoggedIn` / `isMember` middleware chain |
| **Email** | Nodemailer SMTP — 6-digit OTP generation and delivery |
| **Data** | Raw PostgreSQL with parameterized queries |

[View →](./10-members-only) · [README →](./10-members-only/README.md)

---

### 08 · Inventory App

`Express` `Sequelize` `PostgreSQL` `EJS`

Full CRUD inventory system. Admin-password gate on destructive operations. Shared EJS layout component.

| | |
|---|---|
| **ORM** | Sequelize — model sync, relational data modeling |
| **Auth** | Password check middleware before DELETE routes |
| **Routing** | RESTful — create, read, update, delete per resource |
| **UI** | `express-ejs-layouts` — shared header/footer layout |

[View →](./08-inventory-app) · [README →](./08-inventory-app/README.md)

---

## API Reference — Project 13

| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `POST` | `/api/auth/register` | — | Register — returns `{ user, token }` |
| `POST` | `/api/auth/login` | — | Login — returns `{ user, token }` |
| `GET` | `/api/auth/me` | JWT | Current user profile |
| `GET` | `/api/posts` | JWT | Feed — latest 20 with comments and like count |
| `POST` | `/api/posts` | JWT | Create post |
| `POST` | `/api/posts/:id/like` | JWT | Toggle like |
| `POST` | `/api/posts/:id/comments` | JWT | Add comment |
| `DELETE` | `/api/posts/:id` | JWT | Delete own post |
| `POST` | `/api/friends/request` | JWT | Send friend request |
| `GET` | `/api/friends/requests` | JWT | Pending incoming requests |
| `POST` | `/api/friends/accept/:id` | JWT | Accept — creates Friendship record |
| `GET` | `/api/friends/list` | JWT | Friends list |
| `GET` | `/api/users` | JWT | All users |
| `GET` | `/api/messages` | JWT | Direct message thread |
| `POST` | `/api/messages` | JWT | Send direct message |

**Socket.io events:** `join` · `send_message` · `receive_message` · `disconnect`

---

## Production Readiness

### Environment Configuration

All credentials isolated via `dotenv`. No hardcoded secrets in application code.

```env
DATABASE_URL=postgresql://user:pass@host:5432/db
SESSION_SECRET=your-session-secret
JWT_SECRET=your-jwt-secret
PORT=3000
```

### Security Implementation

| Control | Implementation |
|---------|---------------|
| Password hashing | bcrypt — 10 salt rounds |
| SQL injection | Parameterized queries — `$1`, `$2` via `pg` |
| Authentication | JWT (signed) · Passport.js session strategy |
| Route protection | Express middleware: `isLoggedIn`, `isMember`, `authenticateToken` |
| Input validation | `express-validator` — server-side sanitization before persistence |
| Secrets isolation | `.env` via `dotenv` — excluded from source control |

### Deployment Characteristics

- Stateless Express application — no server-side session affinity required for JWT projects
- PostgreSQL as primary data store — compatible with Neon, Supabase, and RDS
- Socket.io CORS restricted to `CLIENT_URL` env variable — unauthorized origins rejected
- Each project independently deployable — no monorepo coupling

---

## Known Production Gaps

- No automated test suite — unit and integration tests (Jest + Supertest) not yet implemented
- In-memory session storage — `express-session` requires a Redis adapter for multi-instance deployments
- No rate limiting on auth endpoints — `/login` and `/register` routes are brute-force vulnerable
- No centralized error middleware — error handling is currently per-route
- No CI/CD pipeline — GitHub Actions not configured

---

## Getting Started

```bash
git clone https://github.com/sadykovIsmail/node.js.git
cd node.js/<project-folder>
npm install
npm start          # or: npm run dev
```

> Projects 07–13 require PostgreSQL and a `.env` file. See each project's README for the full schema and environment variable reference.

---

## Project Index

| # | Project | Stack | Concepts |
|---|---------|-------|---------|
| 01 | [Hello World](./01-hello-world) | Node.js | `http.createServer`, request/response cycle |
| 02 | [Information Site](./02-basic-information-site) | Node.js | Static routing, `res.sendFile`, 404 handling |
| 03 | [Hello World Express](./03-hello-world-express) | Express.js | Router abstraction, middleware basics |
| 04 | [EJS App](./04-express-ejs-app) | Express, EJS | Server-side rendering, dynamic views |
| 05 | [Message Board](./05-message-board) | Express, EJS | CRUD, in-memory state, Post/Redirect/Get |
| 06 | [Profile App](./06-profile) | Express, express-validator | MVC, controller layer, inline validation |
| 07 | [Express + PostgreSQL](./07-express-pg-app) | Express, pg | Raw SQL, parameterized queries, `pg.Pool` |
| 08 | [Inventory App](./08-inventory-app) | Express, Sequelize, PostgreSQL | Sequelize ORM, relational modeling, admin auth |
| 09 | [Authentication](./09-authentication) | Express, Passport.js, bcrypt | Passport local strategy, bcrypt, sessions |
| 10 | [Members Only](./10-members-only) | Express, Passport.js, Nodemailer | RBAC, email OTP, middleware guards |
| 11 | [Prisma Demo](./11-prisma-demo) | Prisma, PostgreSQL | Schema-first ORM, migrations, Prisma Client |
| 12 | [File Uploader](./12-file-uploader) | Express, Prisma, Passport.js | File handling, session auth, Prisma |
| 13 | [Social Media API](./13-social-media-app) | Express, Socket.io, Prisma, JWT | REST API, WebSockets, JWT, social graph |

---

<div align="center">

[MIT License](LICENSE)

</div>

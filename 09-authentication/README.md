# 09 – Authentication

![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-v5-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-4169E1?logo=postgresql&logoColor=white)
![Passport.js](https://img.shields.io/badge/Passport.js-0.7-34E27A)

A complete user authentication implementation using Passport.js (local strategy), bcrypt password hashing, and session management. Demonstrates the full registration → login → protected route → logout flow.

---

## Features

- User registration with bcrypt password hashing (10 salt rounds)
- Login with Passport.js local strategy
- Session persistence with `express-session`
- Route rendering changes based on authentication state
- Secure logout with `req.logout()`

---

## Authentication Flow

```
Register:  POST /sign-up → hash password → INSERT into users → redirect /
Login:     POST /log-in  → Passport verifies credentials → serialize user → session cookie
Request:   GET /         → deserialize user from session → req.user available in views
Logout:    GET /log-out  → req.logout() → destroy session → redirect /
```

---

## Project Structure

```
09-authentication/
├── app.js       # All routes, Passport config, DB connection, server
└── views/
    ├── index.ejs        # Home — shows logged-in user or login/register links
    └── sign-up-form.ejs # Registration form
```

---

## Routes

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Home page — displays current user if authenticated |
| GET | `/sign-up` | Show registration form |
| POST | `/sign-up` | Hash password and insert user into database |
| POST | `/log-in` | Authenticate with Passport (local strategy) |
| GET | `/log-out` | Destroy session and redirect to home |

---

## Database Schema

```sql
CREATE TABLE users (
  id       SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL  -- bcrypt hash
);
```

---

## Security Practices

| Practice | Detail |
|----------|--------|
| Password hashing | `bcrypt.hash(password, 10)` — 10 salt rounds |
| Credential verification | `bcrypt.compare()` — constant-time comparison |
| SQL injection prevention | Parameterized queries (`$1`, `$2`) via `pg` |
| Session management | `express-session` with `saveUninitialized: false` |

---

## Prerequisites

- Node.js v18+
- PostgreSQL running locally

---

## Database Setup

Create the database and table:

```sql
CREATE DATABASE top_users;

\c top_users

CREATE TABLE users (
  id       SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
```

Then update the connection config in `app.js` with your PostgreSQL credentials, or move them to a `.env` file.

---

## How to Run

```bash
npm install
node app.js
```

Open your browser at `http://localhost:3000`.

---

## Part of

[sadykovIsmail/node.js](https://github.com/sadykovIsmail/node.js) — The Odin Project Node.js curriculum

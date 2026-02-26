# 12 – File Uploader

![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-v5-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-4169E1?logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6.x-2D3748?logo=prisma&logoColor=white)
![Passport.js](https://img.shields.io/badge/Passport.js-0.7-34E27A)

A web application combining session-based authentication with file upload functionality. Uses Prisma for data persistence and Passport.js for user authentication.

---

## Features

- User signup and login with bcrypt password hashing
- Session-based authentication via Passport.js
- Dashboard displaying uploaded files
- Input validation with `express-validator`

---

## Project Structure

```
12-file-uploader/
├── index.js              # Express server, routes, Passport config
├── prisma/
│   └── schema.prisma     # User data model
└── views/
    ├── login.ejs         # Login form
    └── signup.ejs        # Registration form
```

---

## Data Model

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String   -- bcrypt hash
  createdAt DateTime @default(now())
}
```

---

## Routes

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Redirect to login |
| GET | `/login` | Show login form |
| POST | `/login` | Authenticate user |
| GET | `/signup` | Show registration form |
| POST | `/signup` | Create new user account |

---

## Key Concepts

- Prisma ORM for user persistence (replaces raw `pg` queries)
- Passport.js local strategy with session serialization
- bcrypt password hashing on registration
- `express-validator` for input validation
- EJS templating for auth views

---

## Prerequisites

- Node.js v18+
- PostgreSQL running locally or hosted

---

## Environment Variables

Create a `.env` file in this directory:

```
DATABASE_URL=postgresql://user:password@host:5432/file_uploader
SESSION_SECRET=your-session-secret
PORT=3000
```

---

## How to Run

```bash
npm install

# Apply database schema
npx prisma migrate dev --name init

# Start the server
node index.js
```

Open your browser at `http://localhost:3000`.

---

## Part of

[sadykovIsmail/node.js](https://github.com/sadykovIsmail/node.js) — The Odin Project Node.js curriculum

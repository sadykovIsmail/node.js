# 11 – Prisma Demo

![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-4169E1?logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-5.x-2D3748?logo=prisma&logoColor=white)

An introductory project exploring Prisma ORM as a modern alternative to raw SQL queries and Sequelize. Demonstrates schema definition, database migrations, and basic CRUD operations with Prisma Client.

---

## What It Does

Runs a script that:
1. Creates a `User` record in PostgreSQL
2. Creates a `Post` associated with that user
3. Fetches all users with their related posts and logs the result

---

## Data Model

Defined in `prisma/schema.prisma`:

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  posts     Post[]
  createdAt DateTime @default(now())
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
  createdAt DateTime @default(now())
}
```

---

## Project Structure

```
11-prisma-demo/
├── index.js              # Main script — create user, post, and fetch all
└── prisma/
    └── schema.prisma     # Data model and database connection config
```

---

## Key Concepts

- **Prisma schema** — declarative data modeling with `model` blocks
- **`prisma migrate dev`** — generates and applies SQL migrations from schema changes
- **Prisma Client** — type-safe query builder auto-generated from the schema
- **Relations** — one-to-many relationship between `User` and `Post`
- **ES modules** — project uses `import`/`export` (`"type": "module"` in `package.json`)

---

## Prerequisites

- Node.js v18+
- PostgreSQL running locally or hosted

---

## Environment Variables

Create a `.env` file in this directory:

```
DATABASE_URL=postgresql://user:password@host:5432/prisma_demo
```

---

## How to Run

```bash
npm install

# Apply the schema to your database
npx prisma migrate dev --name init

# Run the demo script
npm start
```

---

## Part of

[sadykovIsmail/node.js](https://github.com/sadykovIsmail/node.js) — The Odin Project Node.js curriculum

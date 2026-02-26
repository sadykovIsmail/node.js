# 07 – Express + PostgreSQL

![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-v5-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-4169E1?logo=postgresql&logoColor=white)

The first database-backed project in the series. Connects Express to a PostgreSQL database using the `pg` driver and executes parameterized raw SQL queries — no ORM.

---

## Features

- List all usernames from the database
- Add a new username via a form
- Parameterized queries to prevent SQL injection

---

## Architecture

```
Request → Router → Controller → pg Pool (PostgreSQL) → View
```

```
07-express-pg-app/
├── app.js              # Express setup and middleware
├── routes/
│   └── index.js        # Route definitions
├── controllers/
│   └── usersController.js  # Query logic
└── db/
    ├── pool.js         # pg connection pool
    └── queries.js      # Named query functions
```

---

## Routes

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | List all usernames from the database |
| GET | `/new` | Show the add-username form |
| POST | `/new` | Insert a new username into the database |

---

## Key Concepts

- `pg` Pool for connection management and query execution
- Parameterized queries (`$1`, `$2`) to prevent SQL injection
- Separating query logic into a dedicated `db/queries.js` module
- Environment variables for database credentials

---

## Prerequisites

- PostgreSQL running locally
- A database and `users` table created

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL
);
```

---

## Environment Variables

Create a `.env` file in this directory:

```
PGUSER=your_postgres_user
PGPASSWORD=your_postgres_password
PGHOST=localhost
PGPORT=5432
PGDATABASE=your_database_name
```

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

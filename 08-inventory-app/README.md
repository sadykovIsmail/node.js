# 08 – Inventory App

![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-v5-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-4169E1?logo=postgresql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-6.x-52B0E7?logo=sequelize&logoColor=white)

A full inventory management system with complete CRUD operations for products. Built with Sequelize ORM, EJS layouts for a consistent UI, and admin-protected delete routes.

---

## Features

- View all products with name, category, price, and stock quantity
- Create new products via a form
- Edit existing products (pre-filled form)
- Delete products with admin password confirmation
- Consistent page layout using `express-ejs-layouts`

---

## Architecture

```
Request → productRoutes → productController → productModel (Sequelize) → PostgreSQL
                                   ↓
                              EJS View (via express-ejs-layouts)
```

```
08-inventory-app/
├── app.js                    # Express setup, middleware, and server
├── routes/
│   └── productRoutes.js      # All product route definitions
├── controllers/
│   └── productController.js  # Business logic for each route
├── models/
│   └── productModel.js       # Sequelize model definition
├── config/
│   └── database.js           # Sequelize connection configuration
└── views/
    ├── layout.ejs            # Shared layout (header/footer)
    ├── index.ejs             # Home page
    └── products/             # Product views (list, form, detail)
```

---

## Routes

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Home page |
| GET | `/products` | List all products |
| GET | `/products/new` | Show create product form |
| POST | `/products` | Submit new product |
| GET | `/products/:id/edit` | Show edit form (pre-filled) |
| POST | `/products/:id` | Submit product update |
| POST | `/products/:id/delete` | Delete product (requires admin password) |

---

## Data Model

| Field | Type | Description |
|-------|------|-------------|
| `id` | INTEGER | Auto-incrementing primary key |
| `name` | STRING | Product name |
| `category` | STRING | Product category |
| `price` | DECIMAL | Unit price |
| `stock` | INTEGER | Quantity in stock |

---

## Key Concepts

- **Sequelize ORM** — model definition, associations, and CRUD via Sequelize methods
- **Relational data modeling** — product categories as a relational concept
- **EJS layouts** — `express-ejs-layouts` for a shared header/footer template
- **Admin route protection** — password check before destructive operations
- **ES modules** — project uses `import`/`export` throughout
- **dotenv** — database credentials loaded from `.env`

---

## Prerequisites

- Node.js v18+
- PostgreSQL running locally or hosted (e.g., Neon, Supabase)

---

## Environment Variables

Create a `.env` file in this directory:

```
PGUSER=your_postgres_user
PGPASSWORD=your_postgres_password
PGHOST=localhost
PGPORT=5432
PGDATABASE=inventory_db
PORT=3000
```

---

## How to Run

```bash
npm install
npm start
```

Sequelize will sync the model to your database on startup. Open your browser at `http://localhost:3000`.

---

## Part of

[sadykovIsmail/node.js](https://github.com/sadykovIsmail/node.js) — The Odin Project Node.js curriculum

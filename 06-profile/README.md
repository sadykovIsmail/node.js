# 06 – Profile App

![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-v5-000000?logo=express&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-3.x-B4CA65)

A user profile management application introducing server-side form validation and a proper MVC architecture. Users can be created, updated, and deleted — with validation errors displayed inline without a page reload.

---

## Features

- Create user profiles (first name, last name, email, age, bio)
- Update existing user profiles
- Delete users
- Server-side validation with inline error messages
- MVC structure: dedicated routes, controllers, and in-memory storage

---

## Architecture

This is the first project in the series to apply a full MVC separation:

```
Request → Router → Controller → Storage (in-memory) → View
```

```
06-profile/
├── app.js                     # Express setup and middleware
├── routes/
│   └── usersRouter.js         # Route definitions
├── controllers/
│   └── usersController.js     # Business logic (list, create, update, delete)
├── storages/
│   └── usersStorage.js        # In-memory user store
└── views/
    ├── index.ejs              # User list
    ├── createUser.ejs         # Create form
    ├── updateUser.ejs         # Edit form
    └── partials/              # Shared EJS partials
```

---

## Routes

| Method | Path | Controller Action | Description |
|--------|------|-------------------|-------------|
| GET | `/` | `usersListGet` | List all users |
| GET | `/create` | `usersCreateGet` | Show create form |
| POST | `/create` | `usersCreatePost` | Submit new user |
| GET | `/update/:id` | `usersUpdateGet` | Show edit form |
| POST | `/update/:id` | `usersUpdatePost` | Submit edit |
| POST | `/delete/:id` | `usersDeletePost` | Delete user |

---

## Key Concepts

- `express-validator` for server-side input validation
- Displaying validation errors inline in EJS templates
- MVC controller pattern — keeping route files thin
- In-memory storage with UUID-keyed objects
- Static file serving (`express.static`) for CSS

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

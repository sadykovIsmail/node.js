# 05 – Message Board

![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-v5-000000?logo=express&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-3.x-B4CA65)

A simple CRUD message board — the first project in this series to handle form submissions and maintain application state. Messages are stored in an in-memory array for the lifetime of the server process.

---

## Features

- View all messages on the home page with author and timestamp
- Submit a new message via a form
- View individual message detail by ID
- 404 handling for non-existent messages

---

## Routes

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | List all messages |
| GET | `/new` | Show new message form |
| POST | `/new` | Submit a new message |
| GET | `/message/:id` | View a single message by index |

---

## Data Model

Each message in the in-memory array has the following shape:

```js
{
  text: String,    // message content
  user: String,    // author name
  added: Date      // timestamp
}
```

---

## Project Structure

```
05-message-board/
├── app.js          # Express server, routes, in-memory storage
├── routes/
│   ├── index.js    # GET / route
│   └── new.js      # GET/POST /new route
└── views/
    ├── index.ejs   # Message list
    ├── form.ejs    # New message form
    └── message.ejs # Single message detail
```

---

## Key Concepts

- Handling `POST` form submissions with `express.urlencoded`
- In-memory state management (array as a data store)
- URL parameters (`req.params.id`) for dynamic routes
- `res.redirect()` after form submission (Post/Redirect/Get pattern)

---

## How to Run

```bash
npm install
node app.js
```

Open your browser at `http://localhost:3000`.

> **Note:** Messages are lost when the server restarts — this project uses in-memory storage intentionally to focus on routing and form handling.

---

## Part of

[sadykovIsmail/node.js](https://github.com/sadykovIsmail/node.js) — The Odin Project Node.js curriculum

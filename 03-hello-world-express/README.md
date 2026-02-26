# 03 – Hello World Express

![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-v5-000000?logo=express&logoColor=white)

The simplest possible Express.js application — a single route that returns `"Hello, world!"`. This project demonstrates how Express abstracts away the boilerplate of the raw Node.js `http` module.

---

## What It Does

Starts an Express server on port `3000`. The root route (`GET /`) responds with the text `"Hello, world!"`.

---

## Project Structure

```
03-hello-world-express/
└── app.js   # Express app with a single route
```

---

## Key Concepts

- `express()` application setup
- Route definition with `app.get()`
- `res.send()` for text responses
- `app.listen()` to start the server

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

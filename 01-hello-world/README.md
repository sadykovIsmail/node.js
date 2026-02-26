# 01 – Hello World

![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)

A minimal HTTP server built with Node's built-in `http` module — no frameworks, no dependencies. The starting point of the Node.js learning path.

---

## What It Does

Starts an HTTP server on port `3000` that responds to every request with the plain text `"Hello World"`.

---

## Project Structure

```
01-hello-world/
└── server.js   # HTTP server entry point
```

---

## Key Concepts

- `http.createServer()` — creating a server without any framework
- Request / response cycle — setting status codes, headers, and body
- `server.listen()` — binding to a host and port

---

## How to Run

```bash
node server.js
```

Open your browser at `http://localhost:3000`.

No `npm install` required — this project has zero dependencies.

---

## Part of

[sadykovIsmail/node.js](https://github.com/sadykovIsmail/node.js) — The Odin Project Node.js curriculum

# 02 – Basic Information Site

![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-v5-000000?logo=express&logoColor=white)

A multi-page static website served with Express.js. Each route maps to a separate HTML file, demonstrating how a framework simplifies file serving and routing compared to raw Node.js.

---

## What It Does

Serves four static HTML pages via dedicated Express routes:

| Route | File Served |
|-------|------------|
| `GET /` | `index.html` |
| `GET /about` | `about.html` |
| `GET /contact` | `contactme.html` |

Runs on port `3001`.

---

## Project Structure

```
02-basic-information-site/
├── app.js           # Express server and route definitions
├── index.html       # Home page
├── about.html       # About page
├── contactme.html   # Contact page
└── 404.html         # Not-found page
```

---

## Key Concepts

- Express route handlers (`app.get`)
- `res.sendFile()` with `path.join(__dirname, ...)` for safe file paths
- Serving static HTML without a template engine

---

## How to Run

```bash
npm install
node app.js
```

Open your browser at `http://localhost:3001`.

---

## Part of

[sadykovIsmail/node.js](https://github.com/sadykovIsmail/node.js) — The Odin Project Node.js curriculum

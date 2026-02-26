# 04 – Express EJS App

![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-v5-000000?logo=express&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-3.x-B4CA65)

An introduction to server-side rendering with the EJS template engine. The server passes dynamic data to views, which render it into HTML before sending it to the browser.

---

## What It Does

| Route | View | Data Passed |
|-------|------|-------------|
| `GET /` | `index.ejs` | `message`, `users` array |
| `GET /about` | `about.ejs` | `title`, `description` |

---

## Project Structure

```
04-express-ejs-app/
├── app.js        # Express app with EJS configuration
└── views/
    ├── index.ejs # Home page — renders a list of users
    └── about.ejs # About page — renders title and description
```

---

## Key Concepts

- Configuring EJS as the view engine (`app.set("view engine", "ejs")`)
- `res.render(viewName, data)` — passing server-side data to templates
- EJS syntax: `<%= %>` for output, `<% %>` for logic
- Separating server logic from presentation

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

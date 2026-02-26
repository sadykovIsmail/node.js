# 10 – Members Only

![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-v5-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-4169E1?logo=postgresql&logoColor=white)
![Passport.js](https://img.shields.io/badge/Passport.js-0.7-34E27A)
![Nodemailer](https://img.shields.io/badge/Nodemailer-7.x-22B8F0)

A club-style web application with role-based access control. Registered users must verify their membership by entering a 6-digit code sent to their email — only then can they access and post exclusive club content.

---

## Features

- User registration and login (bcrypt + Passport.js)
- Email-based membership verification (Nodemailer via Gmail SMTP)
- Role-based access: guest → logged-in user → verified member
- Members-only post creation and viewing
- Middleware guards on protected routes
- Flash messages for user feedback
- Session management with `express-session`

---

## Screenshots

**Dashboard — before membership verification:**

![Dashboard Before](screenshots/dashboard_before.png)

**Request membership code:**

![Request Code](screenshots/request_code.png)

**Members-only page:**

![Members Page](screenshots/members_page.png)

---

## Architecture

```
Request → Express Router → Auth Middleware (isLoggedIn / isMember) → Controller → pg Pool → View
```

```
10-members-only/
├── app.js                  # Express setup, Passport config, inline routes
├── db.js                   # pg connection pool
├── mailer.js               # Nodemailer transporter configuration
├── middleware/
│   └── auth.js             # isLoggedIn and isMember guards
├── routes/
│   ├── auth.js             # /sign-up routes
│   └── members.js          # /members routes
├── controllers/
│   └── authController.js   # Registration logic with validation
├── public/                 # Static assets (CSS)
├── views/                  # EJS templates
│   ├── index.ejs
│   ├── log-in.ejs
│   ├── dashboard.ejs
│   └── members.ejs
└── screenshots/            # Application screenshots
```

---

## Routes

| Method | Path | Middleware | Description |
|--------|------|------------|-------------|
| GET | `/` | — | Public home page |
| GET | `/sign-up` | — | Registration form |
| POST | `/sign-up` | — | Register new user |
| GET | `/log-in` | — | Login form |
| POST | `/log-in` | — | Authenticate with Passport |
| GET | `/log-out` | — | Destroy session |
| GET | `/dashboard` | `isLoggedIn` | User dashboard |
| POST | `/request-membership` | `isLoggedIn` | Send 6-digit code to user's email |
| POST | `/become-member` | `isLoggedIn` | Verify code and upgrade membership |
| GET | `/members` | `isMember` | View all club posts |
| POST | `/members` | `isMember` | Create a new club post |

---

## Database Schema

```sql
CREATE TABLE members (
  member_id         SERIAL PRIMARY KEY,
  first_name        VARCHAR(50)  NOT NULL,
  last_name         VARCHAR(50)  NOT NULL,
  email_address     VARCHAR(100) UNIQUE NOT NULL,
  password_hash     VARCHAR(255) NOT NULL,
  membership_status BOOLEAN DEFAULT FALSE,
  admin_status      BOOLEAN DEFAULT FALSE,
  joined_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE club_posts (
  post_id    SERIAL PRIMARY KEY,
  author_id  INTEGER REFERENCES members(member_id),
  post_title VARCHAR(255) NOT NULL,
  post_body  TEXT         NOT NULL,
  posted_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Security Practices

| Practice | Detail |
|----------|--------|
| Password hashing | bcrypt with 10 salt rounds |
| SQL injection prevention | Parameterized queries (`$1`, `$2`) via `pg` |
| Session security | Secret loaded from `process.env.SECRET` |
| Route protection | `isLoggedIn` and `isMember` middleware enforce access |
| Role-based access | `membership_status` column checked on every members route |
| Input validation | `express-validator` on sign-up form |

---

## Environment Variables

Create a `.env` file in this directory:

```
DATABASE_URL=postgresql://username:password@host:port/dbname
SECRET=your-session-secret

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
```

> For Gmail, generate an [App Password](https://support.google.com/accounts/answer/185833) rather than using your account password directly.

---

## Prerequisites

- Node.js v18+
- PostgreSQL (local or hosted — e.g., [Neon](https://neon.tech))
- A Gmail account with App Passwords enabled (or another SMTP provider)

---

## How to Run

```bash
npm install
npm start        # node app.js
npm run dev      # nodemon app.js (auto-reload)
```

Open your browser at `http://localhost:3000`.

---

## Part of

[sadykovIsmail/node.js](https://github.com/sadykovIsmail/node.js) — The Odin Project Node.js curriculum

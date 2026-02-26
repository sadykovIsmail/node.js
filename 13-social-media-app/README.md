# 13 – Social Media App

![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-v5-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-4169E1?logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-4.x-010101?logo=socket.io&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?logo=jsonwebtokens&logoColor=white)

The most advanced project in this series. A production-style REST API backend for a social media platform, featuring JWT authentication, a social graph (friends system), post interactions (likes and comments), and real-time private messaging via Socket.io.

---

## Features

- User registration and login with JWT (7-day expiry)
- Post creation, feed, likes, and comments
- Friend request, acceptance, and friends list
- Real-time direct messaging with Socket.io room-based delivery
- JWT middleware protecting all authenticated routes
- CORS configured for a separate frontend client

---

## Architecture

```
┌─────────────────────────────────────────────────┐
│                  REST Client                    │
│        (HTTP requests with Bearer token)        │
└──────────────────────┬──────────────────────────┘
                       │
                  Express.js
                       │
        ┌──────────────┼──────────────┐
        │              │              │
   authenticateToken  Routes      Prisma ORM
   (JWT middleware)   /api/*      PostgreSQL
                       │
┌──────────────────────┘
│
│  Socket.io Layer (real-time)
│  ├── join       → socket.join(`user_${userId}`)
│  ├── send_message → io.to(`user_${receiverId}`)
│  └── disconnect  → cleanup
└──────────────────────────────────────────────────
```

```
13-social-media-app/
└── server/
    ├── src/
    │   ├── server.js           # Express app, Socket.io setup, route mounting
    │   ├── routes/
    │   │   ├── auth.js         # Register, login, /me
    │   │   ├── posts.js        # Feed, create, like, comment, delete
    │   │   ├── friends.js      # Request, accept, list
    │   │   └── messages.js     # Direct messages
    │   └── middleware/
    │       └── auth.js         # JWT authenticateToken middleware
    └── prisma/
        └── schema.prisma       # Full data model
```

---

## API Reference

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | Public | Register — returns `{ user, token }` |
| POST | `/api/auth/login` | Public | Login — returns `{ user, token }` |
| GET | `/api/auth/me` | JWT | Get current user profile |

### Posts

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/posts` | JWT | Fetch post feed (latest 20, with comments and like count) |
| POST | `/api/posts` | JWT | Create a new post |
| POST | `/api/posts/:id/like` | JWT | Toggle like on a post |
| POST | `/api/posts/:id/comments` | JWT | Add a comment to a post |
| DELETE | `/api/posts/:id` | JWT | Delete own post |

### Friends

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/friends/request` | JWT | Send a friend request |
| GET | `/api/friends/requests` | JWT | List pending incoming requests |
| POST | `/api/friends/accept/:id` | JWT | Accept a friend request |
| GET | `/api/friends/list` | JWT | List all friends |

### Users & Messages

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/users` | JWT | List all users |
| GET | `/api/messages` | JWT | Fetch messages |
| POST | `/api/messages` | JWT | Send a direct message |

---

## Socket.io Events

| Event | Direction | Payload | Description |
|-------|-----------|---------|-------------|
| `join` | Client → Server | `userId` | Join personal room `user_${userId}` |
| `send_message` | Client → Server | `{ receiverId, content }` | Send a message to another user |
| `receive_message` | Server → Client | message data | Deliver message to recipient's room |
| `disconnect` | Client → Server | — | Cleanup on disconnection |

---

## Authentication Flow

```
POST /api/auth/register → hash password → store user → return JWT
POST /api/auth/login    → verify password → return JWT

Protected route:
  Authorization: Bearer <token>
       ↓
  authenticateToken middleware
       ↓
  jwt.verify(token, JWT_SECRET) → attach req.user
       ↓
  Route handler
```

---

## Security Practices

| Practice | Detail |
|----------|--------|
| Password hashing | bcrypt with 10 salt rounds |
| Authentication | JWT signed with `JWT_SECRET`, 7-day expiry |
| Token verification | `jsonwebtoken.verify()` on every protected route |
| Authorization | Resource ownership checked before delete/update |
| SQL injection prevention | All queries via Prisma ORM (parameterized internally) |
| CORS | Restricted to `CLIENT_URL` environment variable |
| Credentials in env | `JWT_SECRET`, `DATABASE_URL`, `CLIENT_URL` from `.env` |

---

## Environment Variables

Create a `.env` file in `server/`:

```
DATABASE_URL=postgresql://user:password@host:5432/social_media_db
JWT_SECRET=your-jwt-secret-key
CLIENT_URL=http://localhost:3000
PORT=5000
```

---

## Prerequisites

- Node.js v18+
- PostgreSQL running locally or hosted

---

## How to Run

```bash
cd server

npm install

# Apply database schema
npx prisma migrate dev --name init

# Start the server
node src/server.js
```

The API will be available at `http://localhost:5000`.

Test the health endpoint:

```bash
curl http://localhost:5000/
# → { "message": "API Running" }
```

---

## Part of

[sadykovIsmail/node.js](https://github.com/sadykovIsmail/node.js) — The Odin Project Node.js curriculum

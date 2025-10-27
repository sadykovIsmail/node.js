// server/src/server.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import friendRoutes from './routes/friends.js';
import messageRoutes from './routes/messages.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: process.env.CLIENT_URL, methods: ['GET', 'POST'] }
});

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/messages', messageRoutes);

// Socket.io
io.on('connection', (socket) => {
  socket.on('join', (userId) => socket.join(`user_${userId}`));
  socket.on('send_message', async (data) => {
    io.to(`user_${data.receiverId}`).emit('receive_message', data);
  });
  socket.on('disconnect', () => console.log('User disconnected'));
});

app.get('/', (req, res) => res.json({ message: 'API Running' }));

httpServer.listen(process.env.PORT || 5000, () => {
  console.log('🚀 Server running on port', process.env.PORT || 5000);
});
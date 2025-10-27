import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/request', authenticateToken, async (req, res) => {
  try {
    const { receiverId } = req.body;
    const request = await prisma.friendRequest.create({
      data: { senderId: req.user.userId, receiverId }
    });
    res.status(201).json({ request });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send request' });
  }
});

router.get('/requests', authenticateToken, async (req, res) => {
  try {
    const requests = await prisma.friendRequest.findMany({
      where: { receiverId: req.user.userId, status: 'pending' },
      include: { sender: { select: { id: true, username: true, firstName: true, lastName: true, avatar: true } } }
    });
    res.json({ requests });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
});

router.post('/accept/:requestId', authenticateToken, async (req, res) => {
  try {
    const request = await prisma.friendRequest.findUnique({ where: { id: req.params.requestId } });
    if (request.receiverId !== req.user.userId) return res.status(403).json({ error: 'Not authorized' });
    
    await prisma.friendRequest.update({ where: { id: req.params.requestId }, data: { status: 'accepted' } });
    await prisma.friendship.create({ data: { user1Id: request.senderId, user2Id: request.receiverId } });
    
    res.json({ message: 'Friend request accepted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to accept request' });
  }
});

router.get('/list', authenticateToken, async (req, res) => {
  try {
    const friendships = await prisma.friendship.findMany({
      where: {
        OR: [{ user1Id: req.user.userId }, { user2Id: req.user.userId }]
      },
      include: {
        user1: { select: { id: true, username: true, firstName: true, lastName: true, avatar: true } },
        user2: { select: { id: true, username: true, firstName: true, lastName: true, avatar: true } }
      }
    });
    
    const friends = friendships.map(f => 
      f.user1Id === req.user.userId ? f.user2 : f.user1
    );
    
    res.json({ friends });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch friends' });
  }
});

export default router;

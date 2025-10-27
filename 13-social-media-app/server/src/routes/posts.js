import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
      include: {
        user: { select: { id: true, username: true, firstName: true, lastName: true, avatar: true } },
        comments: {
          include: { user: { select: { id: true, username: true, avatar: true } } },
          orderBy: { createdAt: 'desc' },
          take: 3
        },
        _count: { select: { comments: true, postLikes: true } }
      }
    });
    res.json({ posts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { content } = req.body;
    const post = await prisma.post.create({
      data: { userId: req.user.userId, content },
      include: { user: { select: { id: true, username: true, firstName: true, lastName: true, avatar: true } } }
    });
    res.status(201).json({ post });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

router.post('/:postId/like', authenticateToken, async (req, res) => {
  try {
    const { postId } = req.params;
    const existing = await prisma.like.findUnique({
      where: { userId_postId: { userId: req.user.userId, postId } }
    });
    
    if (existing) {
      await prisma.like.delete({ where: { id: existing.id } });
      await prisma.post.update({ where: { id: postId }, data: { likes: { decrement: 1 } } });
      return res.json({ liked: false });
    }
    
    await prisma.like.create({ data: { userId: req.user.userId, postId } });
    await prisma.post.update({ where: { id: postId }, data: { likes: { increment: 1 } } });
    res.json({ liked: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to like post' });
  }
});

router.post('/:postId/comments', authenticateToken, async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const comment = await prisma.comment.create({
      data: { userId: req.user.userId, postId, content },
      include: { user: { select: { id: true, username: true, avatar: true } } }
    });
    res.status(201).json({ comment });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

router.delete('/:postId', authenticateToken, async (req, res) => {
  try {
    const post = await prisma.post.findUnique({ where: { id: req.params.postId } });
    if (post.userId !== req.user.userId) return res.status(403).json({ error: 'Not authorized' });
    
    await prisma.post.delete({ where: { id: req.params.postId } });
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

export default router;

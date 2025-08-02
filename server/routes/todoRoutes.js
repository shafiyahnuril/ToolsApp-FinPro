import express from 'express';
import Todo from '../models/todoModel.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all todos for logged-in user
router.get('/', requireAuth, async (req, res) => {
  const todos = await Todo.find({ userId: req.userId });
  res.json(todos);
});

// Add todo
router.post('/', requireAuth, async (req, res) => {
  const todo = new Todo({ ...req.body, userId: req.userId });
  await todo.save();
  res.json(todo);
});

// Update todo
router.put('/:id', requireAuth, async (req, res) => {
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    req.body,
    { new: true }
  );
  res.json(todo);
});

// Delete todo
router.delete('/:id', requireAuth, async (req, res) => {
  await Todo.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ success: true });
});

export default router;
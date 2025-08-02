// models/todoModel.js
import mongoose from 'mongoose';
const todoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: String,
  completed: Boolean,
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model('Todo', todoSchema);
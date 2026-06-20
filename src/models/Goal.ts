import mongoose from 'mongoose';

const GoalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String }, // Energy, Transport, Food, Waste
  targetDate: { type: Date },
  status: { type: String, enum: ['active', 'completed', 'failed'], default: 'active' },
  progress: { type: Number, default: 0 }, // 0 to 100
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Goal || mongoose.model('Goal', GoalSchema);

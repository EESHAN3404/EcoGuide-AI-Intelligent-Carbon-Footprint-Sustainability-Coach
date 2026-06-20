import mongoose from 'mongoose';

const MissionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true }, // e.g. Transport, Energy, Waste
  xpReward: { type: Number, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' }
});

export default mongoose.models.Mission || mongoose.model('Mission', MissionSchema);

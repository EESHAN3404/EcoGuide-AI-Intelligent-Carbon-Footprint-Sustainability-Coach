import mongoose from 'mongoose';

const UserMissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  missionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mission', required: true },
  completedAt: { type: Date, default: Date.now },
});

export default mongoose.models.UserMission || mongoose.model('UserMission', UserMissionSchema);

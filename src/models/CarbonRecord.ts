import mongoose from 'mongoose';

const CarbonRecordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  transportation: { type: Number, default: 0 }, // kg CO2
  energy: { type: Number, default: 0 },
  food: { type: Number, default: 0 },
  waste: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  insights: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.CarbonRecord || mongoose.model('CarbonRecord', CarbonRecordSchema);

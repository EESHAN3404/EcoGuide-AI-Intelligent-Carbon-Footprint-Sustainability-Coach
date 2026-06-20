import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number },
  country: { type: String },
  city: { type: String },
  familySize: { type: Number },
  occupation: { type: String },
  vehicleType: { type: String },
  dailyTravelDistance: { type: Number }, // in km
  flightFrequency: { type: Number }, // flights per year
  monthlyElectricityConsumption: { type: Number }, // kWh
  acUsageHours: { type: Number }, // hours per day
  dietPreference: { type: String }, // Vegan, Vegetarian, Mixed, High Meat
  recyclingHabits: { type: String }, // Poor, Average, Good, Excellent
  plasticUsage: { type: String }, // Low, Medium, High
  waterConsumption: { type: Number }, // liters per day
  isOnboarded: { type: Boolean, default: false },
  ecoScore: { type: Number, default: 0 },
  level: { type: String, default: 'Eco Beginner' },
  badges: [{ type: String }],
  xp: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  lastLoginDate: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);

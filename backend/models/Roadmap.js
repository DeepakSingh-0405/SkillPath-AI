import mongoose from 'mongoose';

const stepSchema = new mongoose.Schema({
  stepNumber: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  resources: [{ type: String }],
}, { _id: false });

const roadmapSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  goal: { type: String, required: true },
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  weeklyHours: { type: Number, required: true },
  estimatedDuration: { type: String, default: '8-12 weeks' },
  aiGenerated: { type: Boolean, default: false },
  steps: [stepSchema],
}, { timestamps: true });

const Roadmap = mongoose.model('Roadmap', roadmapSchema);
export default Roadmap;

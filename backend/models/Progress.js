import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  roadmap: { type: mongoose.Schema.Types.ObjectId, ref: 'Roadmap' },
  completedSteps: [{ type: Number }],
  totalSteps: { type: Number, default: 0 },
  percentComplete: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  lastActivityAt: Date,
}, { timestamps: true });

progressSchema.methods.recalculate = function recalculate(totalSteps) {
  this.completedSteps = [...new Set(this.completedSteps)].sort((a, b) => a - b);
  this.totalSteps = totalSteps ?? this.totalSteps;
  this.percentComplete = this.totalSteps ? Math.round((this.completedSteps.length / this.totalSteps) * 100) : 0;
  this.lastActivityAt = new Date();
};

const Progress = mongoose.model('Progress', progressSchema);
export default Progress;

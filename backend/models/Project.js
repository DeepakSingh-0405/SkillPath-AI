import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  techStack: [{ type: String }],
  estimatedTime: String,
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
export default Project;

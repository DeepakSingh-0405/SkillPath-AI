import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  url: { type: String, required: true, trim: true },
  topic: { type: String, required: true, trim: true },
  type: { type: String, enum: ['article', 'video', 'course', 'documentation', 'tool'], default: 'article' },
  description: { type: String, default: '' },
  tags: [{ type: String }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Resource = mongoose.model('Resource', resourceSchema);
export default Resource;

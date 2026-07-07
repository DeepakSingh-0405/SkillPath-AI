import Roadmap from '../models/Roadmap.js';
import Progress from '../models/Progress.js';

export const getProgress = async (req, res) => {
  const roadmap = await Roadmap.findOne({ user: req.user._id }).sort({ createdAt: -1 });
  if (!roadmap) return res.json({ progress: null });

  const progress = await Progress.findOneAndUpdate(
    { user: req.user._id },
    { $setOnInsert: { roadmap: roadmap._id, completedSteps: [], totalSteps: roadmap.steps.length, percentComplete: 0 } },
    { new: true, upsert: true },
  );

  if (progress.totalSteps !== roadmap.steps.length) {
    progress.recalculate(roadmap.steps.length);
    await progress.save();
  }

  res.json({ progress });
};

export const updateStep = async (req, res) => {
  const { stepNumber, completed } = req.body;
  const roadmap = await Roadmap.findOne({ user: req.user._id }).sort({ createdAt: -1 });

  if (!roadmap) {
    res.status(404);
    throw new Error('Roadmap not found.');
  }

  const validStep = roadmap.steps.some((step) => step.stepNumber === Number(stepNumber));
  if (!validStep) {
    res.status(400);
    throw new Error('Invalid roadmap step.');
  }

  const progress = await Progress.findOneAndUpdate(
    { user: req.user._id },
    { $setOnInsert: { roadmap: roadmap._id, completedSteps: [] } },
    { new: true, upsert: true },
  );

  const steps = new Set(progress.completedSteps);
  if (completed) steps.add(Number(stepNumber));
  else steps.delete(Number(stepNumber));

  const last = progress.lastActivityAt;
  const today = new Date().toDateString();
  if (completed && (!last || last.toDateString() !== today)) progress.streak += 1;

  progress.completedSteps = [...steps];
  progress.roadmap = roadmap._id;
  progress.recalculate(roadmap.steps.length);
  await progress.save();

  res.json({ progress });
};

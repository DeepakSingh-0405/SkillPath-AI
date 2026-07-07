import 'express-async-errors';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import roadmapRoutes from './routes/roadmapRoutes.js';
import progressRoutes from './routes/progressRoutes.js';
import learningRoutes from './routes/learningRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();
let dbPromise;

const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
  'http://localhost:5173',
  'http://localhost:5174',
].filter(Boolean).flatMap((origin) => origin.split(',')).map((origin) => origin.trim().replace(/\/$/, ''));

app.use(async (req, res, next) => {
  if (!dbPromise) dbPromise = connectDB();
  await dbPromise;
  next();
});

app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ''))) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'SkillPath AI API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/roadmaps', roadmapRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/learning', learningRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/admin', adminRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
if (process.env.NODE_ENV !== 'production' || process.env.RUN_LOCAL_SERVER === 'true') {
  app.listen(PORT, () => console.log(`SkillPath AI API running on port ${PORT}`));
}

export default app;

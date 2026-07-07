import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return mongoose.connection;

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is required. Add it to backend/.env or Vercel environment variables.');
  }

  await mongoose.connect(process.env.MONGO_URI, {
    dbName: process.env.MONGO_DB_NAME || undefined,
  });

  return mongoose.connection;
};

export default connectDB;

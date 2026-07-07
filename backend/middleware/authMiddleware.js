import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  const token = req.cookies?.jwt || req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.userId).select('-password');

  if (!user || !user.isActive) {
    res.status(401);
    throw new Error('Not authorized');
  }

  req.user = user;
  next();
};

export const admin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    res.status(403);
    throw new Error('Admin access required');
  }
  next();
};

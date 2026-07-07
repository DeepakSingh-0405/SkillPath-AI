import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import { isValidEmail, isValidPassword } from '../utils/validators.js';

const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  isActive: user.isActive,
  createdAt: user.createdAt,
});

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name?.trim() || !isValidEmail(email) || !isValidPassword(password)) {
    res.status(400);
    throw new Error('Provide a valid name, email, and password with at least 6 characters.');
  }

  const exists = await User.findOne({ email: email.toLowerCase() });
  if (exists) {
    res.status(409);
    throw new Error('User already exists.');
  }

  const role = process.env.ADMIN_EMAIL?.toLowerCase() === email.toLowerCase() ? 'admin' : 'user';
  const user = await User.create({ name, email, password, role });
  generateToken(res, user);
  res.status(201).json({ user: sanitizeUser(user) });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email?.toLowerCase() }).select('+password');

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password.');
  }

  if (!user.isActive) {
    res.status(403);
    throw new Error('Your account is inactive. Contact an administrator.');
  }

  generateToken(res, user);
  res.json({ user: sanitizeUser(user) });
};

export const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
  });
  res.json({ message: 'Logged out successfully.' });
};

export const getMe = (req, res) => {
  res.json({ user: sanitizeUser(req.user) });
};

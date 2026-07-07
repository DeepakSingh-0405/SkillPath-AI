import User from '../models/User.js';
import { isValidPassword } from '../utils/validators.js';

export const updateProfile = async (req, res) => {
  const name = req.body.name?.trim();
  if (!name) {
    res.status(400);
    throw new Error('Name is required.');
  }

  const user = await User.findByIdAndUpdate(req.user._id, { name }, { new: true }).select('-password');
  res.json({ user });
};

export const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!isValidPassword(newPassword)) {
    res.status(400);
    throw new Error('New password must be at least 6 characters.');
  }

  const user = await User.findById(req.user._id).select('+password');
  if (!user || !(await user.matchPassword(currentPassword))) {
    res.status(400);
    throw new Error('Current password is incorrect.');
  }

  user.password = newPassword;
  await user.save();
  res.json({ message: 'Password updated successfully.' });
};

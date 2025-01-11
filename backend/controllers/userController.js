const User = require('../models/user');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validate role
  if (!role || !['gestionnaire', 'livreur'].includes(role)) {
    return res.status(400).json({ errors: 'Invalid role' });
  }

  try {
    const user = await User.create({ name, email, password, role });
    const token = createToken(user._id);
    res.status(201).json({ user: user._id, token });
  } catch (err) {
    res.status(400).json({ errors: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ user: user._id, token });
  } catch (err) {
    res.status(400).json({ errors: err.message });
  }
};

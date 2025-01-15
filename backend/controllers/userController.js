const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Function to create a JWT token with user role
const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

// Register a new user
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validate role
  if (!role || !['gestionnaire', 'livreur'].includes(role)) {
    return res.status(400).json({ errors: 'Invalid role. Role must be "gestionnaire" or "livreur".' });
  }

  try {
    const user = await User.create({ name, email, password, role });
    const token = createToken(user._id, user.role); // Include role in the token
    res.status(201).json({ user: user._id, role: user.role, token });
  } catch (err) {
    res.status(400).json({ errors: err.message });
  }
};

// Login an existing user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id, user.role); // Include role in the token
    res.status(200).json({ user: user._id, role: user.role, token });
  } catch (err) {
    res.status(400).json({ errors: err.message });
  }
};

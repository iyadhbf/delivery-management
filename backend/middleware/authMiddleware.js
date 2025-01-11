const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      req.userId = decodedToken.id;
      next();
    });
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
};

const checkRole = (role) => (req, res, next) => {
  User.findById(req.userId).then(user => {
    if (user && user.role === role) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  }).catch(err => {
    res.status(500).json({ message: 'Server error' });
  });
};

module.exports = { requireAuth, checkRole };

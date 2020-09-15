const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');
  // Check if no token in the headers
  if (!token) {
    res.status(401).json({ msg: 'No token. Authentication denialed' });
  }

  try {
    // Verify token
    const encoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = encoded.user;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

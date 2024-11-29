const helmet = require('helmet');

// Helmet middleware for security headers
const helmetMiddleware = () => helmet();

// Dummy authentication middleware
const dummyAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || authHeader !== 'Bearer dummy-token') {
    return res.status(401).json({ error: 'Unauthorized access' });
  }
  next();
};

module.exports = {
  helmetMiddleware,
  dummyAuthMiddleware,
};

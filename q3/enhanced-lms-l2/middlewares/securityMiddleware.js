const helmet = require('helmet');
const { RateLimiterMemory } = require('rate-limiter-flexible');

// Helmet middleware for security headers
const helmetMiddleware = () => helmet();

// Rate limiting middleware
const rateLimiter = new RateLimiterMemory({
  points: parseInt(process.env.RATE_LIMIT_MAX || 100), // Max requests
  duration: parseInt(process.env.RATE_LIMIT_WINDOW || 15) * 60, // Time in seconds
});

const rateLimitMiddleware = (req, res, next) => {
  rateLimiter.consume(req.ip)
    .then(() => next())
    .catch(() => res.status(429).json({ error: 'Too many requests, please try again later.' }));
};

module.exports = { helmetMiddleware, rateLimitMiddleware };

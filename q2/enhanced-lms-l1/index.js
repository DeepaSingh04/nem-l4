const express = require('express');
const { helmetMiddleware } = require('./middlewares/securityMiddlewares');
const errorHandler = require('./middlewares/errorHandler');
const courseRoutes = require('./routes/courses');

const app = express();

// Middleware to parse JSON payloads
app.use(express.json());

// Apply helmet middleware for security
app.use(helmetMiddleware());

// Routes
app.use('/courses', courseRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Enhanced LMS with Security and Validation!');
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

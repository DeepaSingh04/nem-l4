const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const { helmetMiddleware, rateLimitMiddleware } = require('./middlewares/securityMiddleware');
const errorHandler = require('./middlewares/errorMiddleware');
const courseRoutes = require('./routes/courses');

// Initialize app
const app = express();

// Request logging
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/request.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

// Middleware
app.use(express.json());
app.use(helmetMiddleware());
app.use(rateLimitMiddleware);

// Routes
app.use('/courses', courseRoutes);

// Default route
app.get('/', (req, res) => res.send('Welcome to the Advanced LMS!'));

// Error handling
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

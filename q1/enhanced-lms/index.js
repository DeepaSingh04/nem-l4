const express = require('express');
const { bodyParsingMiddlewares, corsMiddleware, loggingMiddleware } = require('./middlewares/requestMiddlewares');

// Initialize Express app
const app = express();

// Middleware for parsing JSON and URL-encoded payloads
app.use(...bodyParsingMiddlewares());

// Middleware for security (CORS)
app.use(corsMiddleware());

// Middleware for logging requests
app.use(loggingMiddleware());

// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to the Enhanced LMS Application!');
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

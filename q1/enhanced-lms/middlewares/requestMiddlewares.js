// middlewares/requestMiddlewares.js

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Middleware for limiting JSON and URL-encoded body size
const bodyParsingMiddlewares = () => [
  express.json({ limit: '1mb' }),
  express.urlencoded({ limit: '1mb', extended: true }),
];

// Middleware for CORS
const corsMiddleware = () => cors({ origin: 'http://localhost:3000' });

// Middleware for logging HTTP requests
const loggingMiddleware = () => morgan('combined');

module.exports = {
  bodyParsingMiddlewares,
  corsMiddleware,
  loggingMiddleware,
};

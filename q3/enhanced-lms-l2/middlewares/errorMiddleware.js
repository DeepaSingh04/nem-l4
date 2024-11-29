const fs = require('fs');
const path = require('path');

// Error logger function
const logErrorToFile = (err) => {
  const logFilePath = path.join(__dirname, '../logs/error.log');
  const logMessage = `[${new Date().toISOString()}] ${err.status || 500} - ${err.message}\n${err.stack}\n\n`;

  fs.appendFile(logFilePath, logMessage, (error) => {
    if (error) console.error('Failed to write error log:', error);
  });
};

// Error-handling middleware
const errorHandler = (err, req, res, next) => {
  logErrorToFile(err);

  if (process.env.NODE_ENV === 'development') {
    res.status(err.status || 500).json({ error: err.message, stack: err.stack });
  } else {
    res.status(err.status || 500).json({ error: 'Internal Server Error' });
  }
};

module.exports = errorHandler;

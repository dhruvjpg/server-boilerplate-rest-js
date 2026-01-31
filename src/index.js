const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { version, name } = require('../package.json');

const config = require('./config/config');
const connectDB = require('./mongoose');
const routes = require('./routes');
const { 
  errorHandler, 
  handleUnhandledRejection, 
  handleUncaughtException 
} = require('./middlewares/error-handler');
const Logger = require('./utils/logger');
const { NotFoundError } = require('./utils/custom-error');

const logger = new Logger('Server');

// Handle uncaught exceptions
handleUncaughtException();

// Handle unhandled promise rejections
handleUnhandledRejection();

// Initialize express app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/version', (req, res) => {
  res.json({
    name,
    version,    
    message: 'Welcome to the REST API',
  });
});

app.use('/api', routes);

// 404 handler
app.use((req, res, next) => {
  next(new NotFoundError(`Route ${req.originalUrl} not found`));
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  logger.info(`Server is running on port ${config.port} in ${config.nodeEnv} mode`);
  logger.info(`http://localhost:${config.port}`);
});

module.exports = app;

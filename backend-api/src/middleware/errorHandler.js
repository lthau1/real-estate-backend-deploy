/**
 * Global error handler — returns unified JSON error shape.
 * Must be registered LAST in app.js (after all routes).
 */
function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[${new Date().toISOString()}] ${req.method} ${req.path} → ${statusCode}: ${message}`);

  return res.status(statusCode).json({
    error: true,
    message,
    statusCode,
  });
}

module.exports = errorHandler;

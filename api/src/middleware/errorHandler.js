// ============================================================
//  Error Handling Middleware
// ------------------------------------------------------------
//  OWNER: Member B (HTTPS / validation / errors)
//  Central place to catch errors so responses are SAFE:
//  the client gets a clean message, never a stack trace,
//  file path, or config value (rubric: secure error handling).
//
//  Two exports:
//   - notFound: handles unknown routes (404)
//   - errorHandler: final error middleware (must be last in app.js)
// ============================================================

const logger = require("../utils/logger");

// Catch requests to routes that do not exist.
function notFound(req, res, next) {
  res.status(404).json({ message: "Resource not found" });
}

// Final error handler. Express recognises it by its 4 arguments.
function errorHandler(err, req, res, next) {
  // Log the FULL detail server-side (for us to debug).
  logger.error(`${req.method} ${req.originalUrl} - ${err.message}`);

  const statusCode = err.statusCode || 500;

  // Send a CONTROLLED response to the client — no internal detail.
  res.status(statusCode).json({
    message:
      statusCode === 500
        ? "An internal server error occurred"
        : err.message,
    // Stack traces are NEVER sent to the client.
  });
}

module.exports = { notFound, errorHandler };

// ============================================================
//  Express App Assembly
// ------------------------------------------------------------
//  Builds the Express application: global middleware, routes,
//  and error handlers. Kept separate from server.js so the app
//  can be imported by tests without starting an HTTPS server.
//
//  Part 2 will add: helmet (security headers), CSP, rate limiting,
//  and more routes (gigs, bookings, transactions).
// ============================================================

const express = require("express");
const authRoutes = require("./routes/authRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const logger = require("./utils/logger");

const app = express();

// --- Global middleware ---
app.use(express.json()); // parse JSON request bodies

// Simple request logger (every request is logged).
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

// --- Health check (handy for testing the server is up) ---
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "hustlehub-api" });
});

// --- Routes ---
app.use("/api/auth", authRoutes);
// Part 2: app.use("/api/gigs", gigRoutes); etc.

// --- Error handling (MUST be last) ---
app.use(notFound);
app.use(errorHandler);

module.exports = app;

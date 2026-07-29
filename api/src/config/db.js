// ============================================================
//  Database Connection  (MongoDB Atlas via Mongoose)
// ------------------------------------------------------------
//  OWNER: Member C (Data layer)
//  Connects the app to MongoDB Atlas using MONGO_URI from .env.
//  Skeleton is functional — Member C confirms the Atlas cluster
//  and documents the setup in the README.
// ============================================================

const mongoose = require("mongoose");
const logger = require("../utils/logger");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info("MongoDB connected");
  } catch (error) {
    // Log the message only — never the full error object to the client.
    logger.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1); // fail fast if the DB is unreachable at startup
  }
}

module.exports = connectDB;

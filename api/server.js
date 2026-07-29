// ============================================================
//  Server Entry Point  (HTTPS)
// ------------------------------------------------------------
//  Starts the app over HTTPS using a LOCAL self-signed SSL
//  certificate (rubric: HTTPS Implementation, 10 marks).
//  OWNER: Member B generates the cert & confirms this works.
//
//  The cert files live in api/ssl/ and are GITIGNORED — each
//  member generates their own locally (steps in the README).
//  If the certs are missing, we log a clear message instead of
//  crashing cryptically.
// ============================================================

require("dotenv").config();
const fs = require("fs");
const https = require("https");
const path = require("path");

const app = require("./src/app");
const connectDB = require("./src/config/db");
const logger = require("./src/utils/logger");

const PORT = process.env.PORT || 5000;
const keyPath = process.env.SSL_KEY_PATH || "./ssl/key.pem";
const certPath = process.env.SSL_CERT_PATH || "./ssl/cert.pem";

async function start() {
  // Connect to MongoDB first.
  await connectDB();

  // Load SSL certificate for HTTPS.
  const keyFull = path.resolve(__dirname, keyPath);
  const certFull = path.resolve(__dirname, certPath);

  if (!fs.existsSync(keyFull) || !fs.existsSync(certFull)) {
    logger.error(
      "SSL certificate not found. Generate it (see README) before starting."
    );
    logger.error(`Expected key:  ${keyFull}`);
    logger.error(`Expected cert: ${certFull}`);
    process.exit(1);
  }

  const sslOptions = {
    key: fs.readFileSync(keyFull),
    cert: fs.readFileSync(certFull),
  };

  https.createServer(sslOptions, app).listen(PORT, () => {
    logger.info(`HTTPS server running on https://localhost:${PORT}`);
  });
}

start();

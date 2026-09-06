require("dotenv").config();

const fs = require("fs");
const https = require("https");
const path = require("path");
const express = require("express");
const helmet = require("helmet");

const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = Number(process.env.PORT) || 3443;

app.disable("x-powered-by");
app.use(helmet());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false, limit: "10kb" }));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "HustleHub+ API is running securely.",
    protocol: "HTTPS"
  });
});

app.use("/api/auth", authRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Resource not found."
  });
});

app.use((err, req, res, next) => {
  console.error("Internal error:", err.message);

  res.status(err.status || 500).json({
    success: false,
    message: "An internal server error occurred."
  });
});

const keyPath = path.join(__dirname, "../certs/server.key");
const certPath = path.join(__dirname, "../certs/server.crt");

if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
  console.error("HTTPS certificate files are missing.");
  console.error("Create certs/server.key and certs/server.crt before starting the server.");
  process.exit(1);
}

const httpsOptions = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath)
};

https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`HustleHub+ API running at https://localhost:${PORT}`);
  console.log(`Health check: https://localhost:${PORT}/api/health`);
});
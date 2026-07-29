// ============================================================
//  Logger  (thin wrapper)
// ------------------------------------------------------------
//  OWNER: Member D (Testing / DevOps)
//  A deliberately thin wrapper around console for now.
//  Part 3 requires logging of key events (logins, bookings,
//  transactions, errors). Because all logging goes through
//  THIS module, upgrading to Winston / a cloud log platform
//  in Part 3 is a one-file change — nothing else needs editing.
// ============================================================

function timestamp() {
  return new Date().toISOString();
}

const logger = {
  info: (msg) => console.log(`[INFO]  ${timestamp()}  ${msg}`),
  warn: (msg) => console.warn(`[WARN]  ${timestamp()}  ${msg}`),
  error: (msg) => console.error(`[ERROR] ${timestamp()}  ${msg}`),
};

module.exports = logger;

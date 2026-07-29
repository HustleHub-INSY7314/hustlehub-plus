// ============================================================
//  Auth Middleware (JWT verification)  —  *** STUB ***
// ------------------------------------------------------------
//  OWNER: Member A (Auth & Security core)
//  Protects routes beyond login. The rubric requires JWT to be
//  VALIDATED on each protected request — this is where that
//  happens. Part 2 RBAC will build on this by also checking role.
//
//  Implement the TODO, then remove this banner.
// ============================================================

// const jwt = require("jsonwebtoken");   // TODO: uncomment when used

function protect(req, res, next) {
  // TODO (Member A):
  // 1. Read the Authorization header ("Bearer <token>").
  // 2. If missing/malformed -> 401.
  // 3. Verify the token with jwt.verify(token, process.env.JWT_SECRET).
  // 4. On success, attach the payload to req.user = { id, role } and next().
  // 5. On failure -> 401 with a generic message (no internal detail).
  return res
    .status(501)
    .json({ message: "Route protection not implemented yet (Member A)" });
}

module.exports = { protect };

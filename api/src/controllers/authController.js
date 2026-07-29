// ============================================================
//  Auth Controller  —  *** STUB — DO NOT MERGE AS-IS ***
// ------------------------------------------------------------
//  OWNER: Member A (Auth & Security core)
//  This is the HIGHEST-VALUE work in Part 1 (~40 marks across
//  register/login + password/JWT). It is left as a stub on
//  purpose so Member A implements it as their own attributable
//  commits on a feature branch (feature/auth).
//
//  Implement the TODOs below, then remove this banner.
//  Reference: bcryptjs (hashing), jsonwebtoken (JWT).
// ============================================================

const User = require("../models/User");
const logger = require("../utils/logger");
// const bcrypt = require("bcryptjs");        // TODO: uncomment when used
// const jwt = require("jsonwebtoken");       // TODO: uncomment when used

// POST /api/auth/register
async function register(req, res, next) {
  try {
    // TODO (Member A):
    // 1. Pull { name, email, password } from req.body (already validated).
    // 2. Check if a user with that email already exists -> 409 if so.
    // 3. Hash the password with bcrypt (e.g. 10+ salt rounds).
    // 4. Create the User with passwordHash (NEVER store plain text).
    // 5. Respond 201 with SAFE user data (id, name, email, role) — no hash.
    logger.info("register endpoint hit (stub)");
    return res
      .status(501)
      .json({ message: "Register not implemented yet (Member A)" });
  } catch (error) {
    next(error); // hand off to central error handler
  }
}

// POST /api/auth/login
async function login(req, res, next) {
  try {
    // TODO (Member A):
    // 1. Pull { email, password } from req.body (already validated).
    // 2. Find user by email — remember passwordHash has select:false,
    //    so explicitly .select("+passwordHash").
    // 3. If no user OR bcrypt.compare fails -> 401 (same generic message
    //    for both, so you don't reveal which emails exist).
    // 4. Sign a JWT containing { id, role } using JWT_SECRET, and set an
    //    expiry from JWT_EXPIRES_IN, e.g.:
    //       jwt.sign({ id, role }, process.env.JWT_SECRET,
    //                { expiresIn: process.env.JWT_EXPIRES_IN })
    //    (never-expiring tokens are a security weakness).
    // 5. Respond 200 with the token (and safe user data).
    logger.info("login endpoint hit (stub)");
    return res
      .status(501)
      .json({ message: "Login not implemented yet (Member A)" });
  } catch (error) {
    next(error);
  }
}

module.exports = { register, login };

// ============================================================
//  Validation Middleware  —  *** STUB ***
// ------------------------------------------------------------
//  OWNER: Member B (HTTPS / validation / errors)
//  Validates & rejects bad/malicious input BEFORE it reaches
//  controllers (rubric: input validation, 10 marks).
//  Recommended library: express-validator.
//
//  Implement the rules + runValidation, then remove this banner.
// ============================================================

// const { body, validationResult } = require("express-validator");

// Reusable rule sets per route. Fill these in.
const registerRules = [
  // TODO (Member B):
  // body("name").trim().isLength({ min: 2, max: 60 }),
  // body("email").isEmail().normalizeEmail(),
  // body("password").isLength({ min: 8 })  // enforce a sane minimum
];

const loginRules = [
  // TODO (Member B):
  // body("email").isEmail().normalizeEmail(),
  // body("password").notEmpty(),
];

// Runs after the rules; collects errors and returns a SAFE 400 if any.
function runValidation(req, res, next) {
  // TODO (Member B):
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ message: "Invalid input", errors: errors.array() });
  // }
  // next();
  return next(); // placeholder — currently lets everything through
}

module.exports = { registerRules, loginRules, runValidation };

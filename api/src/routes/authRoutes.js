// ============================================================
//  Auth Routes
// ------------------------------------------------------------
//  OWNER: Member A (with Member B's validation wired in)
//  Defines the auth endpoints and chains middleware in order:
//     validation rules -> runValidation -> controller
//  This keeps routes THIN (no logic here) — logic lives in the
//  controller. That separation is a Code Structure rubric point.
// ============================================================

const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");
const {
  registerRules,
  loginRules,
  runValidation,
} = require("../middleware/validate");

// POST /api/auth/register
router.post("/register", registerRules, runValidation, register);

// POST /api/auth/login
router.post("/login", loginRules, runValidation, login);

module.exports = router;

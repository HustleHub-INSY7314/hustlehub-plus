const express = require("express");
const { body } = require("express-validator");
const { register, login, me } = require("../controllers/authController");
const validateRequest = require("../middleware/validate");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

const passwordRules = body("password")
  .isString()
  .withMessage("Password must be a string.")
  .isLength({ min: 8, max: 128 })
  .withMessage("Password must be between 8 and 128 characters.")
  .matches(/[A-Z]/)
  .withMessage("Password must contain at least one uppercase letter.")
  .matches(/[a-z]/)
  .withMessage("Password must contain at least one lowercase letter.")
  .matches(/[0-9]/)
  .withMessage("Password must contain at least one number.");

router.post(
  "/register",
  [
    body("name")
      .isString()
      .trim()
      .isLength({ min: 2, max: 80 })
      .withMessage("Name must be between 2 and 80 characters.")
      .escape(),
    body("email")
      .isEmail()
      .withMessage("A valid email address is required.")
      .normalizeEmail(),
    passwordRules,
    body("role")
      .optional()
      .isIn(["client", "freelancer"])
      .withMessage("Role must be client or freelancer.")
  ],
  validateRequest,
  register
);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("A valid email address is required.")
      .normalizeEmail(),
    body("password")
      .isString()
      .notEmpty()
      .withMessage("Password is required.")
  ],
  validateRequest,
  login
);

router.get("/me", authenticateToken, me);

module.exports = router;
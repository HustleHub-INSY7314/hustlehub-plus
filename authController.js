const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { findByEmail, findById, createUser } = require("../utils/userStore");

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt
  };
}

function generateToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
      issuer: "hustlehub-plus",
      audience: "hustlehub-api"
    }
  );
}

async function register(req, res, next) {
  try {
    const { name, email, password, role } = req.body;
    const normalisedEmail = email.toLowerCase().trim();

    if (findByEmail(normalisedEmail)) {
      return res.status(409).json({
        success: false,
        message: "A user with that email already exists."
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: normalisedEmail,
      passwordHash,
      role: role || "client",
      createdAt: new Date().toISOString()
    };

    createUser(user);

    return res.status(201).json({
      success: true,
      message: "Registration successful.",
      user: publicUser(user)
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const normalisedEmail = email.toLowerCase().trim();
    const user = findByEmail(normalisedEmail);

    // Do not reveal whether the email exists.
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });
    }

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      tokenType: "Bearer",
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
      user: publicUser(user)
    });
  } catch (error) {
    next(error);
  }
}

function me(req, res, next) {
  try {
    const user = findById(req.user.sub);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Authenticated user could not be found."
      });
    }

    return res.status(200).json({
      success: true,
      user: publicUser(user)
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { register, login, me };
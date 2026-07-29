// ============================================================
//  User Model  (Mongoose schema)
// ------------------------------------------------------------
//  This is the SHARED DATA CONTRACT for the whole team.
//  Every controller and middleware codes against this shape,
//  so it is defined in the kickoff skeleton and should only
//  be changed by agreement (open an issue/PR to discuss).
//
//  NOTE: the `role` field is included now even though Part 1
//  does not use roles. Part 2 RBAC (15 marks) reads this field,
//  so baking it in now avoids a migration later.
// ============================================================

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [60, "Name must be at most 60 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // no two users share an email
      lowercase: true,
      trim: true,
    },
    // IMPORTANT: this stores the HASHED password only.
    // Plain-text passwords must NEVER be saved (rubric hard rule).
    //
    // GOTCHA for Member A: select:false means this field is NOT returned
    // by default. On LOGIN you MUST explicitly request it:
    //     User.findOne({ email }).select("+passwordHash")
    // Otherwise user.passwordHash will be undefined and bcrypt.compare fails.
    passwordHash: {
      type: String,
      required: true,
      select: false, // never returned in queries by default
    },
    role: {
      type: String,
      enum: ["client", "freelancer", "admin"],
      default: "client",
    },
  },
  {
    timestamps: true, // adds createdAt / updatedAt automatically
  }
);

module.exports = mongoose.model("User", userSchema);

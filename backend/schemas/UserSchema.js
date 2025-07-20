// backend/schemas/UserSchema.js
const { Schema } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({ 
  email: {
    type: String,
    required: [true, "Email address required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Username required"],
  },
  password: {
    type: String,
    required: [true, "Password required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = userSchema;

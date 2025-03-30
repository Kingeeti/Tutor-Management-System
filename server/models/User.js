const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "tutor", "admin"], required: true },
});

// Remove password hashing
UserSchema.pre("save", function (next) {
  next();
});

module.exports = mongoose.model("User", UserSchema);

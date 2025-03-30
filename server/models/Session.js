const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: "Tutor", required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true }, // Example: "10:00 AM - 11:00 AM"
  status: { type: String, enum: ["Booked", "Completed", "Cancelled"], default: "Booked" },
});

module.exports = mongoose.model("Session", sessionSchema);

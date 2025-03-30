const mongoose = require("mongoose");

const tutorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  experience: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  location: { type: String, required: true },
  availability: { type: [String], required: true }, // e.g., ["Monday", "Wednesday"]
});

module.exports = mongoose.model("Tutor", tutorSchema);

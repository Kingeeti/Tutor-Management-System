const express = require("express");
const Tutor = require("../models/Tutor");
const { getTutorProfile, updateTutorProfile } = require("../controllers/tutorController");

const router = express.Router();

// Get all tutors with filtering
router.get("/search", async (req, res) => {
  try {
    const { subject, location, minExperience, minRating } = req.query;

    const filter = {};
    if (subject) filter.subject = subject;
    if (location) filter.location = location;
    if (minExperience) filter.experience = { $gte: parseInt(minExperience) };
    if (minRating) filter.rating = { $gte: parseFloat(minRating) };

    const tutors = await Tutor.find(filter);
    res.status(200).json(tutors);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tutors" });
  }
});

router.get("/:id", getTutorProfile);
router.put("/:id", updateTutorProfile);

module.exports = router;

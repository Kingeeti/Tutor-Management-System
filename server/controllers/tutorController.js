const Tutor = require("../models/Tutor");

// Get tutor profile
exports.getTutorProfile = async (req, res) => {
  try {
    const tutor = await Tutor.findById(req.params.id);
    if (!tutor) {
      return res.status(404).json({ error: "Tutor not found" });
    }
    res.status(200).json(tutor);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tutor profile" });
  }
};

// Update tutor profile
exports.updateTutorProfile = async (req, res) => {
  try {
    const updatedTutor = await Tutor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTutor) {
      return res.status(404).json({ error: "Tutor not found" });
    }
    res.status(200).json(updatedTutor);
  } catch (error) {
    res.status(500).json({ error: "Error updating tutor profile" });
  }
};

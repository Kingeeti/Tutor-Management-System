const Tutor = require("../models/Tutor");

// Get all tutors pending verification
exports.getPendingTutors = async (req, res) => {
  try {
    const pendingTutors = await Tutor.find({ isVerified: false });
    res.status(200).json(pendingTutors);
  } catch (error) {
    res.status(500).json({ error: "Error fetching pending tutors" });
  }
};

// Approve a tutor
exports.approveTutor = async (req, res) => {
  try {
    const updatedTutor = await Tutor.findByIdAndUpdate(req.params.id, { isVerified: true }, { new: true });
    if (!updatedTutor) {
      return res.status(404).json({ error: "Tutor not found" });
    }
    res.status(200).json({ message: "Tutor approved successfully", tutor: updatedTutor });
  } catch (error) {
    res.status(500).json({ error: "Error approving tutor" });
  }
};

// Reject a tutor
exports.rejectTutor = async (req, res) => {
  try {
    const deletedTutor = await Tutor.findByIdAndDelete(req.params.id);
    if (!deletedTutor) {
      return res.status(404).json({ error: "Tutor not found" });
    }
    res.status(200).json({ message: "Tutor rejected successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error rejecting tutor" });
  }
};

const Session = require("../models/Session");

// Get tutor earnings
exports.getTutorEarnings = async (req, res) => {
  try {
    const sessions = await Session.find({ tutor: req.params.tutorId });
    const totalEarnings = sessions.reduce((sum, session) => sum + session.fee, 0);

    res.status(200).json({ totalEarnings, sessionCount: sessions.length });
  } catch (error) {
    res.status(500).json({ error: "Error fetching earnings" });
  }
};

const Tutor = require("../models/Tutor");
const Student = require("../models/Student");
const Session = require("../models/Session");

exports.getPlatformStats = async (req, res) => {
  try {
    const totalTutors = await Tutor.countDocuments({ isVerified: true });
    const totalStudents = await Student.countDocuments();
    const totalSessions = await Session.countDocuments();
    const totalEarnings = await Session.aggregate([{ $group: { _id: null, total: { $sum: "$fee" } } }]);

    res.status(200).json({
      totalTutors,
      totalStudents,
      totalSessions,
      totalEarnings: totalEarnings.length > 0 ? totalEarnings[0].total : 0,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching reports" });
  }
};

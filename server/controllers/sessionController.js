const Session = require("../models/Session");
const Tutor = require("../models/Tutor");
const User = require("../models/User");

// Book a session
exports.bookSession = async (req, res) => {
  try {
    const { tutorId, studentId, date, time } = req.body;

    // Validate tutor and student
    const tutor = await Tutor.findById(tutorId);
    if (!tutor) return res.status(404).json({ error: "Tutor not found" });

    const student = await User.findById(studentId);
    if (!student) return res.status(404).json({ error: "Student not found" });

    // Check if session already exists
    const existingSession = await Session.findOne({ tutor: tutorId, date, time });
    if (existingSession) return res.status(400).json({ error: "Session slot already booked" });

    // Create session
    const newSession = new Session({ tutor: tutorId, student: studentId, date, time });
    await newSession.save();

    res.status(201).json({ message: "Session booked successfully", session: newSession });
  } catch (error) {
    res.status(500).json({ error: "Error booking session" });
  }
};

// Get sessions for a student
exports.getStudentSessions = async (req, res) => {
  try {
    const { studentId } = req.params;
    const sessions = await Session.find({ student: studentId }).populate("tutor", "name subject");
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ error: "Error fetching sessions" });
  }
};

// Update session date/time
exports.updateSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { date, time } = req.body;

    const session = await Session.findByIdAndUpdate(
      sessionId,
      { date, time },
      { new: true }
    );

    if (!session) return res.status(404).json({ error: "Session not found" });

    res.status(200).json({ message: "Session updated successfully", session });
  } catch (error) {
    res.status(500).json({ error: "Error updating session" });
  }
};

// Delete a session
exports.deleteSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await Session.findByIdAndDelete(sessionId);

    if (!session) return res.status(404).json({ error: "Session not found" });

    res.status(200).json({ message: "Session deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting session" });
  }
};

// Get tutor's sessions
exports.getTutorSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ tutor: req.params.tutorId }).populate("student");
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ error: "Error fetching sessions" });
  }
};


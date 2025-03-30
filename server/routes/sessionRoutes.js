const express = require("express");
const { bookSession, getStudentSessions } = require("../controllers/sessionController");
const { getTutorSessions } = require("../controllers/sessionController");
const { updateSession, deleteSession } = require("../controllers/sessionController");

const router = express.Router();

// Book a session
router.post("/book", bookSession);

// Get all sessions for a student
router.get("/student/:studentId", getStudentSessions);

// Update a session
router.put("/:sessionId", updateSession);

// Delete a session
router.delete("/:sessionId", deleteSession);

// Get all sessions for a tutor
router.get("/:tutorId", getTutorSessions);

module.exports = router;

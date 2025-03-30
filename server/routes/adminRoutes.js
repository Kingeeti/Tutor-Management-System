const express = require("express");
const { getPendingTutors, approveTutor, rejectTutor } = require("../controllers/adminController");

const router = express.Router();

router.get("/pending-tutors", getPendingTutors);
router.put("/approve/:id", approveTutor);

router.delete('/reject/:id', (req, res) => {
    const tutorId = req.params.id;
    console.log(`Rejecting tutor`);
    res.json({ message: `Tutor rejected successfully` });
});

module.exports = router;

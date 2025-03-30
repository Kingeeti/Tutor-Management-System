const express = require("express");
const { getTutorEarnings } = require("../controllers/earningsController");

const router = express.Router();

router.get("/:tutorId", getTutorEarnings);

module.exports = router;

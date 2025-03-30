const express = require("express");
const { getPlatformStats } = require("../controllers/reportsController");

const router = express.Router();

router.get("/", getPlatformStats);

module.exports = router;

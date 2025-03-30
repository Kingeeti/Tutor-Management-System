const express = require("express");
const { addReview, getTutorReviews, getTutorRating } = require("../controllers/reviewController");

const router = express.Router();

// Add a review
router.post("/", addReview);

// Get reviews for a specific tutor
router.get("/:tutorId", getTutorReviews);

// Get average rating for a specific tutor
router.get("/:tutorId/rating", getTutorRating);

module.exports = router;

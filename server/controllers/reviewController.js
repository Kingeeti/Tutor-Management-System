const Review = require("../models/Review");
const Tutor = require("../models/Tutor");

// Add a new review
exports.addReview = async (req, res) => {
  try {
    const { student, tutor, rating, comment } = req.body;

    // Check if the student has already reviewed the tutor
    const existingReview = await Review.findOne({ student, tutor });
    if (existingReview) {
      return res.status(400).json({ error: "You have already reviewed this tutor." });
    }

    const newReview = new Review({ student, tutor, rating, comment });
    await newReview.save();

    res.status(201).json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    res.status(500).json({ error: "Error adding review" });
  }
};

// Get all reviews for a tutor
exports.getTutorReviews = async (req, res) => {
  try {
    const { tutorId } = req.params;
    const reviews = await Review.find({ tutor: tutorId }).populate("student", "name");

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Error fetching reviews" });
  }
};

// Get average rating for a tutor
exports.getTutorRating = async (req, res) => {
  try {
    const { tutorId } = req.params;
    const reviews = await Review.find({ tutor: tutorId });

    if (reviews.length === 0) {
      return res.status(200).json({ averageRating: 0 });
    }

    const averageRating =
      reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

    res.status(200).json({ averageRating: averageRating.toFixed(1) });
  } catch (error) {
    res.status(500).json({ error: "Error fetching tutor rating" });
  }
};

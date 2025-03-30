const Wishlist = require("../models/Wishlist");

// Add tutor to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const { student, tutor } = req.body;

    // Check if tutor is already in the wishlist
    const existingEntry = await Wishlist.findOne({ student, tutor });
    if (existingEntry) {
      return res.status(400).json({ error: "Tutor already in wishlist." });
    }

    const newWishlistItem = new Wishlist({ student, tutor });
    await newWishlistItem.save();

    res.status(201).json({ message: "Tutor added to wishlist.", item: newWishlistItem });
  } catch (error) {
    res.status(500).json({ error: "Error adding tutor to wishlist." });
  }
};

// Remove tutor from wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const { student, tutor } = req.body;

    const deletedItem = await Wishlist.findOneAndDelete({ student, tutor });

    if (!deletedItem) {
      return res.status(404).json({ error: "Tutor not found in wishlist." });
    }

    res.status(200).json({ message: "Tutor removed from wishlist." });
  } catch (error) {
    res.status(500).json({ error: "Error removing tutor from wishlist." });
  }
};

// Get student's wishlist
exports.getWishlist = async (req, res) => {
  try {
    const { studentId } = req.params;
    const wishlist = await Wishlist.find({ student: studentId }).populate("tutor");

    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ error: "Error fetching wishlist." });
  }
};

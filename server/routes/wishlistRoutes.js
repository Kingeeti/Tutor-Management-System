const express = require("express");
const {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} = require("../controllers/wishlistController");

const router = express.Router();

// Add to wishlist
router.post("/", addToWishlist);

// Remove from wishlist
router.delete("/", removeFromWishlist);

// Get student's wishlist
router.get("/:studentId", getWishlist);

module.exports = router;

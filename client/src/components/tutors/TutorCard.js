import React, { useEffect, useState } from "react";
import axios from "axios";

const TutorCard = ({ tutor }) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    fetchRating();
  }, []);

  const fetchRating = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/reviews/${tutor._id}/rating`);
      setRating(response.data.averageRating);
    } catch (error) {
      console.error("Error fetching tutor rating", error);
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h3 className="text-lg font-bold">{tutor.name}</h3>
      <p className="text-gray-600">{tutor.subject}</p>
      <p className="text-yellow-500">⭐ {rating} / 5</p>
    </div>
  );
};

useEffect(() => {
  checkWishlist();
}, []);

const checkWishlist = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/wishlist/${studentId}`);
    const wishlistedTutors = response.data.map((item) => item.tutor._id);
    setIsWishlisted(wishlistedTutors.includes(tutor._id));
  } catch (error) {
    console.error("Error checking wishlist", error);
  }
};

const handleWishlistToggle = async () => {
  try {
    if (isWishlisted) {
      await axios.delete("http://localhost:5000/api/wishlist", {
        data: { student: studentId, tutor: tutor._id },
      });
    } else {
      await axios.post("http://localhost:5000/api/wishlist", {
        student: studentId,
        tutor: tutor._id,
      });
    }
    setIsWishlisted(!isWishlisted);
  } catch (error) {
    console.error("Error updating wishlist", error);
  }
};

return (
  <div className="border rounded-lg p-4 shadow-md">
    <h3 className="text-lg font-bold">{tutor.name}</h3>
    <p className="text-gray-600">{tutor.subject}</p>
    <button
      className={`mt-2 px-4 py-2 rounded ${
        isWishlisted ? "bg-red-500 text-white" : "bg-blue-500 text-white"
      }`}
      onClick={handleWishlistToggle}
    >
      {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
    </button>
  </div>
);

export default TutorCard;

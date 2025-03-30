import React, { useState } from "react";
import axios from "axios";

const ReviewForm = ({ tutorId, studentId, onReviewAdded }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/reviews", {
        student: studentId,
        tutor: tutorId,
        rating,
        comment,
      });
      alert("Review submitted successfully");
      onReviewAdded();
      setRating(5);
      setComment("");
    } catch (error) {
      alert("Error submitting review");
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-2">Leave a Review</h3>
      <form onSubmit={submitReview}>
        <label className="block mb-2">
          Rating:
          <select
            className="border p-2 w-full"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} Stars
              </option>
            ))}
          </select>
        </label>
        <label className="block mb-2">
          Comment:
          <textarea
            className="border p-2 w-full"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;

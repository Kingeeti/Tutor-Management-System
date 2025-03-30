import React, { useEffect, useState } from "react";
import axios from "axios";
import TutorCard from "../../components/tutors/TutorCard";

const Wishlist = ({ studentId }) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/wishlist/${studentId}`);
      setWishlist(response.data);
    } catch (error) {
      console.error("Error fetching wishlist", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Wishlist</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlist.length === 0 ? (
          <p>No tutors in your wishlist.</p>
        ) : (
          wishlist.map((item) => <TutorCard key={item._id} tutor={item.tutor} studentId={studentId} />)
        )}
      </div>
    </div>
  );
};

export default Wishlist;

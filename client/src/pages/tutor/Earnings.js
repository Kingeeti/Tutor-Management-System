import React, { useEffect, useState } from "react";
import axios from "axios";

const Earnings = ({ tutorId }) => {
  const [earnings, setEarnings] = useState(0);
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    fetchEarnings();
  }, []);

  const fetchEarnings = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/earnings/${tutorId}`);
      setEarnings(response.data.totalEarnings);
      setSessionCount(response.data.sessionCount);
    } catch (error) {
      console.error("Error fetching earnings", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Earnings Summary</h2>
      <p>Total Earnings: <strong>${earnings.toFixed(2)}</strong></p>
      <p>Total Sessions: <strong>{sessionCount}</strong></p>
    </div>
  );
};

export default Earnings;

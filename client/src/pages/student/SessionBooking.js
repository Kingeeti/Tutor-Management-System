import React, { useState, useEffect } from "react";
import axios from "axios";

const SessionBooking = () => {
  const [tutors, setTutors] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const studentId = "60b6a3d5f1c2a4567890abcd"; // Replace with logged-in student ID

  useEffect(() => {
    fetchTutors();
  }, []);

  const fetchTutors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tutors/search");
      setTutors(response.data);
    } catch (error) {
      console.error("Error fetching tutors", error);
    }
  };

  const bookSession = async () => {
    if (!selectedTutor || !date || !time) {
      alert("Please select all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/sessions/book", {
        tutorId: selectedTutor,
        studentId,
        date,
        time,
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Error booking session", error);
      alert(error.response?.data?.error || "Error booking session");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Book a Tutor Session</h2>

      <div className="mb-4">
        <label className="block font-semibold">Select Tutor:</label>
        <select
          className="p-2 border rounded w-full"
          value={selectedTutor}
          onChange={(e) => setSelectedTutor(e.target.value)}
        >
          <option value="">Choose a tutor</option>
          {tutors.map((tutor) => (
            <option key={tutor._id} value={tutor._id}>
              {tutor.name} - {tutor.subject}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Select Date:</label>
        <input
          type="date"
          className="p-2 border rounded w-full"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Select Time:</label>
        <input
          type="time"
          className="p-2 border rounded w-full"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      <button
        onClick={bookSession}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        Book Session
      </button>
    </div>
  );
};

export default SessionBooking;

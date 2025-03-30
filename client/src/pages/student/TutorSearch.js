import React, { useState, useEffect } from "react";
import axios from "axios";

const TutorSearch = () => {
  const [tutors, setTutors] = useState([]);
  const [subject, setSubject] = useState("");
  const [location, setLocation] = useState("");
  const [minExperience, setMinExperience] = useState("");
  const [minRating, setMinRating] = useState("");

  useEffect(() => {
    fetchTutors();
  }, []);

  const fetchTutors = async () => {
    try {
      const params = {};
      if (subject) params.subject = subject;
      if (location) params.location = location;
      if (minExperience) params.minExperience = minExperience;
      if (minRating) params.minRating = minRating;

      const response = await axios.get("http://localhost:5000/api/tutors/search", { params });
      setTutors(response.data);
    } catch (error) {
      console.error("Error fetching tutors", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Search Tutors</h2>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Subject"
          className="p-2 border rounded"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          className="p-2 border rounded"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Experience (Years)"
          className="p-2 border rounded"
          value={minExperience}
          onChange={(e) => setMinExperience(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Rating"
          className="p-2 border rounded"
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
        />
        <button onClick={fetchTutors} className="bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </div>

      <div>
        {tutors.length > 0 ? (
          <ul className="space-y-4">
            {tutors.map((tutor) => (
              <li key={tutor._id} className="p-4 border rounded shadow">
                <h3 className="text-xl font-semibold">{tutor.name}</h3>
                <p>Subject: {tutor.subject}</p>
                <p>Experience: {tutor.experience} years</p>
                <p>Rating: {tutor.rating}</p>
                <p>Location: {tutor.location}</p>
                <p>Availability: {tutor.availability.join(", ")}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tutors found.</p>
        )}
      </div>
    </div>
  );
};

export default TutorSearch;

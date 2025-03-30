import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = ({ tutorId }) => {
  const [tutor, setTutor] = useState({});
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchTutorProfile();
  }, []);

  const fetchTutorProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/tutors/${tutorId}`);
      setTutor(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching tutor profile", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/tutors/${tutorId}`, formData);
      fetchTutorProfile();
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Tutor Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" value={formData.name || ""} onChange={handleChange} placeholder="Name" />
        <input type="text" name="subject" value={formData.subject || ""} onChange={handleChange} placeholder="Subject" />
        <input type="text" name="bio" value={formData.bio || ""} onChange={handleChange} placeholder="Bio" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;

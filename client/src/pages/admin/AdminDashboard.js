import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [pendingTutors, setPendingTutors] = useState([]);

  useEffect(() => {
    fetchPendingTutors();
  }, []);

  const fetchPendingTutors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/pending-tutors");
      setPendingTutors(response.data);
    } catch (error) {
      console.error("Error fetching pending tutors", error);
    }
  };

  const handleApproval = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/approve/${id}`);
      fetchPendingTutors();
    } catch (error) {
      console.error("Error approving tutor", error);
    }
  };

  const handleRejection = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/reject/${id}`);
      fetchPendingTutors();
    } catch (error) {
      console.error("Error rejecting tutor", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Pending Tutor Approvals</h2>
      {pendingTutors.length === 0 ? (
        <p>No pending tutors.</p>
      ) : (
        <ul>
          {pendingTutors.map((tutor) => (
            <li key={tutor._id} className="border p-2 my-2 rounded flex justify-between items-center">
              <span>{tutor.name} - {tutor.subject}</span>
              <div>
                <button onClick={() => handleApproval(tutor._id)} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
                  Approve
                </button>
                <button onClick={() => handleRejection(tutor._id)} className="bg-red-500 text-white px-4 py-2 rounded">
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminDashboard;

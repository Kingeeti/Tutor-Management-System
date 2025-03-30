import React, { useEffect, useState } from "react";
import axios from "axios";

const SessionsDashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [editingSession, setEditingSession] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const studentId = "60b6a3d5f1c2a4567890abcd"; // Replace with logged-in student ID

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/sessions/student/${studentId}`);
      setSessions(response.data);
    } catch (error) {
      console.error("Error fetching sessions", error);
    }
  };

  const updateSession = async (sessionId) => {
    try {
      await axios.put(`http://localhost:5000/api/sessions/${sessionId}`, { date, time });
      alert("Session updated successfully");
      setEditingSession(null);
      fetchSessions();
    } catch (error) {
      console.error("Error updating session", error);
    }
  };

  const deleteSession = async (sessionId) => {
    if (!window.confirm("Are you sure you want to delete this session?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/sessions/${sessionId}`);
      alert("Session deleted successfully");
      fetchSessions();
    } catch (error) {
      console.error("Error deleting session", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Booked Sessions</h2>
      {sessions.length === 0 ? (
        <p>No sessions booked yet.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Tutor</th>
              <th className="border p-2">Subject</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Time</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr key={session._id} className="text-center border-b">
                <td className="border p-2">{session.tutor.name}</td>
                <td className="border p-2">{session.tutor.subject}</td>
                <td className="border p-2">{session.date.split("T")[0]}</td>
                <td className="border p-2">{session.time}</td>
                <td className="border p-2">
                  {editingSession === session._id ? (
                    <>
                      <input
                        type="date"
                        className="border p-1 mr-2"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                      <input
                        type="time"
                        className="border p-1 mr-2"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      />
                      <button
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                        onClick={() => updateSession(session._id)}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-500 text-white px-2 py-1 rounded"
                        onClick={() => setEditingSession(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                        onClick={() => {
                          setEditingSession(session._id);
                          setDate(session.date.split("T")[0]);
                          setTime(session.time);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => deleteSession(session._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SessionsDashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";

const TutorSessions = ({ tutorId }) => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/sessions/${tutorId}`);
      setSessions(response.data);
    } catch (error) {
      console.error("Error fetching sessions", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Sessions</h2>
      {sessions.length === 0 ? <p>No scheduled sessions.</p> : (
        <ul>
          {sessions.map((session) => (
            <li key={session._id} className="border p-2 my-2 rounded">
              {session.student.name} - {new Date(session.date).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TutorSessions;

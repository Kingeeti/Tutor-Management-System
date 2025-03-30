import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Reports = () => {
  const [stats, setStats] = useState({
    totalTutors: 0,
    totalStudents: 0,
    totalSessions: 0,
    totalEarnings: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/reports");
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching reports", error);
    }
  };

  const data = {
    labels: ["Tutors", "Students", "Sessions", "Earnings"],
    datasets: [
      {
        label: "Platform Statistics",
        data: [stats.totalTutors, stats.totalStudents, stats.totalSessions, stats.totalEarnings],
        backgroundColor: ["#4CAF50", "#2196F3", "#FF9800", "#F44336"],
      },
    ],
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Platform Reports</h2>
      <div className="bg-white p-4 rounded shadow">
        <Bar data={data} />
      </div>
    </div>
  );
};

export default Reports;

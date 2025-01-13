// src/pages/AdminDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
//import "./../styles/Dashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-buttons">
        <button onClick={() => navigate("/create-poll")}>Create Poll</button>
        <button onClick={() => navigate("/manage-polls")}>Manage Polls</button>
        <button onClick={() => navigate("/view-results")}>View Results</button>
      </div>
    </div>
  );
};

export default AdminDashboard;

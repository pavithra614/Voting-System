// src/pages/LoginPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./../styles/Pages.css";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sending login credentials (username and password) to backend
      const response = await axios.post("http://localhost:5000/users/login", credentials);

      // Handle success response
      console.log("Login successful:", response.data.message);
      localStorage.setItem("token", response.data.token); // Store the token in localStorage

      // Check if the logged-in user is an admin
      if (response.data.role === "admin") {
        navigate("/admin-dashboard"); // Redirect admin to their dashboard
      } else {
        setMessage("You are not authorized to access the admin dashboard.");
      }
    } catch (error) {
      // Handle error response
      if (error.response) {
        console.error("Error response from backend:", error.response.data);
        setMessage(error.response.data.error || "Invalid username or password");
      } else if (error.request) {
        console.error("No response received from backend:", error.request);
        setMessage("No response received from backend.");
      } else {
        console.error("Error setting up the request:", error.message);
        setMessage("Error setting up the request.");
      }
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginPage;

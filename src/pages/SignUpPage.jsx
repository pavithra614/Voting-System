import React, { useState } from "react";
import axios from "axios";
import "./../styles/Pages.css";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "user", // Default to 'user', but you can add a dropdown for role selection
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState(""); // For specific error messages

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log the form data being sent to the server
    console.log("Sending data to backend:", formData);

    try {
      // Send the form data to your backend API
      const response = await axios.post("http://localhost:5000/users/register", formData);

      // Handle success response
      setMessage(response.data.message); // Message from the backend
      setError(""); // Clear any previous error messages
      console.log(response.data.message);
    } catch (error) {
      // Handle error response
      // Check if a specific error message exists
      setMessage(""); // Clear any previous success messages
      setError(error.response?.data?.message || "Error signing up");
      console.error("Sign Up Error:", error.response?.data);
    }
  };

  return (
    <div className="sign-up-page">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>

      {message && <p style={{ color: "green" }}>{message}</p>} {/* Display success message */}
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}
    </div>
  );
};

export default SignUpPage;

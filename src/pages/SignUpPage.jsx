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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the form data to your backend API
      const response = await axios.post("http://localhost:5000/users/register", formData);

      // Handle success response
      setMessage(response.data.message); // Message from the backend
      console.log(response.data.message);
    } catch (error) {
      // Handle error response
      setMessage(error.response?.data?.message || "Error signing up"); // Handle error gracefully
      console.error(error);
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
      {message && <p>{message}</p>} {/* Display the message here */}
    </div>
  );
};

export default SignUpPage;

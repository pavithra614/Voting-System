// src/pages/ManagePolls.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../styles/Pages.css";

const ManagePolls = () => {
  const [polls, setPolls] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await axios.get("http://localhost:5000/polls");
        setPolls(response.data);
      } catch (error) {
        console.error("Error fetching polls:", error);
      }
    };

    fetchPolls();
  }, []);

  const deletePoll = async (pollId) => {
    try {
      await axios.delete(`http://localhost:5000/polls/${pollId}`);
      setPolls(polls.filter((poll) => poll.id !== pollId));
      setMessage("Poll deleted successfully.");
    } catch (error) {
      setMessage("Failed to delete poll.");
      console.error(error);
    }
  };

  return (
    <div className="manage-polls">
      <h2>Manage Polls</h2>
      {message && <p>{message}</p>}
      <ul>
        {polls.map((poll) => (
          <li key={poll.id}>
            <h3>{poll.title}</h3>
            <button onClick={() => deletePoll(poll.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManagePolls;

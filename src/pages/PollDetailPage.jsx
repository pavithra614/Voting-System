// src/pages/PollDetailPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./../styles/Pages.css";

const PollDetailPage = () => {
  const { pollId } = useParams(); // Get the pollId from the URL
  const [poll, setPoll] = useState(null);

  useEffect(() => {
    const fetchPollDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/polls/${pollId}`);
        console.log("Fetched poll details:", response.data.poll); // Debugging: Inspect the poll data
        setPoll(response.data.poll);
      } catch (error) {
        console.error("Error fetching poll details:", error);
      }
    };

    fetchPollDetails();
  }, [pollId]);

  if (!poll) {
    return <p>Loading poll details...</p>;
  }

  return (
    <div className="poll-detail">
      <h2>{poll.title}</h2>
      <h3>Options:</h3>
      <ul>
        {poll.options.map((option, index) => (
          <li key={index}>
            {typeof option === "object" ? option.text : option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PollDetailPage;

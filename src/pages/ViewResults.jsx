// src/pages/ViewResults.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../styles/Pages.css";

const ViewResults = () => {
  const [pollResults, setPollResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get("http://localhost:5000/polls/results");
        setPollResults(response.data);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResults();
  }, []);

  return (
    <div className="view-results">
      <h2>Poll Results</h2>
      <ul>
        {pollResults.map((poll) => (
          <li key={poll.id}>
            <h3>{poll.title}</h3>
            <ul>
              {poll.options.map((option) => (
                <li key={option.id}>
                  {option.text}: {option.votes} votes
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewResults;

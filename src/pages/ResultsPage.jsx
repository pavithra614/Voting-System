import React, { useState, useEffect } from "react";
import axios from "axios";
import RealTimeResults from "../components/RealTimeResults";
import "./../styles/Pages.css";

const ResultsPage = () => {
  const [polls, setPolls] = useState([]);
  
  useEffect(() => {
    // Fetch the actual polls from the backend API
    const fetchPolls = async () => {
      try {
        const response = await axios.get("http://localhost:5000/polls"); // Adjust the URL if needed
        setPolls(response.data); // Assuming the response is an array of polls
      } catch (error) {
        console.error("Error fetching polls:", error);
      }
    };

    fetchPolls();
  }, []);

  return (
    <div className="results-page">
      <h1>Poll Results</h1>
      {polls.length === 0 ? (
        <p>No polls available.</p>
      ) : (
        polls.map((poll) => (
          <div key={poll.id} className="poll-results">
            <h3>{poll.title}</h3>
            <RealTimeResults pollId={poll.id} />
          </div>
        ))
      )}
    </div>
  );
};

export default ResultsPage;

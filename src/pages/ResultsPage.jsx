// src/pages/ResultsPage.jsx
import React, { useState, useEffect } from "react";
import RealTimeResults from "../components/RealTimeResults";
import "./../styles/Pages.css";

const ResultsPage = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    // Simulate fetch from API
    setPolls([
      { id: 1, title: "Favorite Programming Language?" },
      { id: 2, title: "Best Frontend Framework?" },
    ]);
  }, []);

  return (
    <div className="results-page">
      <h1>Poll Results</h1>
      {polls.map((poll) => (
        <div key={poll.id} className="poll-results">
          <h3>{poll.title}</h3>
          <RealTimeResults pollId={poll.id} />
        </div>
      ))}
    </div>
  );
};

export default ResultsPage;

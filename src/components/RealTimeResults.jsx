// src/components/RealTimeResults.jsx
import React, { useEffect, useState } from "react";
import "./../styles/Components.css";

const RealTimeResults = ({ pollId }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Simulate WebSocket updates for real-time results
    const interval = setInterval(() => {
      setResults([
        { option: "Option A", votes: Math.floor(Math.random() * 100) },
        { option: "Option B", votes: Math.floor(Math.random() * 100) },
      ]);
    }, 2000);
    return () => clearInterval(interval);
  }, [pollId]);

  return (
    <div className="real-time-results">
      <h3>Real-Time Results</h3>
      {results.map((result, index) => (
        <p key={index}>
          {result.option}: {result.votes} votes
        </p>
      ))}
    </div>
  );
};

export default RealTimeResults;

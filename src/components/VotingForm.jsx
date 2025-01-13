// src/components/VotingForm.jsx
import React, { useState } from "react";
import "./../styles/Components.css";

const VotingForm = ({ poll, onVote }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleVote = () => {
    if (selectedOption) {
      onVote(selectedOption);
    }
  };

  return (
    <div className="voting-form">
      <h3>{poll.title}</h3>
      {poll.options.map((option, index) => (
        <label key={index}>
          <input
            type="radio"
            value={option}
            name="vote"
            onChange={(e) => setSelectedOption(e.target.value)}
          />
          {option}
        </label>
      ))}
      <button onClick={handleVote} disabled={!selectedOption}>
        Submit Vote
      </button>
    </div>
  );
};

export default VotingForm;

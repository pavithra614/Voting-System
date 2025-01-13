import React from "react";

const VotingForm = ({ poll, onVote }) => {
  return (
    <div className="voting-form">
      <h2>{poll.title}</h2>
      <ul>
        {poll.options.map((option, index) => (
          <li key={index}>
            <button onClick={() => onVote(option)}>{option}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VotingForm;

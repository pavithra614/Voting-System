// src/components/PollCard.jsx
import React from "react";
import "./../styles/Components.css";

const PollCard = ({ poll, onVote }) => {
  return (
    <div className="poll-card">
      <h3>{poll.title}</h3>
      <p>{poll.description}</p>
      <button onClick={() => onVote(poll.id)}>Vote Now</button>
    </div>
  );
};

export default PollCard;

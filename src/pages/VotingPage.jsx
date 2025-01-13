// src/pages/VotingPage.jsx
import React, { useState } from "react";
import VotingForm from "../components/VotingForm";
import "./../styles/Pages.css";

const VotingPage = () => {
  const [poll] = useState({
    id: 1,
    title: "Favorite Programming Language?",
    options: ["JavaScript", "Python", "Java", "C++"],
  });

  const handleVote = (option) => {
    console.log("Voted for:", option);
  };

  return (
    <div className="voting-page">
      <VotingForm poll={poll} onVote={handleVote} />
    </div>
  );
};

export default VotingPage;

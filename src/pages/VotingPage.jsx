import React, { useState, useEffect } from "react";
import VotingForm from "../components/VotingForm";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./../styles/Pages.css";

const VotingPage = () => {
  const { pollId } = useParams(); // Get the pollId from the URL
  const [poll, setPoll] = useState(null); // Initial state for poll
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        // Fetch poll data
        const pollResponse = await axios.get(`http://localhost:5000/polls/${pollId}`);
        const pollData = pollResponse.data.poll;

        // Fetch poll options
        const optionsResponse = await axios.get(`http://localhost:5000/polls/${pollId}/options`);
        const optionsData = optionsResponse.data.options;

        // Ensure options data is an array
        if (!Array.isArray(optionsData)) {
          throw new Error("Options data is not in the expected array format.");
        }

        // Combine poll data with its options
        setPoll({
          id: pollData.id,
          title: pollData.title,
          options: optionsData.map((option) => option.option_text), // Extract only option text
        });
      } catch (err) {
        console.error("Error fetching poll:", err);
        setError("Failed to load poll. Please try again later.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchPoll();
  }, [pollId]);

  if (loading) {
    return <div>Loading poll options...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!poll) {
    return <div>Poll not found.</div>;
  }

  const handleVote = (option) => {
    console.log("Voted for:", option);
    // Add vote submission logic here if needed
  };

  return (
    <div className="voting-page">
      <h1>{poll.title}</h1>
      <VotingForm poll={poll} onVote={handleVote} />
    </div>
  );
};

export default VotingPage;

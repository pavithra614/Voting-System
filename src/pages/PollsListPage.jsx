import React, { useState, useEffect } from "react";
import PollCard from "../components/PollCard";
import axios from "axios";  // Import axios for making API calls
import "./../styles/Pages.css";

const PollsListPage = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(""); // To handle any errors

  useEffect(() => {
    // Fetch polls from the backend API
    const fetchPolls = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/polls"); // Replace with your API endpoint
        setPolls(response.data); // Set the polls data to state
      } catch (err) {
        setError("Failed to load polls");
        console.error("Error fetching polls:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPolls(); // Fetch polls when component mounts
  }, []); // Empty array to run the effect once on mount

  const handleVote = (pollId) => {
    console.log("Voting for poll:", pollId);
    // You can implement voting logic here later
  };

  if (loading) return <div>Loading polls...</div>; // Loading state
  if (error) return <div>{error}</div>; // Error state

  return (
    <div className="polls-list-page">
      <h1>Active Polls</h1>
      <div className="polls-container">
        {polls.length > 0 ? (
          polls.map((poll) => (
            <PollCard key={poll.id} poll={poll} onVote={handleVote} />
          ))
        ) : (
          <p>No active polls available</p>
        )}
      </div>
    </div>
  );
};

export default PollsListPage;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Voting() {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/candidates');
        setCandidates(response.data);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };
    fetchCandidates();
  }, []);

  const handleVote = async () => {
    if (!selectedCandidate) return;
    try {
      await axios.post('http://localhost:5000/api/vote', { candidateId: selectedCandidate });
      alert('Vote submitted successfully!');
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  return (
    <div className="container">
      <h2>Vote</h2>
      <ul className="list-group">
        {candidates.map((candidate) => (
          <li
            key={candidate.id}
            className={`list-group-item ${selectedCandidate === candidate.id ? 'active' : ''}`}
            onClick={() => setSelectedCandidate(candidate.id)}
          >
            {candidate.name}
          </li>
        ))}
      </ul>
      <button className="btn btn-success mt-3" onClick={handleVote}>
        Submit Vote
      </button>
    </div>
  );
}

export default Voting;

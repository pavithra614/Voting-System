// src/pages/CreatePoll.jsx
import React, { useState } from "react";
import axios from "axios";
import "./../styles/Pages.css";

const CreatePoll = () => {
  const [pollTitle, setPollTitle] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [message, setMessage] = useState("");

  const addOption = () => setOptions([...options, ""]);

  const removeOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/polls/create", {
        title: pollTitle,
        options,
      });
      setMessage("Poll created successfully!");
    } catch (error) {
      setMessage("Failed to create poll.");
      console.error(error);
    }
  };

  return (
    <div className="create-poll">
      <h2>Create a New Poll</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Poll Title"
          value={pollTitle}
          onChange={(e) => setPollTitle(e.target.value)}
          required
        />
        <h3>Options</h3>
        {options.map((option, index) => (
          <div key={index} className="option-input">
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) =>
                setOptions(
                  options.map((opt, i) => (i === index ? e.target.value : opt))
                )
              }
              required
            />
            <button type="button" onClick={() => removeOption(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addOption}>
          Add Option
        </button>
        <button type="submit">Create Poll</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreatePoll;

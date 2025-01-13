// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PollsListPage from "./pages/PollsListPage";
import VotingPage from "./pages/VotingPage";
import ResultsPage from "./pages/ResultsPage";
import AdminDashboard from "./pages/AdminDashboard";
import './App.css';
import CreatePoll from "./pages/CreatePoll";
import ManagePolls from "./pages/ManagePolls";
import ViewResults from "./pages/ViewResults";

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/polls" element={<PollsListPage />} />
          <Route path="/polls/:pollId" element={<VotingPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard/>} />
          <Route path="/Create-Poll" element={< CreatePoll />} />
          <Route path="/View-Results" element={< ViewResults />} />
          <Route path="/manage-polls" element={< ManagePolls />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;



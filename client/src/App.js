
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import ProjectListWrapper from "./components/ProjectListWrapper";
import NewProjectForm from "./components/NewProjectForm";
import InterestList from "./components/InterestList";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectListWrapper />} />
        <Route path="/new-project-form" element={<NewProjectForm />} />
        <Route path="/interest-list" element={<InterestList />} />
      </Routes>
    </Router>
  );
}

export default App;



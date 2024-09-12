import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./NavBar";
import HomePage from "./HomePage";
import ProjectPage from './ProjectPage'; 
import NewProjectForm from "./NewProjectForm";
import InterestList from "./InterestList";
import Login from "./Login";
import SignUpForm from "./SignUpForm"; 
import UserPage from "./UserPage"; 

function App() {

  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  
  // useEffect(() => {
  //   // auto-login
  //   fetch("http://localhost:5555/check_session")
  //   .then((r) => {
  //     if (r.ok) {
  //       r.json().then((user) => setUser(user));
  //     }
  //   });
  // }, []);

  if (!user) return <Login onLogin={setUser} />;
  return (
    <Router>
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/projects/:id" element={<ProjectPage/>} />
        <Route path="/new-project-form" element={<NewProjectForm />} />
        <Route path="/interests" element={<InterestList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpForm />} /> 
        <Route path="/users" element={<UserPage />} />
      </Routes>
    </Router>
  );
}

export default App;

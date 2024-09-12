import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import HomePage from "./HomePage";
import ProjectPage from './ProjectPage'; 
import NewProjectForm from "./NewProjectForm";
import InterestList from "./InterestList";
import Login from "./Login";
import SignUpPage from "./SignUpPage"; 
// import UserProfile from "./UserProfile";
// import Search from "./Search";

function App() {
  // return <h1>Project Client</h1>;
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   // auto-login
  //   fetch("http://localhost:5555/check_session").then((r) => {
  //     if (r.ok) {
  //       r.json().then((user) => setUser(user));
  //     }
  //   });
  // }, []);

  // if (!user) return <Login onLogin={setUser} />;
  const [projects, setProjects] = useState([]);

  // Define the addProject function
  const addProject = (newProject) => {
    // Update the projects state with the new project
    setProjects((prevProjects) => [...prevProjects, newProject]);
  };
  
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/projects/:id" element={<ProjectPage/>} />
        <Route path="/new-project-form" element={<NewProjectForm addProject={addProject} />} />
        <Route path="/interests" element={<InterestList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} /> 
        {/* <Route path="/user-profile" element={<UserProfile />} /> */}
        {/* <Route path="/search" element={<Search />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

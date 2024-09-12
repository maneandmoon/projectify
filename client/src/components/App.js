import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./NavBar";
import HomePage from "./HomePage";
import ProjectPage from './ProjectPage'; 
import NewProjectForm from "./NewProjectForm";
import InterestList from "./InterestList";
import Login from "./Login";
import SignUpForm from "./SignUpForm"; 
// import UserProfile from "./UserProfile";
// import Search from "./Search";

function App() {
  // return <h1>Project Client</h1>;
  // const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);

  // // useEffect(() => {
  // //   // auto-login
  // //   fetch("http://localhost:5555/check_session")
  // //   .then((r) => {
  // //     if (r.ok) {
  // //       r.json().then((user) => setUser(user));
  // //     }
  // //   });
  // // }, []);

  // if (!user) return <Login onLogin={setUser} />;



    // Function to handle route protection
  //   const ProtectedRoute = ({ element }) => {
  //     return user ? element : <Navigate to="/login" />;
  //   };

  // if (!user) return <Login onLogin={setUser} />;

  // const [projects, setProjects] = useState([]);

  // Define the addProject function
  // const addProject = (newProject) => {
  //   // Update the projects state with the new project
  //   setProjects((prevProjects) => [...prevProjects, newProject]);
  // };
  // addProject={addProject}  --newprojectform
  return (
    <Router>
      <NavBar />
      <Routes>
        // <Route path="/" element={<HomePage />} />
        // <Route path="/projects" element={<ProjectPage />} />
        // <Route path="/projects/:id" element={<ProjectPage/>} />
        // <Route path="/new-project-form" element={<NewProjectForm />} />
        // <Route path="/interests" element={<InterestList />} />
        // <Route path="/login" element={<Login />} />
        // <Route path="/signup" element={<SignUpForm />} /> 
        // {/* <Route path="/user-profile" element={<UserProfile />} /> */}
        // {/* <Route path="/search" element={<Search />} />
        {/* <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProtectedRoute element={<ProjectPage />} />} />
        <Route path="/projects/:id" element={<ProtectedRoute element={<ProjectPage />} />} />
        <Route path="/new-project-form" element={<ProtectedRoute element={<NewProjectForm />} />} />
        <Route path="/interests" element={<ProtectedRoute element={<InterestList />} />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        {/* <Route path="/signup" element={<SignUpPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

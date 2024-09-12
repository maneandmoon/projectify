import React, { useEffect, useState } from "react";
// import { Switch, Route } from "react-router-dom";
// import { Outlet } from "react-router-dom";
import NavBar from "./NavBar.js";
import Login from "../Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import ProjectListWrapper from "./ProjectListWrapper";
import NewProjectForm from "./NewProjectForm";
import InterestList from "./InterestList";
import UserPage from "./UserPage"; // Import UserPage

function App() {
  // return <h1>Project Client</h1>;
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   // auto-login
  //   fetch("http://localhost:5555/check_session").then((r) => {
  //     if (r.ok) {
  //       r.json().then((user) => setUser(user));
  //     }
  //   });
  // }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div>
      <Router>
        <NavBar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectListWrapper />} />
          <Route path="/new-project-form" element={<NewProjectForm />} />
          <Route path="/interest-list" element={<InterestList />} />
          <Route path="/users" element={<UserPage />} />
        </Routes>
      </Router>
      {/* <Outlet /> */}
    </div>
  );
}

export default App;

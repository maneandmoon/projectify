import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import NavBar from "./NavBar";
import HomePage from "./HomePage";
import ProjectPage from './ProjectPage'; 
import NewProjectForm from "./NewProjectForm";
import InterestList from "./InterestList";
import Login from "./Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import ProjectListWrapper from "./ProjectListWrapper";
import NewProjectForm from "./NewProjectForm";
import InterestList from "./InterestList";
import SignUpPage from "./SignUpPage"; 
import UserProfile from "./UserProfile";
import Search from "./Search";

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
        </Routes>
      </Router>
      {/* <Outlet /> */}
    </div>
  );
}

export default App;

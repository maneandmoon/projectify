import React, { useEffect, useState } from "react";
// import { Switch, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar.js";
import Login from "../Login";

function App() {
  // return <h1>Project Client</h1>;
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div>
      <NavBar user={user} setUser={setUser} />
      <Outlet />
    </div>
  );
}

export default App;
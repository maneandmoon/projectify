import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar.js";

function App() {
  // return <h1>Project Client</h1>;
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;

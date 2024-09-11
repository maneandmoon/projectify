import React from "react";
import { NavLink } from "react-router-dom";
// import { Link } from "react-router-dom";
// import styled from "styled-components";
// import { Button } from "../styles";

function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <header className="header">
        <NavLink to={"/"} className="button">
          Home
        </NavLink>

        <NavLink to={"/Profile"} className="button">
          Profile
        </NavLink>

        <NavLink to={"/ProjectList"} className="button">
            Projects
        </NavLink>

        <NavLink to={"/Search"} className="button">
          Search
        </NavLink>

        <NavLink to={"/InterestsList"} className="button">
            InterestsList
        </NavLink>

        <NavLink to={"/Login"} className="button">
            Login
        </NavLink>

        <NavLink to={"/Login"} className="button" onClick={handleLogoutClick}>
            Logout
        </NavLink>

    </header>
  );
}
export default NavBar;
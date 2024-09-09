import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <header className="header">
      <a className="button">
        <NavLink to={"/"} className="button">
            Home
        </NavLink>
      </a>

      <a className="button">
        <NavLink to={"/Profile"} className="button">
            Profile
        </NavLink>
      </a>

      <a className="button">
        <NavLink to={"/Projects"} className="button">
            Projects
        </NavLink>
      </a>

      <a className="button">
        <NavLink to={"/Search"} className="button">
            Search
        </NavLink>
      </a>

      <a className="button">
        <NavLink to={"/Login"} className="button">
            Login
        </NavLink>
      </a>

      <a className="button">
        <NavLink to={"/InterestsList"} className="button">
            InterestsList
        </NavLink>
      </a>      

    </header>
  );
}
export default NavBar;
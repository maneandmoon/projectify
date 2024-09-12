import React from "react";
import { NavLink } from "react-router-dom";
import './NavBar.css';

function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }
  return (
    <header className="navbar">
      <nav>
        <ul className="nav-links">
          <li className="nav-item"><NavLink to="/" className="nav-link" activeClassName="active">Home</NavLink></li>

          {/* <li className="nav-item"><NavLink to="/profile" className="nav-link" 
          activeClassName="active">Profile</NavLink></li> */}
          
          <li className="nav-item"><NavLink to="/projects" className="nav-link" activeClassName="active">Projects</NavLink></li>
          
          <li className="nav-item"><NavLink to="/new-project-form" className="nav-link" activeClassName="active">New Project</NavLink></li>
          
          {/* <li className="nav-item"><NavLink to="/search" className="nav-link" activeClassName="active">Search</NavLink></li> */}
          
          <li className="nav-item"><NavLink to="/interests" className="nav-link" activeClassName="active">Interest List</NavLink></li>
          {!user ? (
          
          <>
          <li className="nav-item"><NavLink to="/login" className="nav-link" activeClassName="active">Login</NavLink></li>
          
          <li className="nav-item"><NavLink to="/signup" className="nav-link" activeClassName="active">Sign Up</NavLink></li>
          </>
          ) : (
          <li className="nav-item"><button className="nav-link logout-button" onClick={handleLogoutClick}>Logout</button></li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
         
         
             
         
                  

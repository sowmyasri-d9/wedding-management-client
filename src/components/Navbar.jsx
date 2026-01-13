import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css"; // Import the external CSS file

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Check if the user is logged in
  const isLoggedIn = !!localStorage.getItem("token");

  // Check if the user is an admin
  const isAdmin = localStorage.getItem("admin") === "true";

  // Handle restricted navigation
  const handleRestrictedNavigation = (path) => {
    if (!isLoggedIn) {
      alert("Please log in to access this page.");
      navigate("/login");
    } else if (path === "/admin" && !isAdmin) {
      alert("You do not have permission to access the admin page.");
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Wedding Management</div>

      {/* Toggler Button */}
      <button
        className="navbar-toggler"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Navigation Links */}
      <ul
        className={`nav-links ${isOpen ? "mobile-nav-links open" : ""}`}
        onClick={() => setIsOpen(false)}
      >
        
        <li className="nav-link-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-link-item">
          <button
            className="nav-link"
            style={{ background: "none", border: "none", cursor: "pointer" }}
            onClick={() => handleRestrictedNavigation("/dashboard")}
          >
            Dashboard
          </button>
        </li>
        <li className="nav-link-item">
          <button
            className="nav-link"
            style={{ background: "none", border: "none", cursor: "pointer" }}
            onClick={() => handleRestrictedNavigation("/culture")}
          >
            Culture
          </button>
        </li>
        {/* {isAdmin && (
          <li className="nav-link-item">
            <button
              className="nav-link"
              style={{ background: "none", border: "none", cursor: "pointer" }}
              onClick={() => handleRestrictedNavigation("/admin")}
            >
              Admin
            </button>
          </li>
        )} */}
      </ul>
    </nav>
  );
};

export default Navbar;

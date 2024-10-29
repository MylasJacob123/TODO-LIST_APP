import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../components/navigation.css";

function Navigation({ user, onLogout }) { 
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    onLogout();
    setShowDropdown(false); 
    alert("User successfully logged out")
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>

        {user ? (
          <li className="profile-dropdown" ref={dropdownRef}>
            <span
              onClick={() => setShowDropdown(!showDropdown)}
              className="profile-link"
            >
              Profile
            </span>
            {showDropdown && (
              <div className="dropdown-menu">
                <Link to="/profile" onClick={() => setShowDropdown(false)}>
                  {user.username}
                </Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </li>
        ) : (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;

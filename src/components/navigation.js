import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../components/navigation.css";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

function Navigation({ user, onLogout }) { 
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out of your account.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, log out',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        onLogout();  
        setShowDropdown(false);
        Swal.fire(
          'Logged out!',
          'You have been successfully logged out.',
          'success'
        );
        navigate("/");  
      }
    });
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
        {user ? (
          <>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li className="profile-dropdown" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="profile-link"
                aria-label="Profile"
                aria-expanded={showDropdown}
              >
                Profile
              </button>
              {showDropdown && (
                <div className="dropdown-menu" role="menu">
                  <Link
                    to="/profile"
                    onClick={() => setShowDropdown(false)}
                    role="menuitem"
                  >
                    View Profile
                  </Link>
                  <button onClick={handleLogout} role="menuitem">
                    Logout
                  </button>
                </div>
              )}
            </li>
          </>
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

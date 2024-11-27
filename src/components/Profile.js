import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser ? storedUser.userId : null;

  useEffect(() => {
    if (userId) {
      console.log("Fetching user from API with userId:", userId);
      
      axios
        .get(`http://localhost:8000/users/${userId}`)
        .then((response) => {
          console.log("API Response:", response.data);
          setUser(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setLoading(false); 
        });
    } else {
      console.error("No userId found in localStorage");
      setLoading(false); 
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user data found</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card-wrapper">
        <div className="profile-card">
          <h2 className="profile-username">Username: {user.name}</h2>
          <p className="profile-email">
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;

import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/navigation";
import Home from "./components/home";
import Register from "./components/register";
import Login from "./components/login";
import UserProfile from "./components/Profile";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); 
    setUser(null); 
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/home" element={<Home user={user} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/" element={<Login setUser={setUser} />} /> 
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

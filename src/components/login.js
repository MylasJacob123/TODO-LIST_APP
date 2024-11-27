import React, { useState } from "react";
import axios from "axios";
import "../components/login.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Alert from "@mui/material/Alert";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with values:", { email, password });

    if (validate()) {
      try {
        console.log("Sending login request...");
        const response = await axios.post("http://localhost:8000/users/login", {
          email,
          password,
        });

        console.log("API Response:", response.data);

        // Save user to localStorage
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log("User saved to localStorage:", localStorage.getItem("user"));

        // Update the global user state
        setUser(response.data);
        console.log("User state updated:", response.data);

        // Show success message
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome back!`,
        });

        // Navigate to the home page
        navigate("/home");
      } catch (error) {
        console.error("Login error:", error);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password. Please try again.",
        });
      }
    }
  };

  return (
    <div className="login-page">
      <h1 className="heading">Login</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label className="log-label" htmlFor="email">
            Email
          </label>
          <input
            className="log-input"
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <Alert severity="error" className="error-message">
              {errors.email}
            </Alert>
          )}
        </div>

        <div>
          <label className="log-label" htmlFor="password">
            Password
          </label>
          <input
            className="log-input"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <Alert severity="error" className="error-message">
              {errors.password}
            </Alert>
          )}
        </div>

        <button className="login-btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;

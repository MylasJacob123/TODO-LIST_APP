import React, { useState } from "react";
import "../components/register.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import Alert from "@mui/material/Alert";

function Register({ setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validate = () => {
    const newErrors = {};

    if (!name) {
      newErrors.name = "Username is required.";
    } else if (name.length < 5 || name.length > 14) {
      newErrors.name = "Username must be 5-14 characters long.";
    }

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        console.log("Form values before submitting:", { name, email, password });

        const response = await axios.post('http://localhost:8000/users', { name, email, password });
        console.log("Response from API:", response.data);

        localStorage.setItem('user', JSON.stringify(response.data));
        setUser(response.data); 

        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: `Welcome, ${response.data.username}! Your account has been created.`,
        });

        navigate('/home');  
      } catch (error) {
        console.log("Error during registration:", error);
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'There was an error processing your registration. Please try again.',
        });
      }
    }
  };

  return (
    <div className="registration-page">
      <h1>Register</h1>

      <form className="registration-form" onSubmit={handleSubmit}>
        <div>
          <label className="reg-label" htmlFor="name">Username</label>
          <br />
          <input
            className="reg-input"
            type="text"
            name="name"
            id="name"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <Alert severity="error" className="error">{errors.name}</Alert>}
        </div>

        <div>
          <label className="reg-label" htmlFor="email">Email</label>
          <br />
          <input
            className="reg-input"
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <Alert severity="error" className="error">{errors.email}</Alert>}
        </div>

        <div>
          <label className="reg-label" htmlFor="password">Password</label>
          <br />
          <input
            className="reg-input"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <Alert severity="error" className="error">{errors.password}</Alert>}
        </div>

        <button className="reg-btn" type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;

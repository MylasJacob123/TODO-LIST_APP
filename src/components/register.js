import React, { useState } from "react";
import "../components/register.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function Register({ setUser }) { 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); 

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validate = () => {
    const newErrors = {};

    if (!name) {
      newErrors.name = "Username is required";
    } else if (!/^[A-Za-z][A-Za-z0-9]{4,13}[!@#$%^&*]{2,}$/.test(name)) {
      newErrors.name =
        "Start with a letter, 6 to 15 characters, at least 2 symbols";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (!/(?=.*\d)(?=.*[!@#$%^&*])/.test(password)) {
      newErrors.password =
        "Password must include at least 1 number and 1 symbol";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitRegister = () => {
    if (validate()) {
        axios.post('http://localhost:8000/users', { name, email, password })
        .then((res) => {
            console.log(res.data);
            localStorage.setItem('user', JSON.stringify(res.data));
            setUser(res.data); 
            setSuccess("Registration successful!");
            setName("");
            setEmail("");
            setPassword("");
            setErrors({});
            navigate('/home');
        }).catch((error) => {
            console.error('There was an error!', error);
            setErrors({ submit: 'Failed to submit the form. Please try again.' });
        });
    }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    submitRegister();
  };

  return (
    <div className="registration-page">
      <h1>Register</h1>

      <form className="registration-form" onSubmit={handleSubmit}>
        <div>
          <label className="reg-label" htmlFor="name">
            Username
          </label>
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
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div>
          <label className="reg-label" htmlFor="email">
            Email
          </label>
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
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div>
          <label className="reg-label" htmlFor="password">
            Password
          </label>
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
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        {errors.submit && <p className="error">{errors.submit}</p>}
        {success && <p className="success">{success}</p>}

        <button className="reg-btn" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;

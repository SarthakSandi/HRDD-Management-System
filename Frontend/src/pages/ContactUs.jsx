import React, { useState } from "react";
import "./ContactUs.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        username,
        password
      });

      if (res.data.success) {
        navigate("/dashboard");
      } else {
        alert("Invalid Username or Password");
      }
    } catch (err) {
      alert("Server Error");
      console.log(err);
    }
  };

  return (
    <div className="contact-page">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">HRDD Management System</div>

        <ul className="nav-links">
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
        </ul>
      </nav>

      {/* Banner */}
      <div className="banner">
        <h2>Home</h2>
        <h1>Login into our System</h1>
      </div>

      {/* Login Section */}
      <div className="login-section">

        {/* System Info Box */}
        <div className="system-box">
          <h2>HRDD Management System</h2>
          <p>
            Centralized Human Resource Development Division platform
            for managing employees, records, and internal operations.
          </p>
        </div>

        {/* Login Box */}
        <div className="login-box">
          <h2>Login</h2>

          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="login-submit-btn"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>

      </div>

      {/* Office Section */}
      <div className="office-section">
        <h2>Our Office</h2>

        <div className="office-content">
          <div className="office-text">
            <h3>Semi-Conductor Laboratory</h3>
            <p>Ministry of Electronics & IT (MeitY)</p>
            <p>Sector 72, S.A.S Nagar - 160071</p>
            <p>Punjab, India</p>
            <p>📞 0172-2296000, 2296100, 2296200</p>
          </div>

          <div className="office-image">
            <img
              src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914"
              alt="office"
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default ContactUs;

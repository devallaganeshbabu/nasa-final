import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

// Use backend URL from .env or fallback to localhost
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const Login = ({ setUser }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending login request to:", `${API_URL}/auth/login`);
      const res = await axios.post(`${API_URL}/auth/login`, form);
      
      const name = res.data.user?.name || res.data.name || "User";
      localStorage.setItem("userName", name);
      setUser(name);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h1 className="nasa-heading">🚀 NASA App</h1>
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
        <p>New user? <Link to="/signup">Signup</Link></p>
      </form>
    </div>
  );
};

export default Login;

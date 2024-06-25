// Login.jsx

import React, { useState } from "react";
import axios from "axios";
import "./login.css"; // Import CSS file
import CancelIcon from '@mui/icons-material/Cancel';

function Login({ setShowLogin, myStorage, setCurrentUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = {
        username:username,
        password: password
      }
      const response = await axios.post("/users/login", loginUser);
      console.log("Login successful:", response.data);
      console.log(response.data[0].username);
      myStorage.setItem("user", response.data[0].username);
      setCurrentUser(response.data[0].username);
      setShowLogin(false)
      setSuccess(true);
      setError(false);
      // Logic for successful login (e.g., redirect user)
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <CancelIcon style={{ float: "right" }} onClick={() => setShowLogin(false)} />
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
        {success && (
          <span className="success">You are successfully Logged in..</span>
        )}
        {error && (
          <span className="error">Login failed...</span>
        )}
      </form>
    </div>
  );
}

export default Login;

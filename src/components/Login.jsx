import React, { useState } from "react";
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
        username: username,
        password: password
      };
      const res = await fetch("https://travel-map-ac8b.onrender.com/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginUser),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      console.log("Login successful:", data);
      myStorage.setItem("user", data.username);
      setCurrentUser(data.username);
      setShowLogin(false);
      setSuccess(true);
      setError(false);
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please try again.");
      setSuccess(false);
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
          <span className="success">You are successfully logged in.</span>
        )}
        {error && (
          <span className="error">Login failed. {error}</span>
        )}
      </form>
    </div>
  );
}

export default Login;

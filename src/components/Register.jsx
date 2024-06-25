import React, { useState } from "react";
import "./register.css"; // Import CSS file
import CancelIcon from '@mui/icons-material/Cancel';

function Register({ setShowRegister }) {
  const [success, setSuccess] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        username: username,
        email: email,
        password: password
      };
      const res = await fetch("https://travel-map-ac8b.onrender.com/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      console.log("Registration successful:", data);
      setSuccess(true);
      setError(false);
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Registration failed. Please try again.");
      setSuccess(false);
    }
  };

  return (
    <div className="register-container">
      <CancelIcon style={{ float: "right" }} onClick={() => setShowRegister(false)} />
      <h2>Sign Up</h2>
      <form className="register-form" onSubmit={handleSubmit}>
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
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <button type="submit">Sign Up</button>
        </div>
        {success && (
          <span className="success">Registration successful.</span>
        )}
        {error && (
          <span className="failure">Registration failed. {error}</span>
        )}
      </form>
    </div>
  );
}

export default Register;

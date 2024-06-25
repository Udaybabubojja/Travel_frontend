
import React, { useState } from "react";
import axios from "axios";
import "./register.css"; // Import CSS file
import CancelIcon from '@mui/icons-material/Cancel';
function Register({setShowRegister}) {
  const [success, setSuccess] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        username:username,
        email:email,
        password:password
      }
      const response = await axios.post("/users/register", newUser);
      console.log("Registration successful:", response.data);
      setError(false)
      setSuccess(true)
      
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <CancelIcon style={{ float: "right" }} onClick={()=> setShowRegister(false)} />
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
          <label>email:</label>
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
        {
          success && (
            <span className="success">Successful... You can Login Now!...</span>
          )
        }
        {
          error && (
            <span className="failure">Not Successful...</span>
          )
        }
      </form>
    </div>
  );
}

export default Register;
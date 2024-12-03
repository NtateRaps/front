import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = async () => {
    // Basic validation
    if (!email || !password || !role) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();

      // Handle successful login
      console.log(data);
      alert('Login successful!');
      
      // Redirect to Institutes page
      navigate('/institutes');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Error logging in. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login Page</h2>
      <div className="input-group">
        <label>Email ID</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="input-group">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
      </div>
      <div className="input-group">
        <label>Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="">Select your role</option>
          <option value="Admin">Admin</option>
          <option value="Student">Student</option>
          <option value="Institution">Institution</option>
        </select>
      </div>
      <button className="auth-button" onClick={handleLogin}>Login</button>

      <div className="signup-prompt">
        <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
      </div>
    </div>
  );
}

export default Login;

import React, { useState } from 'react';
import './App.css';

function SignUp() {
  const [userType, setUserType] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileInfo, setProfileInfo] = useState('');

  const handleChange = (event) => {
    setUserType(event.target.value);
  };

  const handleSignUp = async () => {
    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      // Send POST request to the backend API using fetch
      const response = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          role: userType,
          profileInfo,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to sign up');
      }

      const data = await response.json();

      // Handle successful signup
      alert(data.message);

      // Optionally redirect or clear form inputs after successful signup
      // e.g., window.location.href = '/login'; or reset form states
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Error signing up. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-heading">Create an Account</h2>

      {/* Email Input */}
      <div className="input-group">
        <label>Email ID</label>
        <input
          type="email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
      </div>

      {/* Password Input */}
      <div className="input-group">
        <label>Password</label>
        <input
          type="password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
      </div>

      {/* Confirm Password Input */}
      <div className="input-group">
        <label>Confirm Password</label>
        <input
          type="password"
          className="input-field"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          required
        />
      </div>

      {/* Profile Info Input */}
      <div className="input-group">
        <label>Profile Info</label>
        <textarea
          className="input-field"
          value={profileInfo}
          onChange={(e) => setProfileInfo(e.target.value)}
          placeholder="Enter profile information"
        />
      </div>

      {/* User Type Selection */}
      <div className="input-group user-type">
        <label>User Type</label>
        <div className="radio-buttons">
          <label>
            <input
              type="radio"
              value="Admin"
              checked={userType === 'Admin'}
              onChange={handleChange}
              required
            />
            Admin
          </label>
          <label>
            <input
              type="radio"
              value="Student"
              checked={userType === 'Student'}
              onChange={handleChange}
              required
            />
            Student
          </label>
          <label>
            <input
              type="radio"
              value="Institution"
              checked={userType === 'Institution'}
              onChange={handleChange}
              required
            />
            Institution
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <button className="auth-button" onClick={handleSignUp}>Sign Up</button>

      {/* Go back to Log In Link */}
      <div className="signup-prompt">
        <p>Go back to <a href="/login">Log In</a></p>
      </div>
    </div>
  );
}

export default SignUp;

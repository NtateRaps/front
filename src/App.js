import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './components/App.css';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Users from './components/Users';
import Institutes from './components/Institutes';
import Faculties from './components/Faculties';
import Courses from './components/Courses';
import Applications from './components/Applications';
import backgroundLogo from './background2.png';

function NavigationMenu() {
  return (
    <nav className="navigation-menu">
      {/* Show only specified navigation links */}
      <Link to="/">Home</Link>
      <Link to="/institutes">Institutes</Link>
      <Link to="/courses">Courses</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <img src={backgroundLogo} alt="background Career Guidance App Logo" id="logo" />
          
          {/* Show NavigationMenu only if not on Sign Up page */}
          <Routes>
            <Route
              path="*"
              element={
                window.location.pathname !== '/signup' && <NavigationMenu />
              }
            />
          </Routes>

          {/* Show Login/SignUp button only on the Home page */}
          {window.location.pathname === '/' && (
            <div className="button-container">
              <Link to="/login">
                <button className="login-button">Login / Sign Up</button>
              </Link>
            </div>
          )}
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/users" element={<Users />} />
          <Route path="/institutes" element={<Institutes />} />
          <Route path="/faculties" element={<Faculties />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/" element={<Courses />} />
        <Route path="/applications" element={<Applications />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

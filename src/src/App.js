import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import './components/App.css';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Users from './components/Users';
import Institutes from './components/Institutes';
import Faculties from './components/Faculties';
import Courses from './components/Courses';
import Applications from './components/Applications';
import BokamosoLogo from './Bokamoso.png';

function NavigationMenu() {
  const location = useLocation(); // Get the current path

  return (
    <nav className="navigation-menu">
      {location.pathname === '/' ? (
        <></> // No links in the navigation menu for Home page
      ) : (
        <>
          {/* Show all links except Login and Sign Up */}
          {location.pathname !== '/' && <Link to="/">Home</Link>} 
          {location.pathname !== '/users' && <Link to="/users">Users</Link>}
          {location.pathname !== '/institutes' && <Link to="/institutes">Institutes</Link>}
          {location.pathname !== '/faculties' && <Link to="/faculties">Faculties</Link>}
          {location.pathname !== '/courses' && <Link to="/courses">Courses</Link>}
          {location.pathname !== '/applications' && <Link to="/applications">Applications</Link>}
        </>
      )}
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <img src={BokamosoLogo} alt="Bokamoso Career Guidance App Logo" id="logo" />
          
          {/* Show Login and SignUp buttons only on Home Page */}
          {window.location.pathname === '/' && (
            <div className="button-container">
              <Link to="/login">
                <button className="login-button">Login</button>
              </Link>
              <Link to="/signup">
                <button className="signup-button">SignUp</button>
              </Link>
            </div>
          )}

          <NavigationMenu /> {/* Separate NavigationMenu component */}
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/users" element={<Users />} />
          <Route path="/institutes" element={<Institutes />} />
          <Route path="/faculties" element={<Faculties />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/applications" element={<Applications />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <header className="navbar">
            <div className="navbar-container">
                <NavLink to="/" className="navbar-logo">
                    <img src="/logo.png" alt="Career Guidance Logo" />
                </NavLink>
                <nav className="navbar-menu">
                    <NavLink to="/" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>
                        Home
                    </NavLink>
                    <NavLink to="/institutes" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>
                        Institutes
                    </NavLink>
                    <NavLink to="/applications" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>
                        Applications
                    </NavLink>
                    <NavLink to="/admin-dashboard" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>
                        Admin Dashboard
                    </NavLink>
                    <NavLink to="/institute-dashboard" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>
                        Institute Dashboard
                    </NavLink>
                    <NavLink to="/student-dashboard" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>
                        Student Dashboard
                    </NavLink>
                </nav>
                <div className="navbar-buttons">
                    <NavLink to="/signup" className="navbar-btn navbar-signup">
                        Sign Up
                    </NavLink>
                </div>
            </div>
        </header>
    );
}

export default Navbar;

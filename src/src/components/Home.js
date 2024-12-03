import React from 'react';
import './App.css'; // Separate CSS file specifically for Home page styles

function Home() {
    return (
        <div className="home-container">
            {/* Main Content Section */}
            <div className="hero-section">
                <h1>Empower Your Career Journey</h1>
                <p>
                    Discover your true potential with personalized career guidance. Explore opportunities,
                    plan your future, and take confident steps toward success.
                </p>
                <div className="cta-buttons">
                    <button className="explore-now">Explore Now</button>
                    <button className="learn-more">Learn More</button>
                </div>
            </div>
        </div>
    );
}

export default Home;

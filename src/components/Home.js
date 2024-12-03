import React from 'react';
import './App.css'; 

function Home() {
    return (
        <div className="home-container">
            {/* Main Content Section */}
            <div className="hero-section">
                <h1>Empower Your Career Journey</h1>
                <p>
                Unlock your full potential with tailored career guidance. Discover opportunities, chart your path, and step confidently into your future.\
                </p>
                <div className="cta-buttons">
                   
                    <button className="learn-more">Learn More</button>
                </div>
            </div>
        </div>
    );
}

export default Home;

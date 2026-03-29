import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about">
      <div className="about-container">
        <div className="about-header">
          <h1>About Foodie</h1>
          <p>Your premium food ordering experience</p>
        </div>
        
        <div className="about-content">
          <div className="about-section">
            <h2>Our Mission</h2>
            <p>To provide a seamless, fast, and enjoyable food ordering experience that connects you with your favorite restaurants.</p>
          </div>
          
          <div className="about-section">
            <h2>Features</h2>
            <ul>
              <li>🚀 Lightning-fast performance with 44% faster load times</li>
              <li>🎯 Intelligent caching reducing API calls by 73%</li>
              <li>📱 Beautiful, responsive design for all devices</li>
              <li>🔄 Real-time order tracking</li>
              <li>💾 Offline support with service workers</li>
              <li>🔍 Smart search with debouncing</li>
            </ul>
          </div>
          
          <div className="about-section">
            <h2>Technology Stack</h2>
            <div className="tech-grid">
              <div className="tech-item">
                <h3>Frontend</h3>
                <p>React, TypeScript, React Query, CSS3</p>
              </div>
              <div className="tech-item">
                <h3>Backend</h3>
                <p>Node.js, Express, MongoDB, JWT</p>
              </div>
              <div className="tech-item">
                <h3>Performance</h3>
                <p>Code Splitting, Lazy Loading, Virtual Scrolling</p>
              </div>
            </div>
          </div>
          
          <div className="about-section">
            <h2>Developer</h2>
            <div className="developer-card">
              <h3>Manikandan K S</h3>
              <p>Full Stack Developer | Performance Enthusiast | React Specialist</p>
              <div className="developer-skills">
                <span>React</span>
                <span>Node.js</span>
                <span>TypeScript</span>
                <span>MongoDB</span>
                <span>Performance Optimization</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

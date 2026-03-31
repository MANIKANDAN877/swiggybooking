import React, { useState } from 'react';
import './About.css';

const About: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    }, 1000);
  };

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

          <div className="about-section">
            <h2>Contact Us</h2>
            <div className="contact-form-container">
              <p>Have questions or feedback? We'd love to hear from you!</p>
              
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What's this about?"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us what's on your mind..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={formStatus === 'submitting'}
                >
                  {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
                
                {formStatus === 'success' && (
                  <div className="form-success">
                    ✅ Message sent successfully! We'll get back to you soon.
                  </div>
                )}
                
                {formStatus === 'error' && (
                  <div className="form-error">
                    ❌ Oops! Something went wrong. Please try again.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

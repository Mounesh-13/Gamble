import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css'; // Import the CSS file

function Header({ onLogout }) { // Receive onLogout prop
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here (e.g., clear session, tokens)
    console.log('Logout clicked');
    onLogout(); // Call the onLogout function passed from App.js
    navigate('/login'); // Redirect to login page
  };

  return (
    <header className="header">
      <div className="header-logo">Gamble</div>
      <nav className="header-nav">
        <ul className="header-list">
          <li className="header-item">
            <Link to="/" className="header-link">Home</Link>
          </li>
          <li className="header-item">
            <Link to="/profile" className="header-link">Profile</Link>
          </li>
          <li className="header-item">
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
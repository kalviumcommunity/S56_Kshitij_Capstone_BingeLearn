import React from 'react';
import './Navbar.css'; 

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo-container">
        <img src='./src/Images/logo.png' alt="Logo" className="logo" />
      </div>
      <div className="image-container">
        <img src="image-url.jpg" alt="Image" className="image" />
      </div>
    </div>
  );
};

export default Navbar;

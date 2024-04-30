import React from 'react';
import './Navbar2.css';
import logo3 from '../Images/logo3.png'; 

const Navbar2 = () => {
  const menuItems = ['Navigation', 'New Course', 'Videos', 'Assignment', 'MCQ'];

  return (
    <div>
      <div className='navbarN'>
        <div className='logoN'>
          <img id="LogoN" src={logo3} alt="Logo" />
        </div>
        <div className='fields2'>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar2;

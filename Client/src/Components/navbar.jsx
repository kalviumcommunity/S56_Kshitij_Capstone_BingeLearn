import React from 'react';
import './Navbar.css';
import logo3 from '../Images/logo3.png'; 
import user from '../Images/user.png'

const Navbar = () => {
  return (
    <div>
      <div className='navbarN'>
        <div className='logoN'>
          <img id="LogoN" src={logo3} alt="Logo" /> 
        </div>
        <div className='userImgN'>
        <img id="UserN" src={user} alt="User" /> 
        </div>
      </div>
    </div>
  );
};

export default Navbar;

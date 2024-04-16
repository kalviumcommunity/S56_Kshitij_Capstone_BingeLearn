import React from 'react';
import './Navbar2.css';
import logo3 from '../Images/logo3.png'; 
import user from '../Images/user.png'

const Navbar2 = () => {
  return (
    <div>
      <div className='navbarN'>
        <div className='logoN'>
          <img id="LogoN" src={logo3} alt="Logo" /> 
        </div>
        <div className='fields2'>
            <ul>
                <li>Navigation</li>
                <li>New Course</li>
                <li>Videos</li>
                <li>Assignment</li>
                <li>MCQ</li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar2;

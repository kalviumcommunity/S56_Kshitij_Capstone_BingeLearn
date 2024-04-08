import React from 'react';
import Navbar from '../Components/Navbar';
import school from '../Images/school.png'
import './Select.css';

const Select = () => {
  return (
    <div>
      <Navbar />
      
      <div className='quoteS'>
        <h1 className="glow-text">"Binge Learn Your Way to Success"</h1>
      </div>
      <div className='SchoolS'>
      <img id="schoolS" src={school} alt="school" /> 
      </div>
      <div className='buttonS'>
        <button className="button1S glow-on-hover" type="button">I am a Teacher</button>
        <button className="button2S glow-on-hover" type="button">I am a Student</button>
      </div>
    </div>
  );
};

export default Select;

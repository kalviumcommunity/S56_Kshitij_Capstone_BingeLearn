import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Navbar from "../Components/Navbar";
import laptop from "../Images/laptop.png";
import "./Select.css";

const Select = () => {
  const handleUserTypeSelection = (userType) => {
    // Store the user type in session storage
    sessionStorage.setItem("userType", userType);
  };

  return (
    <>
      <Navbar />
      <div className="bodySS">
        <div className="quoteS">
          <h1 className="glow-text">"Binge Learn Your Way to Success"</h1>
        </div>
        <div className="detailSS">
          <div className="buttonS">
            {/* Link for Teacher */}
            <Link
              className="button1S glow-on-hover"
              to="/login"
              onClick={() => handleUserTypeSelection("teacher")}
            >
              I am a Teacher
            </Link>
            {/* Link for Student */}
            <Link
              className="button2S glow-on-hover"
              to="/login"
              onClick={() => handleUserTypeSelection("student")}
            >
              I am a Student
            </Link>
          </div>
          <div className="SchoolS">
            <img src={laptop} alt="school" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Select;

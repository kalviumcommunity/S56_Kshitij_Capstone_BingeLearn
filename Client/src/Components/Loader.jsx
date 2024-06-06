import React from 'react';
import './Loader.css'; // Add your loader CSS styles here

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>Your details are getting fetched...</p>
    </div>
  );
};

export default Loader;

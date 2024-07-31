import React, { useEffect, useState } from "react";
import Navbar2 from "../Components/Navbar2";
import './LandingStu.css'; // Import your CSS file

const LandingStu = () => {
  const [studentName, setStudentName] = useState("Guest");

  useEffect(() => {
    const fetchStudentName = async () => {
      const email = sessionStorage.getItem("studentEmail");
      if (!email) return;

      try {
        const response = await fetch(`http://localhost:3200/getUserName?email=${email}`);
        if (response.ok) {
          const data = await response.json();
          setStudentName(data.name || "Guest");
          sessionStorage.setItem("studentName", data.name);
        } else {
          console.error("Failed to fetch student name.");
        }
      } catch (error) {
        console.error("Error fetching student name:", error);
      }
    };

    fetchStudentName();
  }, []);

  return (
    <div>
      <Navbar2 />
      <div className="backgroundBoxL">
        <div className="InnerContainerL">
        <div className="greeting-container">
          <h1>Hello, <span className="student-name">{studentName}</span>!</h1>
        </div>
        </div>
      </div>
    </div>
  );
};

export default LandingStu;

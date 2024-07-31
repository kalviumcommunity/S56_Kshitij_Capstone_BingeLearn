import React, { useEffect, useState } from "react";
import Navbar2 from "../Components/Navbar2";
import "./LandingStu.css"; // Import your CSS file

const LandingStu = () => {
  const [studentName, setStudentName] = useState("Guest");
  const [courses, setCourses] = useState([]);
  const [searchByTeacher, setSearchByTeacher] = useState("");
  const [searchByCourseName, setSearchByCourseName] = useState("");

  useEffect(() => {
    const fetchStudentName = async () => {
      const email = sessionStorage.getItem("studentEmail");
      if (!email) return;

      try {
        const response = await fetch(
          `http://localhost:3200/getUserName?email=${email}`
        );
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

    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:3200/getAllCourses');
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        } else {
          console.error("Failed to fetch courses.");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course => 
    course.teacherName.toLowerCase().includes(searchByTeacher.toLowerCase()) &&
    course.courseName.toLowerCase().includes(searchByCourseName.toLowerCase())
  );

  return (
    <div>
      <Navbar2 />
      <div className="backgroundBoxL">
        <div className="InnerContainerL">
          <div className="greeting-container">
            <h1>
              Hello, <span className="student-name">{studentName}</span>!
            </h1>
          </div>
        </div>
        <div className="MainBottomContainerL">
          <div className="TitleContainerL"><h2>Let's start learning</h2></div>
          <div className="SearchBarsL">
            <input
              type="text"
              placeholder="Search by Teacher"
              value={searchByTeacher}
              onChange={(e) => setSearchByTeacher(e.target.value)}
              className="search-input"
            />
            <input
              type="text"
              placeholder="Search by Course Name"
              value={searchByCourseName}
              onChange={(e) => setSearchByCourseName(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="BottomContainerL">
            {filteredCourses.map((course, index) => (
              <div key={index} className="CoursesL">
                <div className="CourseImageL">
                  <img
                    src="https://c4.wallpaperflare.com/wallpaper/900/92/1002/3-316-16-9-aspect-ratio-s-sfw-wallpaper-preview.jpg"
                    alt="courses"
                  />
                </div>
                <div className="CourseNameL">
                  <h2>{course.courseName}</h2>
                </div>
                <div className="CourseByL">
                  <h5>~ {course.teacherName}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingStu;

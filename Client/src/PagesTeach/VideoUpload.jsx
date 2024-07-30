import React, { useState } from "react";
import Navbar2 from "../Components/Navbar2";
import "../PagesTeach/VideoUpload.css";
import axios from 'axios';

const VideoUpload = () => {
  const [videoName, setVideoName] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [videoDuration, setVideoDuration] = useState('');

  const handleUpload = async (event) => {
    event.preventDefault();
    const email = sessionStorage.getItem('teacherEmail');
    const courseName = sessionStorage.getItem('courseName'); 

    if (!email || !courseName) {
      console.error('Email or Course Name not found');
      return;
    }

    try {
      const response = await axios.post('https://s56-kshitij-capstone-bingelearn.onrender.com/savevideo', {
        email,
        courseName,
        video: {
          name: videoName,
          link: videoLink,
          duration: videoDuration,
        }
      });

      console.log(response.data.message);
    } catch (error) {
      console.error('Error saving video details', error);
    }
  };

  return (
    <div>
      <Navbar2 />
      <div className="backgroundBoxV">
        <form className="form" onSubmit={handleUpload}>
          <div className="title">Enter the details for the Video</div>
          <input
            type="text"
            placeholder="Enter the name for the video"
            className="input"
            value={videoName}
            onChange={(e) => setVideoName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter the link for the video"
            className="input"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter the duration for this module"
            className="input"
            value={videoDuration}
            onChange={(e) => setVideoDuration(e.target.value)}
          />
          <button type="submit" className="button-confirm">Upload →</button>
        </form>
      </div>
    </div>
  );
};

export default VideoUpload;

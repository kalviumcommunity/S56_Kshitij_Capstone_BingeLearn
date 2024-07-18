import React, { useState } from "react";
import Navbar2 from "../Components/Navbar2";
import "../PagesTeach/VideoUpload.css";

const VideoUpload = () => {
  return (
    <div>
        <Navbar2 />
        <div className="backgroundBoxV">
        <form className="form">
      <div className="title">Enter the details for the Video</div>
      <input type="text" placeholder="Enter the name for the video" className="input" />
      <input type="text" placeholder="Enter the link for the video" className="input" />
      <input type="text" placeholder="Enter the duration for this module" className="input" />
      <div className="login-with">
      </div>
      <button className="button-confirm">Upload →</button>
    </form>
        </div>
    </div>
  )
}

export default VideoUpload

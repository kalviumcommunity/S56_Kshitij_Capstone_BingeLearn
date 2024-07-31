import {useState} from 'react'
import './App.css'
import Navbar from './Components/Navbar.jsx';
import Navbar2 from './Components/Navbar2.jsx'
import Select from './PagesCommon/Select';
import Login from './PagesCommon/Login';
import Navigation from './PagesTeach/Navigation';
import PublishCourse from './PagesTeach/PublishCourse';
import VideoUpload from './PagesTeach/VideoUpload';
import LandingStu from './PagesStu/LandingStu';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Select/>}/>
        <Route path='/nav' element={<Navbar/>}/>
        <Route path='/nav2' element={<Navbar2/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/navigation' element={<Navigation/>}/>
        <Route path='/publish' element={<PublishCourse/>}/>
        <Route path='/vidupload' element={<VideoUpload/>}/>
        <Route path='/landing' element={<LandingStu/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App


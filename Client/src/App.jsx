import {useState} from 'react'
import './App.css'
import Navbar from './Components/Navbar.jsx';
import Select from './PagesCommon/Select';
import Login from './PagesCommon/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<Navbar/>}/> */}
        {/* <Route path='/select' element={<Select/>}/> */}
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App


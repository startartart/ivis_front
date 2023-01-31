import React from 'react';
import './Main.css';
import { FaBeer } from 'react-icons/fa';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import MainForm from './pages/MainForm';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Guest from './pages/Guest';


function Main() {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/mainform" element={<MainForm />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/guest" element={<Guest />} />
            </Routes>
        </BrowserRouter>
    </>
  );
}

export default Main;
import React from 'react';
import './Main.css';
import { FaBeer } from 'react-icons/fa';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainForm from './MainForm';
import SignUp from './SignUp';
import Login from './Login';
import Guest from './Guest';
import Header from './Header';

function Main() {
  return (
    <div>
        <Header />
        {/* <div className="Nav">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/signup">Sign Up</a></li>
                <li><a href="/login">Login</a></li>
                <li><a href="/guest">Guest</a></li>
            </ul>
        </div> */}
        {/* <div className="Main">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainForm />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/guest" element={<Guest />} />
                </Routes>
            </BrowserRouter>
        </div> */}
    </div>
  );
}

export default Main;
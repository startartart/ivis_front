import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Main from './pages/Main';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Guest from './pages/Guest';
import { RegisterProvider } from './contexts/RegisterContext';

function App() {
  return (
    <RegisterProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/main/*" element={<Main />} />
                {/* <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/guest" element={<Guest />} /> */}
            </Routes>
        </BrowserRouter>
    </RegisterProvider>
  );
}

export default App;
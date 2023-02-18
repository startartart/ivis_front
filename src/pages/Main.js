import React from 'react';
import {Routes, Route} from 'react-router-dom';
import './Main.scss';
import MainForm from "../Main-components/MainForm";
import About from "../Main-components/About";
import Member from "../Main-components/Member";
import Developer from "../Main-components/Developer";
import Menu from "../Main-components/Menu";
import Footer from '../Main-components/Footer';

const Main = () => {
  return (
    <div className='main-background'>
      <Menu />
      <div className='pages'>
      <Routes>
          <Route path="/" element={<MainForm />} />
          <Route path="about" element={<About />} />
          <Route path="member" element={<Member />} />
          <Route path="developer" element={<Developer />} />
      </Routes>
      <Footer />
      </div>
    </div>
  );
}

export default Main;
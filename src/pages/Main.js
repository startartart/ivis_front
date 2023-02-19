import React from 'react';
import {Routes, Route} from 'react-router-dom';
import './Main.scss';
import MainForm from "../Main-components/MainForm";
import About from "../Main-components/About";
import Member from "../Main-components/Member";
import Notice from "../Main-components/Notice";
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
          <Route path="notice" element={<Notice />} />
      </Routes>
      <Footer />
      </div>
    </div>
  );
}

export default Main;
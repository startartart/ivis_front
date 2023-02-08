import React from 'react';
import styled from 'styled-components';
import Header from '../MainForm-components/Header';
import MainSlider from '../MainForm-components/MainSlider';
import About from '../MainForm-components/About';
import Services from '../MainForm-components/Services';
import Footer from '../MainForm-components/Footer';

const MainFragment = styled.div`
//child elements are parents of the Frame
    /* position: relative;
    background-color: #fff;
    border: 1px solid #000; */

    width: 100%;
    height: 100%;
    //appear animation for the Frame
    animation: appear 1s ease-in-out;
    @keyframes appear {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`;

const MainForm = () => {
    return (
        <MainFragment>
            <Header />
            <MainSlider />
            <About />
            <Services />
            <Footer />
        </MainFragment>
    );
    }
export default MainForm;
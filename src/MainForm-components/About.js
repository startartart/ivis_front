import React from 'react';
import styled from 'styled-components';

const AboutFragment = styled.div`
    //child elements are parents of the Frame
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #fff;
    border: 1px solid #000;
    text-align: center;
`;


const About = () => {
    return (
        <AboutFragment>
            <h1>About</h1>
            <h1>About</h1>
            <h1>About</h1>
            <h1>About</h1>
            <h1>About</h1>
            <h1>About</h1>
        </AboutFragment>
    );
}

export default About;
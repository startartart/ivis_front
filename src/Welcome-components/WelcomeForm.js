import React from 'react';
import styled from 'styled-components';

const Circle = styled.div`
    position: absolute;
    background-color: #fff;
    text-align: center;
    border-radius: 50%;
    background: lightblue;
    top: 35%;
    left: 50%;
    width: 300px;
    height: 300px;
    transform: translate(-50%, -50%);
    @media screen and (min-width: 600px) {
        width: 500px;
        height: 500px;
    }

`;

const WelcomeForm = () => {
    return (
        <>
            <Circle />
        </>
    );
}

export default WelcomeForm;
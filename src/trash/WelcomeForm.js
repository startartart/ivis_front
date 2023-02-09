import React, { useState } from 'react';
import styled from 'styled-components';

const WelcomeFragment = styled.div`
    text-align: center;
    position: absolute;
    top: 2.5%;
    left: 20%;
    display: inline-flex;
 `;

const HeaderLogo = styled.img`
    margin: 1rem 0 1rem 0.2rem;

    animation: pulse 1.5s infinite;
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }
`;

const WelcomeText = styled.p`
    font-size: 40px;
    font-weight: bold;
    background: -webkit-linear-gradient(#35D6ED, #C9F6FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 2rem 0 0 0;
    
    //hover animation
    animation: pulse 1.5s infinite;
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }

    ${props => props.status && `
        background: linear-gradient(#434343, #000);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    `}

`;

const CheckText = styled.p`
    font-size: 20px;
    font-weight: bold;
    background: -webkit-linear-gradient(#35D6ED, #C9F6FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    
    &:hover {
        //color
        background: linear-gradient(to right, #434343 0%, black 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    //disappear is true then scatter
    ${props => props.disappear && `
        animation: scatter 0.5s ease-in-out forwards;
        @keyframes scatter {
            from {
                opacity: 1;
                scale: 1;
            }
            to {
                opacity: 0;
                scale: 0;
            }
        }
    `}
   
`;

const CheckTextBox = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 350px;
    height: 250px;

`;

const WelcomeForm = ({showApp, login, guest, take}) => {

    const takeHandler = (e) => {
        take(e.target.id);
    }

    return (
        <>
            <WelcomeFragment>
                <WelcomeText status={showApp}>IVIS</WelcomeText>
                <HeaderLogo src="./images/ivis-logo36.png" alt="logo" />
            </WelcomeFragment>
            <CheckTextBox>
            <CheckText disappear={showApp} id={1} onClick={takeHandler}>2023 신입부원 모집</CheckText>
            <CheckText disappear={showApp} id={2} onClick={takeHandler}>Main page</CheckText>
            <CheckText disappear={showApp} id={3} onClick={takeHandler}>About</CheckText>
            </CheckTextBox>
        </>
    );
}

export default WelcomeForm;
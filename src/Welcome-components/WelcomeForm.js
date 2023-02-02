import React, { useState } from 'react';
import styled from 'styled-components';

const WelcomeText = styled.p`
    font-size: 40px;
    font-weight: bold;
    background: -webkit-linear-gradient(#35D6ED, #C9F6FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: center;
    position: absolute;
    top: 2.5%;
    left: 20%;
    &:hover {
        background: -webkit-linear-gradient(#C9F6FF, #35D6ED);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    //hover animation
    animation: pulse 2s infinite;
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

const CheckText = styled.p`
    font-size: 20px;
    font-weight: bold;
    background: -webkit-linear-gradient(#35D6ED, #C9F6FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    
    /* &:hover {
        animation: slide_left_right 1s infinite;
        @keyframes slide_left_right {
            0% {
                transform: translateX(0);
            }
            50% {
                transform: translateX(50px);
            }
            100% {
                transform: translateX(0);
            }
        }
    } */

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

    const [disappear, setDisappear] = useState(showApp);

    const takeHandler = (e) => {
        if (e.target.id === 1)
            setDisappear(!disappear);
        take(e.target.id);
    }

    return (
        <>
            <WelcomeText>IVIS</WelcomeText>
            <CheckTextBox>
            <CheckText disappear={showApp} id={1} onClick={takeHandler}>2023 신입부원 모집</CheckText>
            <CheckText disappear={showApp} id={2} onClick={takeHandler}>Main page</CheckText>
            <CheckText disappear={showApp} id={3} onClick={takeHandler}>About</CheckText>
            </CheckTextBox>
        </>
    );
}

export default WelcomeForm;
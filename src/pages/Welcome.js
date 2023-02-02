import React, { useState } from 'react';
import WelcomeForm from '../Welcome-components/WelcomeForm';
import SignUpForm from '../Welcome-components/SignUpForm';
import ParticleBackground from 'react-particle-backgrounds'
import MainForm from './MainForm';
import styled from 'styled-components';

const SlidingDiv = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #fff;
    margin: 0;

    ${props => props.status && `
        animation: slideDown 1s ease-in-out;
    `}

    @keyframes slideDown {
        0% {
            transform: translateY(0%);
        }
        100% {
            transform: translateY(-100%);
        }
    }
`;


const Welcome = () => {
    const [showApp, setShowApp] = useState(false);
    const [login, setLogin] = useState(false);
    const [guest, setGuest] = useState(false);

    const take = async (e) => {
        if (e === "1") {
            //toggle showApp
            setShowApp(!showApp);
        } else if (e === "2") {
            //go to MainForm page
            setGuest(true);
            //5ms after Guest true
            setTimeout(() => {
                setLogin(true);
            }, 1000);
        } else if (e === "3") {
            setGuest(true);
        }
    }

    const settings = {
        canvas: {
            height: 800,
          },
        particle: {
            canvasFillSpace: true,
            height: 340,
            particleCount: 10,
            color: "#35D6ED",
            minSize: 1,
            maxSize: 7,
        },
        velocity: {
            directionAngle: 0,
            directionAngleVariance: 40,
            minSpeed: 0.5,
            maxSpeed: 1
        },
        opacity: {
            minOpacity: 0,
            maxOpacity: 0.5,
            opacityTransitionTime: 4000
        }
      }
      
    return (
        <>
            {!login &&
                <SlidingDiv status={guest}>
                    <ParticleBackground settings={settings}/>
                    <WelcomeForm showApp={showApp} login={login} guest={guest} take={take}/>
                    {showApp && <SignUpForm showApp={showApp} take={take} />}
                </SlidingDiv>
            }
            
            {login && <MainForm />}
        </>

    );
}

export default Welcome;
import React, { useState } from 'react';
import WelcomeForm from './WelcomeForm';
import SignUpForm from '../share-components/SignUpForm';
import ParticleBackground from 'react-particle-backgrounds'
import MainForm from '../pages/MainForm';
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


const Welcome = () => {
    const [showApp, setShowApp] = useState(false);
    const [login, setLogin] = useState(false);
    const [gomain, setGoMain] = useState(false);

    const take = async (e) => {
        if (e === "1") {
            //toggle showApp
            settings.particle.color = "#000";
            setShowApp(!showApp);
        } else if (e === "2") {
            //go to MainForm page
            setGoMain(true);
            //5ms after Guest true
            setTimeout(() => {
                setLogin(true);
            }, 1000);
        } else if (e === "3") {
            setGoMain(true);
        }
    }

    if (showApp) {
        settings.particle.color = "#000";
    } else {
        settings.particle.color = "#35D6ED";
    }

      
    return (
        <>
            {!login &&
                <SlidingDiv status={gomain}>
                    <ParticleBackground settings={settings}/>
                    <WelcomeForm showApp={showApp} login={login} gomain={gomain} take={take}/>
                    {showApp && <SignUpForm showApp={showApp} take={take} />}
                </SlidingDiv>
            }
            
            {login && <MainForm />}
        </>

    );
}

export default Welcome;
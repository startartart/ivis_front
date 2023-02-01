import React, { useState } from 'react';
import WelcomeForm from '../Welcome-components/WelcomeForm';
import SignUpForm from '../Welcome-components/SignUpForm';
import ParticleBackground from 'react-particle-backgrounds'

const Welcome = () => {
    const [showApp, setShowApp] = useState(false);
    const [login, setLogin] = useState(false);
    const [guest, setGuest] = useState(false);

    const take = (e) => {
        if (e === "1") {
            //toggle showApp
            setShowApp(!showApp);
        } else if (e === "2") {
            setLogin(true);
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
            <ParticleBackground settings={settings}/>
            <WelcomeForm showApp={showApp} login={login} guest={guest} take={take}/>
            {showApp && <SignUpForm showApp={showApp} take={take} />}
        </>

    );
}

export default Welcome;
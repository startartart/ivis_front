import React, { useState } from "react";
import styled from "styled-components";

const SignUpFormFragment = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 350px;
    height: 250px;
    background-color: #fff;
    border: 1px solid #000;
    text-align: center;

    //appear left to right
    animation: appear 1.0s ease-in-out;

    @keyframes appear {
        from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }

    //disappear is true then disappear right to left
    ${props => props.disapper && `
        animation: disappear 0.5s ease-in-out;

        @keyframes disappear {
            from {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
            to {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.5);
            }
        }
    `}

`;

const SignUpForm = ({showApp, take}) => {

    const [disappear, setDisappear] = useState(showApp);

    async function enterHandler() {
        setDisappear(!disappear);
        await new Promise(resolve => setTimeout(resolve, 500));
        await take("1");
    }

    return (
        <SignUpFormFragment disapper={!disappear}>
            <h1>SignUpForm</h1>
            <h1>ID</h1><input type="text" />
            <h1>PW</h1><input type="text" 
            onKeyPress={(e) => {
                if(e.key === "Enter") {
                    enterHandler();
                }
            }}/><br/>
            <button onClick={enterHandler}>Enter</button>
        </SignUpFormFragment>
    );
}

export default SignUpForm;
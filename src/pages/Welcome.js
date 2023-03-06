import React from 'react';
import "./Welcome.scss";
import styled from 'styled-components';
import { useRegisterState, useRegisterDispatch } from '../contexts/RegisterContext';
import SignUpForm from '../share-components/SignUpForm';
import WelcomeBackground from '../Welcome-components/WelcomeBackground';
import axios from 'axios';

const SignatureTitleFragment = styled.div`
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const TextFragment = styled.div`
    font-size: 4rem;
    display: flex;
	position: absolute;
    top: 30%;
	left: 50%;
	transform: translateX(-50%);
	user-select: none;
    color: #05AFF2;
`;

const Letter = styled.div`
    transition: ease-out 1s;
	transform: translateY(40%);
`;

const Shadow = styled.div`
    transform: scale(1, -1);
	color: #999;
	transition: ease-in 0.5s, ease-out 0.5s;
`;

const WrapperFragment = styled.div`

    padding: 0 0.2rem;

    &:hover {
        ${Letter} {
            transform: translateY(-50%);
        }
        ${Shadow} {
            opacity: 0;
			transform: translateY(50%);
        }
    }
`;

const UpdateText = styled.div`
    padding: 0 0.2rem;
    @keyframes blink {
            0% {
                opacity: 0;
            }
            50% {
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
        }

    ${props => props.status === 'new' && `
        color: red;
        animation: blink 1s ease-in-out infinite;
    `}

    ${props => props.status === 'update' && `
        color: blue;
    `}

    ${props => props.status === 'incomplete' && `
        color: green;
    `}

    ${props => props.status === 'No entry' && `
        color: gray;
        text-decoration: line-through;
    `}

`;

const Welcome = () => {
    // 애니메이션 디스플레이 차후 수정
    // const [display, setDisplay] = useState(true);
    // const [animation, setAnimation] = useState('wait');

    const {show, login} = useRegisterState();
    const dispatch = useRegisterDispatch();

    const onOpenHandler = (e) => {
        e.preventDefault();
        if (show) return;

        axios.get('https://ivis.dev/api/user/logincheck')
        .then(res => {
            if (res.data.result === true) {
                dispatch({
                    type: 'LOGIN',
                    name: res.data.name,
                    login: true,
                    isSubmit: res.data.applied
                });
                console.log("로그인이 되어있음");
            } else {
                dispatch({ type: 'TOGGLE_FORM' });
                console.log("로그인이 되어있지 않음");
            }
        })
        .catch(err => {
            console.log("err : ", err);
        })
    }

    // const goMainHandler = async () => {
    //     setAnimation('go');
    //     await new Promise(resolve => setTimeout(resolve, 1000));
    //     setDisplay(false);
    // }

    return (
        // display ? (
        // <AllWrapperFragment status={animation}>
        <div className="background">
            <div id="intro">모바일 세로모드에 최적화된 환경입니다.</div>
            <WelcomeBackground/>
            <SignatureTitleFragment>
                <TextFragment>
                    <WrapperFragment>
                        <Letter>I</Letter>
                        <Shadow>I</Shadow>
                    </WrapperFragment>
                    <WrapperFragment>
                        <Letter>V</Letter>
                        <Shadow>V</Shadow>
                    </WrapperFragment>
                    <WrapperFragment>
                        <Letter>I</Letter>
                        <Shadow>I</Shadow>
                    </WrapperFragment>
                    <WrapperFragment>
                        <Letter>S</Letter>
                        <Shadow>S</Shadow>
                    </WrapperFragment>
                </TextFragment>
            </SignatureTitleFragment>
            <div className="center-center">
                {login ? <a href="#javascript" className="btn-glitch-fill" onClick={onOpenHandler} >
                    <span className="text"><UpdateText status={'new'}>[new]</UpdateText>마이 홈</span>
                    <span className="text-decoration">_</span>
                    <span className="decoration">&rArr;</span>
                </a> :
                <a href="#javascript" className="btn-glitch-fill" onClick={onOpenHandler} >
                <span className="text"><UpdateText status={'new'}>[new]</UpdateText>로그인, 회원가입</span>
                <span className="text-decoration">_</span>
                <span className="decoration">&rArr;</span>
                </a>
                }
                
                <a href="/main" className="btn-glitch-fill" >
                    <span className="text"><UpdateText status={'incomplete'}>[incomplete]</UpdateText>메인 페이지</span>
                    <span className="text-decoration">_</span>
                    <span className="decoration">&rArr;</span>
                </a>
                <a href="#javascript" className="btn-glitch-fill click-none">
                    <span className="text"><UpdateText status={'No entry'}>[No entry]</UpdateText>자료실</span>
                    <span className="text-decoration">_</span>
                    <span className="decoration">&rArr;</span>
                </a>
            </div>
            {show && <SignUpForm/>}
            <img className="logo" src="./images/ivis-logo36.png" alt="logo" />
        </div>
        // </AllWrapperFragment>
        // ) : null
    );
}

export default Welcome;
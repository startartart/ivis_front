import React from 'react';
import "./MainForm.scss";
import { TypeAnimation } from 'react-type-animation';

const MainForm = () => {
    return (
        <>
            <div className="main-form">
            <div className='main-intro'>모바일 세로모드, chorme 엔진에 최적화된 환경입니다.</div>
                <div className="clouds">
                    <div className="cloud x1"></div>
                    <div className="cloud x2"></div>
                    <div className="cloud x3"></div>
                    <div className="cloud x4"></div>
                    <div className="cloud x5"></div>
                </div>
            </div>
            <div className="frame">
                <div className="frame-front"></div>
                <div className="frame-back">
                    <p>Hello, IVIS</p>
                    <p>I . Information</p>
                    <p>VIS . Visualization</p>
                </div>
            </div>
            <div className="main-text">
                <TypeAnimation
                    sequence={[
                        'Welcome to IVIS',
                        1000
                    ]}
                    wrapper="div"
                    cursor={false}
                    repeat={Infinity}
                    speed={20}
                    deletionSpeed={5}
                    style={{ fontSize: '2.2rem' }}
                />
                <TypeAnimation
                    sequence={[
                        3000,
                        '2023 신입부원을 모집합니다.',
                        3000,
                        '지원서 접수 기간: 2023. 03. 01 ~ 미정',
                        5000,
                        '지원서 접수 방법: MyHome을 통해',
                        3000
                    ]}
                    wrapper="div"
                    cursor={false}
                    repeat={Infinity}
                    speed={40}
                    style={{ fontSize: '1rem', paddingTop: '1rem' }}
                />
            </div>
        </>
        
    );
    }
export default MainForm;

import React from 'react';
import "./About.scss";
import styled from 'styled-components';

const About = () => {
    return (
        <div className='about-frames'>
            <div className="about-title">
            <div class="ribbon ribbon-top-left"><span><a href="/">신입부원 모집</a></span></div>
            </div>
            <main className="about-content">
                <div className="book">
                    <div className="book-credit book-cover">
                        <div classNam="book-credit">
                            <p className="book-top">Hello, IVIS About</p>
                            <p className="book-under">Click(Hover) Me</p>
                        </div>
                    </div>
                    <div className="book-credit book-content">
                        <p className="content-title">IVIS(정보시각화연구실)</p>
                        <p className="content-detail">지도 교수(Professor) : 박동규<hr/></p>
                        <p className="content-detail">연구 분야(Research Area)<br/><br/>Web, Native<br/>임베디드 컴퓨팅<br/> 인공지능<br/>컴퓨터 그래픽스<hr/></p>
                        <p className="content-detail">연구실 주소(Address)<br/><br/>(우)51140 경남 창원시 의창구 창원대학로 20 국립창원대학교 공과대학 51호관 3층 304호<hr/></p>
                        <p className="content-detail">커리큘럼(Curriculum)<br/>
                            <br/><a href="#web">1. Web(Frontend, Backend)</a><br/>
                            <a href="#native">2. Native</a><br/>
                            <a href="#computing">3. 임베디드 컴퓨팅</a><br/>
                            <a href="#ai">4. 인공지능</a><br/><hr/></p>
                        <p className="content-detail">연구실 활동(Activities)<br/><br/>- 주 1회 세미나 진행<br/>- 학기중 스터디 그룹 진행<br/>- 각종 대외활동(해커톤, 소프트웨어 경진대회 등)<hr/></p>
                        <p className="content-detail">연구실 소개(Introduction)<br/><br/>Web/App의 기본소양을 갖추어, 상호작용가능한 개발자를 목표로 연구와 각종 대외활동을 합니다.<hr/></p>
                        <p id="web" className="content-detail">Web(Frontend, Backend) 과정<br/>
                            <br/>-공통<br/>1. Internet, HTML, CSS<br/>2. JavaScript, DOM, Ajax<br/>3.Git, 자료구조, 알고리즘<br/>
                            <br/>-Front<br/>1. React<br/>2. JWT, Session<br/>3. TypeScript<br/>4. Hybrid App<br/>
                            <br/>-Back<br/>1. Java 혹은 Python<br/>2. RDBMS(MySQL), API 설계<br/>3. Linux, Spring, Express 등<br/>4. Security<hr/></p>
                        <p id="native" className="content-detail">Native 과정<br/>-Native<br/>1. Java<br/>2. Kotiln, Flutter<hr/></p>
                        <p id="computing" className="content-detail">임베디드 컴퓨팅 과정<br/>-Embedded System<br/>1. C, C++<br/>2. Arduino, Raspberry Pi<br/>3. 운영체제<hr/></p>
                        <p id="ai" className="content-detail">인공지능 과정<br/>-AI<br/>1. Python<br/>2. Tensorflow, Keras, Pytorch<hr/></p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default About;
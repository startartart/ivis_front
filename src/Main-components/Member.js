import React from 'react';
import "./Member.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faArrowLeftLong, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';

const Member = () => {
    return (
        <div className="member-wrapper">
            <div className="member-title">
                <p>Member Profiles</p>
            </div>
            <div className="member-selector-form">
                <div className="member-selector-left"><FontAwesomeIcon icon={faArrowLeftLong} /></div>
                <div className="member-selector-center">
                </div>
                <div className="member-selector-right"><FontAwesomeIcon icon={faArrowRightLong} /></div>
            </div>
            <div className="member-show-form">
                <p>이름 : 박병권</p>
                <p>학년 : 4학년</p>
                <p>휴대폰 : 010-8353-2755</p>
                <p>이메일 : startartart@naver.com</p>
                <p>프로그래밍 언어 : C++, JavaScript, Python</p>
                <hr/>
                <div className="member-icon-list">
                <a className="member-icon" href="https://github.com/startartart"><FontAwesomeIcon icon={faGithub} /></a>
                <a className="member-icon" href="https://github.com/startartart"><FontAwesomeIcon icon={faInstagram} /></a>
                </div>
            </div>
        </div>
    );
}

export default Member;
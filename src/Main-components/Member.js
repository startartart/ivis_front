import React, { useState } from 'react';
import "./Member.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faArrowLeftLong, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';

const members = [
    {
        name: "박병권",
        grade: "4학년",
        phone: "010-8353-2755",
        email: "startart@naver.com",
        language: "C++, JavaScript, Python",
        links: [
            {
                name: "github",
                link: "https://github.com/startartart"
            },
            {
                name: "instagram",
                link: "https://www.instagram.com/b2_gw0n"
            }
        ]
    },
    {
        name: "김상범",
        grade: "4학년",
        phone: "010-5125-2912",
        email: "picel@ivis.dev ",
        language: "Go, Dart, Python, Ruby",
        links: [
            {
                name: "github",
                link: "https://GitHub.com/picel"
            },
            {
                name: "instagram",
                link: ""
            }
        ]
    },
    {
        name: "김은지",
        grade: "4학년",
        phone: "010-9254-6292",
        email: "euni62@ivis.dev",
        language: "C, Python, JavaScript",
        links: [
            {
                name: "github",
                link: "https://github.com/ZJi62"
            },
            {
                name: "instagram",
                link: ""
            }
        ]
    },
    {
        name: "마승욱",
        grade: "3학년",
        phone: "010-8253-9918",
        email: "msu2020@naver.com",
        language: "C, Python, JavaScript, Java",
        links: [
            {
                name: "github",
                link: "https://github.com/MaiBoii"
            },
            {
                name: "instagram",
                link: ""
            }
        ]
    },
    {
        name: "임동균",
        grade: "3학년",
        phone: "010-3170-9934",
        email: "eleven1000@ivis.dev",
        language: "C, Python, JavaScript, PHP, SQL",
        links: [
            {
                name: "github",
                link: "https://github.com/AceDKLim"
            },
            {
                name: "instagram",
                link: "https://instagram.com/ace_dk_lim?igshid=ZDdkNTZiNTM="
            }
        ]
    },
]

const Member = () => {
    const [index, setIndex] = useState(0);

    const nextMember = () => {
        if (index === members.length - 1) {
            setIndex(0);
        } else {
            setIndex(index + 1);
        }
    }

    const prevMember = () => {
        if (index === 0) {
            setIndex(members.length - 1);
        } else {
            setIndex(index - 1);
        }

    }
    return (
        <div className="member-wrapper">
            <div className="member-title">
                <p>Member Profiles</p>
            </div>
            <div className="member-selector-form">
                <div className="member-selector-left"><FontAwesomeIcon icon={faArrowLeftLong} onClick={prevMember}/></div>
                <div className="member-selector-center">
                    no image
                </div>
                <div className="member-selector-right"><FontAwesomeIcon icon={faArrowRightLong} onClick={nextMember} /></div>
            </div>
            <div className="member-show-form">
                <p>이름 : {members[index].name}</p>
                <p>학년 : {members[index].grade}</p>
                <p>휴대폰 : {members[index].phone}</p>
                <p>이메일 : {members[index].email}</p>
                <p>프로그래밍 언어 : {members[index].language}</p>
                <hr/>
                <div className="member-icon-list">
                <a className="member-icon" href={members[index].links[0].link}><FontAwesomeIcon icon={faGithub} /></a>
                {members[index].links[1].link === "" ? "" : <a className="member-icon" href={members[index].links[1].link}><FontAwesomeIcon icon={faInstagram} /></a>}
                
                </div>
            </div>
        </div>
    );
}

export default Member;
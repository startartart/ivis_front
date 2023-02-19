import React from 'react';
import styled from 'styled-components';
import "./Notice.scss"

const DevelopFragment = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 1rem;
`;

const Notice = () => {
    return (
        <DevelopFragment>
            <p>-- IVIS Notice --</p>
            <div className='notice-show-container'>
                <p>2023 신입부원 모집</p>
                <p>2023 IVIS 교육 안내</p>
            </div>
            <p>-- IVIS Logs --</p>
            <div className="notice-scroll-container">
                <div className='notice-scroll-contents'>
                    <p>2023. 01. 01 : 개인 프로젝트 준비</p>
                    <p>2023. 02. 01 : 팀 프로젝트 시작</p>
                    <p>2023. 02. 08 : 로컬 프론트 서버 테스트</p>
                    <p>2023. 02. 10 : 서버 호스팅 및 연동 확인</p>
                    <p>2023. 02. 18 : 테스트 서버 진행 및 버그 확인</p>
                    <p>2023. 02. 19 : 버그 확인 및 서비스 오픈 </p>
                    <p>2023. 02. 20 : 신입생 연구실 OT 진행</p>
                </div>
            </div>

        </DevelopFragment>
    );
}

export default Notice;
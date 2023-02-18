# IVIS - Front Project

---
##### This project was carried out in React and is using npm 9.4.0.
##### Also, react-creat-app package was used, and other used package is described below.
---

* Update Profile
    * 22.01.31 : front design first update
    * 22.02.01 : pages(Welcome) component
    * 22.02.02 : SignUpForm Component - 4 levels (name, phone ...) information input
        * 컴포넌트, 페이지 및 Context를 통한 정리가 필요함
    * 22.02.03 : SignUpForm Component - Check Info, SimpleGame
    * 22.02.08 : Rebuilding Component & SignUpForm Component recycle
        * 향후 Context를 사용한 정리가 필요함
    * 22.02.09 : Rebuilding Component(Welcome, SignUpForm) & RegisterContext
        * 컴포넌트 정리 (Main -> App, MainForm -> Main, Welcome 수정 등)
        * 폰트 추가, 로고 삽입, 사용하지 않는 컴포넌트 제거
        * css animation 공부가 필요함
    * 22.02.15 : SignUpForm Component post, get server
        * 회원가입 -> 로그인 -> 신청서 작성 -> 로그아웃 단계
        * IVIS-API-GUIDE 참고해 req, res 작성 및 받을 것
        * 서버 오픈(02.19 이전 예정)에 따른 웹 프론트 TDD 작성이 필요한가
    * 22.02.16 : pages(Main) component rebuilding (About, Footer, MainForm, Member, Menu, Services)
        * 현재 진행 상황 : MainForm, Menu, Footer, 남은 컴포넌트 : About, Member, Services
        * 로딩 컴포넌트 작성 필요
        * SignUpForm 컴포넌트를 어디에 재활용할 것인가? -> Services에 하는게 나을 듯
        * 시간부족으로 인해 codePen을 적극 활용하여 디자인을 할 것
    * 22.02.17 : About, Member Component Update & Services -> Developer Component
        * [ivis.dev](https://ivis.dev/) front-back server open
        * Main page 완성할 것
    * 22.02.18 : Member Component Update & SignUpForm HTTP request udpate
        * 추가 결과확인 컴포넌트를 짤 것
        * 기타 수정사항 및 버그 최종확인 해야함
        
* Install pacakge `npm install ...`
    * `react-router-dom`
        * 전반적 페이지 라우팅, 링킹
    * `react-icons` `react-awesome-shapes` `react-fontawesome`
        * 리액트 아이콘, 도형 등 컴포넌트 제공
    * `react-background-slider`
        * 백그라운드 이미지 슬라이딩
    * `styled-components`
        * 컴포넌트 스타일링
    * `react-particle-backgrounds`
        * 백그라운드 모델 템플릿
    * `TextareaAutosize`
        * 자동 사이즈 텍스트

* Other DOCS
    * [Components Design](./documents/componet-design.md)
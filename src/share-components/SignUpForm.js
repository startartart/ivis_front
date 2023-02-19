import React, { useState } from "react";
import styled from "styled-components";
import "./SignUpForm.scss"
import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useRegisterState, useRegisterDispatch } from "../contexts/RegisterContext";
import TextareaAutosize from 'react-textarea-autosize';
import axios from "axios";

const SignUpFormFragment = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: auto;
    display: inline-flex;
    flex-direction: column;
    padding: 1.6rem 2.5rem;
    border: 3px solid black;
    border-radius: 5px;
    background: white;
    box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.2);

    ${props => props.control && `
        top: ${props.control}px;
    `}

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

const Text = styled.p`
    margin: 0.5rem;
    text-align: left;
    line-height: 1.2;
`;

const ButtonBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Button = styled.button`
    color:inherit;
    font-family:inherit;
    font-size: inherit;
    background: white;
    padding: 0.3rem 3.4rem;
    border: 3px solid black;
    box-shadow: 0 0 0 black;
    transition: all 0.2s;
    cursor: pointer;
    white-space:nowrap;

    &:hover {
        box-shadow: 0.4rem 0.4rem 0 black;
        transform: translate(-0.4rem, -0.4rem);
    }

    &:active {
        box-shadow: 0 0 0 black;
        transform: translate(0, 0);
    }

`;

const Label = styled.label`
    position: absolute;
    top: 0;
    display: none;
    font-size: 1rem;
    color: #9b9b9b;
    transition: 0.5s;
    min-width: 200px;

    ${props => props.value && `
        display: block;
        font-weight: bold;
    `}

    ${props => props.error && `
        display: block;
        font-weight: bold;
        color: red;

        animation: shake 0.5s;

            @keyframes shake {
                0% { transform: translate(1px, 1px) rotate(0deg); }
                10% { transform: translate(-1px, -2px) rotate(-1deg); }
                20% { transform: translate(-3px, 0px) rotate(1deg); }
                30% { transform: translate(3px, 2px) rotate(0deg); }
                40% { transform: translate(1px, -1px) rotate(1deg); }
                50% { transform: translate(-1px, 2px) rotate(-1deg); }
                60% { transform: translate(-3px, 1px) rotate(0deg); }
                70% { transform: translate(3px, 1px) rotate(-1deg); }
                80% { transform: translate(-1px, -1px) rotate(1deg); }
                90% { transform: translate(1px, 2px) rotate(0deg); }
                100% { transform: translate(1px, -2px) rotate(-1deg); }
            }
    `}

`;

const ContinueButton = styled.i`
    position: absolute;
    display: none;
    top: 1.2rem;
    //size
    font-size: 1.2rem;
    right: -0.7rem;
    color: #9b9b9b;

    ${props => props.value && `
        display: block;
    `}
`;

const Input = styled.input`
    font-family: inherit;
    width: 100%;
    border: 0;
    border-bottom: 2px solid #9b9b9b;
    outline: 0;
    font-size: 1.0rem;
    padding: 0.7rem 0;
    background: transparent;
    transition: border-color 0.2s;

    // remove default arrow
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    &:focus {
        &::placeholder {
            color: transparent;
        }
        border-bottom-color: #333333;
    }

    &:focus ~ ${Label} {
        position: absolute;
        top: 0;
        display: block;
        transition: 0.5s;
        font-size: 1rem;
        color: #333333;

        ${props => props.error && `
            color: red;
            font-weight: bold;
        `}
    }
`;

const InputBox = styled.div`
    position: relative;
    padding: 0.5rem;
    margin: 0;
    width: 10rem;
`;

const SignUpForm = ({control}) => {
    const { check, name, isSubmit } = useRegisterState();
    const [values, setValues] = useState({
        name: name,
        phone: "",
        studentNumber: "",
        password: "",
        passwordCheck: "",
        check: check,
        cite: false,
        isSubmit: isSubmit,
    });
    const [answer, setAnswer] = useState({
        q1: "",
        q2: "",
        q3: "",
        q4: ""
    });
    const [loading, setLoading] = useState(false);

    const [passwordCheck, setPasswordCheck] = useState(false);

    const dispatch = useRegisterDispatch();

    // state 값 변경 함수
    const onChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
            cite: false,
        });
    }
    const onChangeText = (e) => {
        const { name, value } = e.target;
        setAnswer({
            ...answer,
            [name]: value,
        });
    }

    // 학번 중복체크 존재하면 로그인 진행, 없으면 회원가입 진행
    const sidCheckHandler = async () => {
        setLoading(true);
        await axios.post("https://ivis.dev/api/user/sidcheck", {
            sid: values.studentNumber
        },{withCredentials: true}
        ).then((res) => {
            if (res.data.result === true) {
                // 로그인 진행
                dispatch({
                    type: "NEXT",
                    check: check
                });
                console.log("로그인 진행");
            } else {
                // 회원가입 진행 
                dispatch({
                    type: "REGISTER",
                    check: check
                });
                console.log("회원가입진행");
            }
        }).catch((err) => {
            console.log(err);
        });
        setLoading(false);
    }
    // 비밀번호 체크, 8자리 이상, 비밀번호와 비밀번호 확인이 같은지 체크
    const pwCheckHandler = async () => {
        if (check === 10) {
            if (values.password.length < 8) {
                setValues({
                    ...values,
                    cite: true
                });
                return;
            }
            dispatch({
                type: "NEXT",
                check: check + 1
            });
            return;
        }
        setLoading(true);
        await axios.post("https://ivis.dev/api/user/pwcheck", {
            sid: values.studentNumber,
            pw: values.password,
        },{withCredentials: true}
        ).then((res) => {
            if (res.data.result === true) {
                dispatch({
                    type: "NEXT",
                    check: check + 1,
                });
                dispatch({
                    type: "CHECK",
                    name: res.data.name,
                    isSubmit: res.data.apply
                });
                // 로컬스토리지에 쿠키와 이름 저장
                localStorage.setItem("name", res.data.name);

            } else {
                setValues({
                    ...values,
                    cite: true
                });
            }
        }).catch((err) => {
            console.log(err);
        });
        setLoading(false);
    }
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axios.post("https://ivis.dev/api/user/register", {
            sid: values.studentNumber,
            pw: values.password,
            name: values.name,
            phone: values.phone,
        },{withCredentials: true}
        ).then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
        setLoading(false);
        await dispatch({
            type: "NEXT",
            check: check + 1,
        });
        
    }
    const onSendFormHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const languageArray = answer.q2.split(',');
        console.log(languageArray);
        await axios.post("https://ivis.dev/api/application", {
            intro: answer.q1,
            language: languageArray,
            project: answer.q3,
            etc: answer.q4,
            
        },{ withCredentials: true })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
        setLoading(false);
        await dispatch({ type: 'SUBMIT' });
    }
    const onResultCheckHandler = async (e) => {
        e.preventDefault();
        // await axios.get("https://ivis.dev/api/application", {
        //     //not params
        // })
        // .then((res) => {
        //     console.log(res);
        // })
        // .catch((err) => {
        //     console.log(err);
        // });
        dispatch({ type: 'RESULT' });
    }
    const onSendLogoutHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axios.get("https://ivis.dev/api/user/logout", {
            //not params
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
        setLoading(false);
        dispatch({ type: 'CLEAR' });
    }

    // 이외 dispatch 함수
    const continueEnterHandler = async (e) => {
        if (e.key === "Enter") {
            if (check === 1) {
                sidCheckHandler();
            } else if (check === 2 || check === 10) {
                pwCheckHandler();
            } else {
                dispatch({
                    type: "NEXT",
                    check: check + 1,
                });
            }
        }
    };
    const continueHandler = async (e) => {
        if (check === 1) {
            sidCheckHandler();
        } else if (check === 2) {
            pwCheckHandler();
        } else {
            dispatch({
                type: "NEXT",
                check: check + 1,
            });
        }
    };

    const onPrevHandler = (e) => {
        e.preventDefault();
        dispatch({ type: 'PREV' });
    }
    const onClearHandler = (e) => {
        e.preventDefault();
        dispatch({ type: 'CLEAR' });
    }
    
    const onCloseHandler = (e) => {
        e.preventDefault();
        dispatch({ 
            type: 'CLOSE',
            name: values.name,
            login: true
        });
    }

    //비밀번호 확인 이벤트
    const handleCheckPasswordOver = (e) => {
        e.preventDefault();
        setPasswordCheck(true);
    };
    const handleCheckPasswordLeave = (e) => {
        e.preventDefault();
        setPasswordCheck(false);
    };
    return (
        <>
                <SignUpFormFragment control={control}>     
                {check === 0 && (
                    <>
                        <Text>2023년 IVIS 신입부원을 모집합니다.</Text>
                        <Text>정보수집을 위해 이름, 전화번호, 학번이 필요합니다. 동의하십니까?</Text>
                        <Text>로그인 혹은 신청하려면 YES를 눌러주세요.</Text>
                        <ButtonBox>
                            <Button className="row" onClick={continueHandler}>YES</Button>
                            <Button className="row" onClick={onClearHandler}>NO</Button>
                        </ButtonBox>
                    </>
                )}
                {check >= 1 && (
                    <>
                        {/* db에 학번이 존재할경우 dispatch{LOGIN}, 학번이 존재하지 않는경우 dispatch{NEXT} */}
                        {check === 1 && (
                        <InputBox>
                            <Input
                                type="number"
                                name="studentNumber"
                                value={values.studentNumber}
                                onChange={onChange}
                                onKeyPress={continueEnterHandler}
                                autoFocus placeholder="학번"
                                maxLength={10} />
                            <ContinueButton
                                value={values.studentNumber}
                                onClick={continueHandler}>
                                    <FontAwesomeIcon icon={faArrowRight} />
                            </ContinueButton>
                            <Label>학번</Label>
                        </InputBox>
                        )}
                        {check === 2 && (
                        <InputBox>
                            <Input
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={onChange} 
                                onKeyPress={continueEnterHandler}
                                autoFocus placeholder="비밀번호"
                                maxLength={15}
                                error={values.cite} />
                            <ContinueButton
                                value={values.password}
                                onClick={continueHandler}>
                                    <FontAwesomeIcon icon={faArrowRight} />
                            </ContinueButton>
                            <Label error={values.cite}>{values.cite === false 
                                ? "비밀번호"
                                : "틀린 비밀번호입니다."
                            }</Label>
                        </InputBox>
                        )}

                        {/* MyHome */}
                        {check === 3 && (
                            <>
                                <Text>MyHome : {name} {isSubmit === true ? "[신청 완료]" : "[미신청]"}</Text>
                                {isSubmit === true ? null : <Button className="col" onClick={continueHandler}>신청하기</Button>}
                                {isSubmit === true ? <Button className="col" onClick={onResultCheckHandler}>신청결과</Button> : null}
                                <Button className="col" onClick={onCloseHandler}>나가기</Button>
                                <Button className="col" onClick={onSendLogoutHandler}>로그아웃</Button>
                            </>
                        )}

                        {/* 신청하기 */}
                        {check === 4 && (
                            <>
                                <Text>신청서는 각 순서에 맞게 답변하며, 보낸 양식은 수정 불가능합니다.</Text>
                                <Text>자기소개 - 사용 가능 프로그래밍 언어 - 프로젝트 경험 - 향후 계획, 희망 분야 순으로 작성합니다.</Text>
                                <ButtonBox>
                                    <Button className="row" onClick={onPrevHandler}>CLOSE</Button>
                                    <Button className="row" onClick={continueHandler}>NEXT</Button>
                                </ButtonBox>
                                
                            </>
                        )}
                        {check === 5 && (
                            <>
                                <Text>1. 자기소개</Text>
                                <InputBox>
                                    <TextareaAutosize
                                    name="q1"
                                    className="text-area"
                                    minRows={3}
                                    maxRows={10}
                                    placeholder="이름, 연구실 지원 동기 등 간단한 자기 소개"
                                    onChange={onChangeText}
                                    value={answer.q1}
                                    />
                                </InputBox>
                                <ButtonBox>
                                    <Button className="row" onClick={onPrevHandler}>PREV</Button>
                                    <Button className="row" onClick={continueHandler}>NEXT</Button>
                                </ButtonBox>
                            </>
                        )}
                        {check === 6 && (
                            <>
                                <Text>2. 사용 가능 프로그래밍 언어</Text>
                                <Text>능숙함을 기준으로 상,중,하로 쉼표로 띄우지 말고 구분</Text>
                                <Text>없으면 "없음" 으로 기재</Text>
                                <InputBox>
                                    <TextareaAutosize
                                    name="q2"
                                    className="text-area"
                                    minRows={2}
                                    maxRows={5}
                                    placeholder="C언어(상),C++(중),JAVA(하)"
                                    onChange={onChangeText}
                                    value={answer.q2}
                                    />
                                </InputBox>
                                <ButtonBox>
                                    <Button className="row" onClick={onPrevHandler}>PREV</Button>
                                    <Button className="row" onClick={continueHandler}>NEXT</Button>
                                </ButtonBox>
                            </>
                        )}
                        {check === 7 && (
                            <>
                                <Text>3. 프로젝트 경험</Text>
                                <Text>없으면 "없음" 으로 기재</Text>
                                <InputBox>
                                    <TextareaAutosize
                                    name="q3"
                                    className="text-area"
                                    minRows={2}
                                    maxRows={5}
                                    placeholder="개인 웹페이지 제작, 라즈베리파이를 이용한 IoT 프로젝트, 유니티를 이용한 게임 제작 등"
                                    onChange={onChangeText}
                                    value={answer.q3}
                                    />
                                </InputBox>
                                <ButtonBox>
                                    <Button className="row" onClick={onPrevHandler}>PREV</Button>
                                    <Button className="row" onClick={continueHandler}>NEXT</Button>
                                </ButtonBox>
                            </>
                        )}
                        {check === 8 && (
                            <>
                                <Text>4. 향후 계획, 희망 분야</Text>
                                <Text>다음 답변에 따라 학년별로 다양한 커리큘럼을 제공합니다.</Text>
                                <InputBox>
                                    <TextareaAutosize
                                    name="q4"
                                    className="text-area"
                                    minRows={4}
                                    maxRows={6}
                                    placeholder="아직 웹페이지 제작에 대한 지식이 없지만, 이번 년도 안에 개인 블로그를 만들어보고 싶습니다."
                                    onChange={onChangeText}
                                    value={answer.q4}
                                    />
                                </InputBox>
                                <ButtonBox>
                                    <Button className="row" onClick={onPrevHandler}>PREV</Button>
                                    <Button className="row" onClick={continueHandler}>NEXT</Button>
                                </ButtonBox>
                            </>
                        )}
                        {check === 9 && (
                            <>
                                <Text>신청서 작성이 완료되었습니다.</Text>
                                <Text>신청서는 수정이 불가능하므로 신중히 작성해주세요.</Text>
                                <Text>차후, 신청결과는 개인 카카오톡 혹은 MyHome에서 확인하실 수 있습니다.</Text>
                                <ButtonBox>
                                    <Button className="row" onClick={onPrevHandler}>PREV</Button>
                                    <Button className="row" onClick={onSendFormHandler}>SEND</Button>
                                </ButtonBox>
                            </>
                        )}

                        {/* 신입부원 회원가입 */}
                        {check === 10 && (
                            <InputBox>
                            <Input
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={onChange} 
                                onKeyPress={continueEnterHandler}
                                autoFocus placeholder="비밀번호(최대 15)"
                                maxLength={15}
                                error={values.cite} />
                            <ContinueButton
                                value={values.password}
                                onClick={continueHandler}>
                                    <FontAwesomeIcon icon={faArrowRight} />
                            </ContinueButton>
                            <Label error={values.cite}>{values.cite === false 
                                ? "비밀번호(최소 8, 최대 15)"
                                : "올바르지 않는 규칙입니다."
                            }</Label>
                        </InputBox>
                        )}
                        {check === 11 && (
                            <InputBox>
                            <Input 
                                type="text" 
                                name="name"
                                value={values.name}
                                onChange={onChange}
                                onKeyPress={continueEnterHandler}
                                autoFocus placeholder="이름"
                                maxLength={4} />
                            <ContinueButton
                                value={values.name}
                                onClick={continueHandler}>
                                    <FontAwesomeIcon icon={faArrowRight} />
                            </ContinueButton>
                            <Label>이름</Label>
                        </InputBox>
                        )}
                        {check === 12 && (
                            <InputBox>
                            <Input
                                type="number"
                                name="phone"
                                value={values.phone}
                                onChange={onChange}
                                onKeyPress={continueEnterHandler}
                                autoFocus placeholder="전화번호(- 제외)" 
                                maxLength={12}/>
                            <ContinueButton
                                value={values.phone} 
                                onClick={continueHandler}>
                                    <FontAwesomeIcon icon={faArrowRight} />
                            </ContinueButton>
                            <Label>전화번호(- 제외)</Label>
                        </InputBox>
                        )}
                        {check === 13 && (
                        <>
                            <Text>입력하신 정보가 맞는지 확인해주세요.</Text>
                            <Text>이름: {values.name}</Text>
                            <Text>전화번호: {values.phone}</Text>
                            <Text>학번: {values.studentNumber}</Text>
                            <Text onMouseOver={handleCheckPasswordOver} onMouseLeave={handleCheckPasswordLeave}>비밀번호(확인): {passwordCheck ? values.password : values.password.replace(/./g, "*")}</Text>
                            <ButtonBox>
                                <Button className="row" onClick={onSubmitHandler}>YES</Button>
                                <Button className="row" onClick={onClearHandler}>NO</Button>
                            </ButtonBox>
                        </>
                        )}
                        {check === 14 && (
                            <>
                                <Text>회원가입이 완료되었습니다. </Text>
                                <Button className="col" onClick={onCloseHandler}>닫기</Button>
                            </>
                        )}
                        {check === 15 && (
                            <>
                                <Text>결과가 공지되지 않았습니다. </Text>
                                <Button className="col" onClick={onCloseHandler}>닫기</Button>
                            </>
                        )}
                    </>
                )}
                {loading && (
                    <Loading />
                )}
            </SignUpFormFragment>
        </>
    );
}

export default SignUpForm;
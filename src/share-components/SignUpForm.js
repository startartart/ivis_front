import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useRegisterState, useRegisterDispatch } from "../contexts/RegisterContext";
import axios from "axios";

const SignUpFormFragment = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: auto;
    display: inline-flex;
    flex-direction: column;
    padding: 1.6rem 3rem;
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

    @media (min-width: 650px) {
        min-width: 250px;
    }

    &:last-child {
        margin: 0;
    }

    &:hover {
        box-shadow: 0.4rem 0.4rem 0 black;
        transform: translate(-0.4rem, -0.4rem);
    }

    &:active {
        box-shadow: 0 0 0 black;
        transform: translate(0, 0);
    }

    & + & {
        margin-left: 0.2rem;
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
    }
`;

const InputBox = styled.div`
    position: relative;
    padding: 0.5rem;
    margin: 0;
    width: 10rem;
`;

const SignUpForm = ({control}) => {
    const [values, setValues] = useState({
        name: "",
        phone: "",
        studentNumber: "",
        password: "",
        passwordCheck: "",
        check: 0,
    });
    const { check } = useRegisterState();
    const [passwordCheck, setPasswordCheck] = useState(false);

    const dispatch = useRegisterDispatch();

    const onChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    }

    const onCloseHandler = (e) => {
        e.preventDefault();
        dispatch({ type: 'CLEAR' });
    }

    const ContinueEnterHandler = (e) => {
        if (e.key === "Enter") {
            dispatch({
                type: "NEXT",
                check: check + 1,
            });
        }
    };

    const ContinueHandler = (e) => {
        dispatch({
            type: "NEXT",
            check: check + 1,
        });
    }; 

    const handleCheckPasswordOver = (e) => {
        e.preventDefault();
        setPasswordCheck(true);
    };

    const handleCheckPasswordLeave = (e) => {
        e.preventDefault();
        setPasswordCheck(false);
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        // API POST 나중에 다시 수정
        await axios.post("http://localhost:4000/api/auth/register", {
            name: values.name,
            phone: values.phone,
            studentNumber: values.studentNumber,
            password: values.password,
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
        await dispatch({
            type: "NEXT",
            check: check + 1,
        });
    };

    const onClearHandler = (e) => {
        e.preventDefault();
        dispatch({ type: 'CLEAR' });
    }

    return (
        <>
                <SignUpFormFragment control={control}>     
                {check === 0 && (
                    <>
                        <p>2023년 IVIS 신입부원을 모집합니다.</p>
                        <p>정보수집을 위해 이름, 전화번호, 학번이 필요합니다. 동의하십니까?</p>
                        <ButtonBox>
                            <Button onClick={ContinueHandler}>YES</Button>
                            <Button onClick={onCloseHandler}>NO</Button>
                        </ButtonBox>
                    </>
                )}
                {check >= 1 && (
                    <>
                        {check === 1 && (
                            <InputBox>
                                <Input 
                                    type="text" 
                                    name="name"
                                    value={values.name}
                                    onChange={onChange}
                                    onKeyPress={ContinueEnterHandler}
                                    autoFocus placeholder="이름"
                                    maxLength={4} />
                                <ContinueButton
                                    value={values.name}
                                    onClick={ContinueHandler}>
                                        <FontAwesomeIcon icon={faArrowRight} />
                                </ContinueButton>
                                <Label>이름</Label>
                            </InputBox>
                        )}
                        {check === 2 && (
                            <InputBox>
                                <Input
                                    type="text"
                                    name="phone"
                                    value={values.phone}
                                    onChange={onChange}
                                    onKeyPress={ContinueEnterHandler}
                                    autoFocus placeholder="전화번호(- 제외)" 
                                    maxLength={12}/>
                                <ContinueButton
                                    value={values.phone} 
                                    onClick={ContinueHandler}>
                                        <FontAwesomeIcon icon={faArrowRight} />
                                </ContinueButton>
                                <Label>전화번호(- 제외)</Label>
                            </InputBox>
                        )}
                        {check === 3 && (
                            <InputBox>
                                <Input
                                    type="text"
                                    name="studentNumber"
                                    value={values.studentNumber}
                                    onChange={onChange}
                                    onKeyPress={ContinueEnterHandler}
                                    autoFocus placeholder="학번"
                                    maxLength={10} />
                                <ContinueButton
                                    value={values.studentNumber}
                                    onClick={ContinueHandler}>
                                        <FontAwesomeIcon icon={faArrowRight} />
                                </ContinueButton>
                                <Label>학번</Label>
                            </InputBox>
                        )}
                        {check === 4 && (
                            <InputBox>
                                <Input
                                    type="password"
                                    name="password"
                                    value={values.password}
                                    onChange={onChange} 
                                    onKeyPress={ContinueEnterHandler}
                                    autoFocus placeholder="비밀번호(최대 15)"
                                    maxLength={15} />
                                <ContinueButton
                                    value={values.password}
                                    onClick={ContinueHandler}>
                                        <FontAwesomeIcon icon={faArrowRight} />
                                </ContinueButton>
                                <Label>비밀번호(최대 15)</Label>
                            </InputBox>
                        )}
                        {check === 5 && (
                            <>
                                <Text>입력하신 정보가 맞는지 확인해주세요.</Text>
                                <Text>이름: {values.name}</Text>
                                <Text>전화번호: {values.phone}</Text>
                                <Text>학번: {values.studentNumber}</Text>
                                <Text onMouseOver={handleCheckPasswordOver} onMouseLeave={handleCheckPasswordLeave}>비밀번호(확인): {passwordCheck ? values.password : values.password.replace(/./g, "*")}</Text>
                                <ButtonBox>
                                    <Button onClick={onSubmitHandler}>YES</Button>
                                    <Button onClick={onCloseHandler}>NO</Button>
                                </ButtonBox>
                            </>
                        )}
                        {check === 6 && (
                            <InputBox>
                                <Label value={true} onClick={onClearHandler} >신청이 완료되었습니다.</Label>
                            </InputBox>
                        )}
                    </>
                )}
            </SignUpFormFragment>
        </>
    );
}

export default SignUpForm;
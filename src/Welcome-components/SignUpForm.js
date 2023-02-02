import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const SignUpFormFragment = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: auto;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    padding: 1.6rem 3rem;
    border: 3px solid black;
    border-radius: 5px;
    background: white;
    box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.2);

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

    //props.status is border prgressive animation
    ${props => props.status === 1 && `
        border: 3px solid #35D6ED;
    `}
    ${props => props.status === 2 && `
        border: 3px solid #35D6ED;
        animation: progress 0.5s ease-in-out forwards;

        @keyframes progress {
            from {
                border: 3px solid #35D6ED;
            }
            to {
                border: 3px solid #C9F6FF;
            }
        }
    `}
    ${props => props.status === 3 && `
        border: 3px solid #C9F6FF;
        animation: progress 0.5s ease-in-out forwards;

        @keyframes progress {
            from {
                border: 3px solid #C9F6FF;
            }
            to {
                border: 3px solid #35D6ED;
            }
        }
    `}

    ${props => props.status === 4 && `
        border: 3px solid #35D6ED;
        animation: progress 0.5s ease-in-out forwards;

        @keyframes progress {
            from {
                border: 3px solid #35D6ED;
            }
            to {
                border: 3px solid #C9F6FF;
            }
        }
    `}

    ${props => props.status === 5 && `
        border: 3px solid #C9F6FF;
        animation: progress 0.5s ease-in-out forwards;

        @keyframes progress {
            from {
                border: 3px solid #C9F6FF;
            }
            to {
                border: 3px solid #35D6ED;
            }
        }
    `}
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

    ${props => props.value && `
        display: block;
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
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;

    &:focus {
        &::placeholder {
            color: transparent;
        }
        border-bottom-color: #11998e;
    }

    &:focus ~ ${Label} {
        position: absolute;
        top: 0;
        display: block;
        transition: 0.5s;
        font-size: 1rem;
        color: #11998e;
    }
`;

const InputBox = styled.div`
    position: relative;
    padding: 15px 0 0;
    margin-top: 10px;
    width: 10rem;

`;

const SignUpForm = ({showApp, take}) => {
    const [disappear, setDisappear] = useState(showApp);
    const [inputs, setInputs] = useState({
        name: "",
        phone: "",
        studentNumber: "",
        password: "",
    });
    const [check, setCheck] = useState(0);
    const { name, phone, studentNumber, password } = inputs;

    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    }

    async function closeHandler() {
        setDisappear(!disappear);
        await new Promise(resolve => setTimeout(resolve, 500));
        await take("1");
    }

    const ContinueEnterHandler = (e) => {
        if (e.key === "Enter") {
            ContinueHandler();
        }
    };

    const ContinueHandler = () => {
        setCheck(check + 1);
    }; 

    return (
        <SignUpFormFragment disapper={!disappear} status={check}>
            
            {check === 0 && (
                <>
                    <p>2023년 IVIS 신입부원을 모집합니다.</p>
                    <p>정보수집을 위해 이름, 전화번호, 학번이 필요합니다. 동의하십니까?</p>
                    <ButtonBox>
                        <Button onClick={ContinueHandler}>YES</Button>
                        <Button onClick={closeHandler}>NO</Button>
                    </ButtonBox>
                </>
            )}
            {check >= 1 && (
                <InputBox>
                    {check === 1 && (
                        <>
                            <Input 
                                type="text" 
                                name="name"
                                value={name}
                                onChange={onChange}
                                onKeyPress={ContinueEnterHandler}
                                autoFocus placeholder="이름" />
                            <ContinueButton
                                value={name}
                                onClick={ContinueHandler}>
                                    <FontAwesomeIcon icon={faArrowRight} />
                            </ContinueButton>
                            <Label>이름</Label>
                        </>
                    )}
                    {check === 2 && (
                        <>
                            <Input
                                type="text"
                                name="phone"
                                value={phone}
                                onChange={onChange}
                                onKeyPress={ContinueEnterHandler}
                                autoFocus placeholder="전화번호" />
                            <ContinueButton
                                value={phone} 
                                onClick={ContinueHandler}>
                                    <FontAwesomeIcon icon={faArrowRight} />
                            </ContinueButton>
                            <Label>전화번호</Label>
                        </>
                    )}
                    {check === 3 && (
                        <>
                            <Input
                                type="text"
                                name="studentNumber"
                                value={studentNumber}
                                onChange={onChange}
                                onKeyPress={ContinueEnterHandler}
                                autoFocus placeholder="학번" />
                            <ContinueButton
                                value={studentNumber}
                                onClick={ContinueHandler}>
                                    <FontAwesomeIcon icon={faArrowRight} />
                            </ContinueButton>
                            <Label>학번</Label>
                        </>
                    )}
                    {check === 4 && (
                        <>
                            <Input
                                type="password"
                                name="password"
                                value={password}
                                onChange={onChange} 
                                onKeyPress={ContinueEnterHandler}
                                autoFocus placeholder="비밀번호" />
                            <ContinueButton
                                value={password}
                                onClick={ContinueHandler}>
                                    <FontAwesomeIcon icon={faArrowRight} />
                            </ContinueButton>
                            <Label>비밀번호</Label>
                        </>
                    )}
                    {check === 5 && (
                        <>
                            <Label value={true} onClick={closeHandler}>신청이 완료되었습니다.</Label>
                        </>
                    )}
            
                </InputBox>
            )}
        </SignUpFormFragment>
    );
}

export default SignUpForm;
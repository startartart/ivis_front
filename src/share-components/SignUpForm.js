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
    justify-content: space-around;
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
    align-self: center;

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
    // const local = "http://localhost:3333/";
    const { check, name, isSubmit } = useRegisterState();
    const [values, setValues] = useState({
        name: name,
        phone: "",
        studentNumber: "",
        password: "",
        passwordCheck: "",
        cite: false,
        isSubmit: isSubmit,
        day: "",
        time: "",
    });
    const [answer, setAnswer] = useState({
        q1: "",
        q2: "",
        q3: "",
        q4: ""
    });

    const [days, setDays] = useState({
        "check": false,
        "sat": [],
        "sun": [],
    }
    );

    const [loading, setLoading] = useState(false);

    const [passwordCheck, setPasswordCheck] = useState(false);

    const dispatch = useRegisterDispatch();

    // state ??? ?????? ??????
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

    // ?????? ???????????? ???????????? ????????? ??????, ????????? ???????????? ??????
    const sidCheckHandler = async () => {
        setLoading(true);
        await axios.post("https://ivis.dev/api/user/sidcheck", {
            sid: values.studentNumber
        },{withCredentials: true}
        ).then((res) => {
            if (res.data.result === true) {
                // ????????? ??????
                dispatch({
                    type: "NEXT",
                    check: check
                });
                console.log("????????? ??????");
            } else {
                // ???????????? ?????? 
                dispatch({
                    type: "REGISTER",
                    check: check
                });
                console.log("??????????????????");
            }
        }).catch((err) => {
            console.log(err);
        });
        setLoading(false);
    }
    // ???????????? ??????, 8?????? ??????, ??????????????? ???????????? ????????? ????????? ??????
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
                check: check
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
                    check: check,
                });
                dispatch({
                    type: "CHECK",
                    name: res.data.name,
                    isSubmit: res.data.apply
                });
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
            check: check,
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
        await axios.get("https://ivis.dev/api/interview", {
            //not params
        })
        .then((res) => {
            console.log("res => ", res);
            console.log("res.data.result.check => ", res.data.result.check);
            console.log("res.data.result => ", res.data.result);
            if (res.data.result.check === true) {
                console.log("1");
                dispatch({ type: 'RESULT' });
                setValues({
                    ...values,
                    day: res.data.result.day,
                    time: res.data.result.time,
                }); 
            } else {
                console.log("2");
                dispatch({ type: 'INTERVIEW' });
                setDays({
                    ...days,
                    sat: res.data.result.sat,
                    sun: res.data.result.sun
                });
            }
        })
        .catch((err) => {
            console.log(err);
        });
        console.log("3");
    }
    const onSendLogoutHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axios.get("https://ivis.dev/api/user/logout", {
            //not params
        })
        .then((res) => {
            console.log("???????????? ??????");
        })
        .catch((err) => {
            console.log("????????????", err);
        });
        setLoading(false);
        dispatch({ type: 'CLEAR' });
    }
    const InterviewHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axios.post("https://ivis.dev/api/interview", {
            day: values.day,
            time: values.time,
        },{ withCredentials: true })
        .then((res) => {
            console.log(res);
            if (res.data.result === true) {
                dispatch({ type: 'NEXT' });
                console.log("????????? ?????? ??????");
            } else {
                dispatch({ type: 'INTERVIEW'});
                console.log("????????? ?????? ??????");
                alert("???????????? ??????! ?????? ??????????????????");
            }
        })
        .catch((err) => {
            dispatch({ type: 'ERROR' });
        });
        setLoading(false);
    }
    // ?????? dispatch ??????
    const continueEnterHandler = async (e) => {
        if (e.key === "Enter") {
            if (check === 1) {
                sidCheckHandler();
            } else if (check === 2 || check === 10) {
                pwCheckHandler();
            } else {
                dispatch({
                    type: "NEXT",
                    check: check,
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
                check: check,
            });
        }
    };
    const onMyHomeMove = (e) => {
        e.preventDefault();
        dispatch({ type: 'GOHOME' });
    }

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
    const onContinueSelect = (d) => {
        console.log(d);
        setValues({
            ...values,
            day: d
        });
        dispatch({ type: 'NEXT' });
    }

    const onSelectDaysHandler = (t) => {
        console.log(t);
        setValues({
            ...values,
            time: t
        });
        dispatch({ type: 'NEXT' });
    }

    //???????????? ?????? ?????????
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
                        <Text>2023??? IVIS ??????????????? ???????????????.</Text>
                        <Text>??????????????? ?????? ??????, ????????????, ????????? ???????????????. ???????????????????</Text>
                        <Text>????????? ?????? ??????????????? YES??? ???????????????.</Text>
                        <ButtonBox>
                            <Button className="row" onClick={continueHandler}>YES</Button>
                            <Button className="row" onClick={onClearHandler}>NO</Button>
                        </ButtonBox>
                    </>
                )}
                {check >= 1 && (
                    <>
                        {/* db??? ????????? ??????????????? dispatch{LOGIN}, ????????? ???????????? ???????????? dispatch{NEXT} */}
                        {check === 1 && (
                        <InputBox>
                            <Input
                                type="number"
                                name="studentNumber"
                                value={values.studentNumber}
                                onChange={onChange}
                                onKeyPress={continueEnterHandler}
                                autoFocus placeholder="??????"
                                maxLength={10} />
                            <ContinueButton
                                value={values.studentNumber}
                                onClick={continueHandler}>
                                    <FontAwesomeIcon icon={faArrowRight} />
                            </ContinueButton>
                            <Label>??????</Label>
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
                                autoFocus placeholder="????????????"
                                maxLength={15}
                                error={values.cite} />
                            <ContinueButton
                                value={values.password}
                                onClick={continueHandler}>
                                    <FontAwesomeIcon icon={faArrowRight} />
                            </ContinueButton>
                            <Label error={values.cite}>{values.cite === false 
                                ? "????????????"
                                : "?????? ?????????????????????."
                            }</Label>
                        </InputBox>
                        )}

                        {/* MyHome */}
                        {check === 3 && (
                            <>
                                <Text>MyHome : {name} {isSubmit === true ? "[?????? ??????]" : "[?????????]"}</Text>
                                {isSubmit === true ? null : <Button className="col" onClick={continueHandler}>????????????</Button>}
                                {isSubmit === true ? <Button className="col" onClick={onResultCheckHandler}>?????? ?????? ?????? / ??????</Button> : null}
                                <Button className="col" onClick={onCloseHandler}>?????????</Button>
                                <Button className="col" onClick={onSendLogoutHandler}>????????????</Button>
                            </>
                        )}

                        {/* ???????????? */}
                        {check === 4 && (
                            <>
                                <Text>???????????? ??? ????????? ?????? ????????????, ?????? ????????? ?????? ??????????????????.</Text>
                                <Text>???????????? - ?????? ?????? ??????????????? ?????? - ???????????? ?????? - ?????? ??????, ?????? ?????? ????????? ???????????????.</Text>
                                <ButtonBox>
                                    <Button className="row" onClick={onPrevHandler}>CLOSE</Button>
                                    <Button className="row" onClick={continueHandler}>NEXT</Button>
                                </ButtonBox>
                                
                            </>
                        )}
                        {check === 5 && (
                            <>
                                <Text>1. ????????????</Text>
                                <InputBox>
                                    <TextareaAutosize
                                    name="q1"
                                    className="text-area"
                                    minRows={3}
                                    maxRows={10}
                                    placeholder="??????, ????????? ?????? ?????? ??? ????????? ?????? ??????"
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
                                <Text>2. ?????? ?????? ??????????????? ??????</Text>
                                <Text>???????????? ???????????? ???,???,?????? ????????? ????????? ?????? ??????</Text>
                                <Text>????????? "??????" ?????? ??????</Text>
                                <InputBox>
                                    <TextareaAutosize
                                    name="q2"
                                    className="text-area"
                                    minRows={2}
                                    maxRows={5}
                                    placeholder="C??????(???),C++(???),JAVA(???)"
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
                                <Text>3. ???????????? ??????</Text>
                                <Text>????????? "??????" ?????? ??????</Text>
                                <InputBox>
                                    <TextareaAutosize
                                    name="q3"
                                    className="text-area"
                                    minRows={2}
                                    maxRows={5}
                                    placeholder="?????? ???????????? ??????, ????????????????????? ????????? IoT ????????????, ???????????? ????????? ?????? ?????? ???"
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
                                <Text>4. ?????? ??????, ?????? ??????</Text>
                                <Text>?????? ????????? ?????? ???????????? ????????? ??????????????? ???????????????.</Text>
                                <InputBox>
                                    <TextareaAutosize
                                    name="q4"
                                    className="text-area"
                                    minRows={4}
                                    maxRows={6}
                                    placeholder="?????? ???????????? ????????? ?????? ????????? ?????????, ?????? ?????? ?????? ?????? ???????????? ??????????????? ????????????."
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
                                <Text>????????? ????????? ?????????????????????.</Text>
                                <Text>???????????? ????????? ?????????????????? ????????? ??????????????????.</Text>
                                <Text>??????, ??????????????? ?????? ???????????? ?????? MyHome?????? ???????????? ??? ????????????.</Text>
                                <ButtonBox>
                                    <Button className="row" onClick={onPrevHandler}>PREV</Button>
                                    <Button className="row" onClick={onSendFormHandler}>SEND</Button>
                                </ButtonBox>
                            </>
                        )}

                        {/* ???????????? ???????????? */}
                        {check === 10 && (
                            <InputBox>
                            <Input
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={onChange} 
                                onKeyPress={continueEnterHandler}
                                autoFocus placeholder="????????????(?????? 15)"
                                maxLength={15}
                                error={values.cite} />
                            <ContinueButton
                                value={values.password}
                                onClick={continueHandler}>
                                    <FontAwesomeIcon icon={faArrowRight} />
                            </ContinueButton>
                            <Label error={values.cite}>{values.cite === false 
                                ? "????????????(?????? 8, ?????? 15)"
                                : "???????????? ?????? ???????????????."
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
                                autoFocus placeholder="??????"
                                maxLength={4} />
                            <ContinueButton
                                value={values.name}
                                onClick={continueHandler}>
                                    <FontAwesomeIcon icon={faArrowRight} />
                            </ContinueButton>
                            <Label>??????</Label>
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
                                autoFocus placeholder="????????????(- ??????)" 
                                maxLength={12}/>
                            <ContinueButton
                                value={values.phone} 
                                onClick={continueHandler}>
                                    <FontAwesomeIcon icon={faArrowRight} />
                            </ContinueButton>
                            <Label>????????????(- ??????)</Label>
                        </InputBox>
                        )}
                        {check === 13 && (
                        <>
                            <Text>???????????? ????????? ????????? ??????????????????.</Text>
                            <Text>??????: {values.name}</Text>
                            <Text>????????????: {values.phone}</Text>
                            <Text>??????: {values.studentNumber}</Text>
                            <Text onMouseOver={handleCheckPasswordOver} onMouseLeave={handleCheckPasswordLeave}>????????????(??????): {passwordCheck ? values.password : values.password.replace(/./g, "*")}</Text>
                            <ButtonBox>
                                <Button className="row" onClick={onClearHandler}>NO</Button>
                                <Button className="row" onClick={onSubmitHandler}>YES</Button>
                            </ButtonBox>
                        </>
                        )}
                        {check === 14 && (
                            <>
                                <Text>??????????????? ?????????????????????.</Text>
                                <Text>?????? ??????????????? ???????????? ??????????????????!</Text>
                                <Button className="col" onClick={onClearHandler}>CLSOE</Button>
                            </>
                        )}
                        {check === 15 && (
                            <>
                                <Text>?????? ????????? 3??? 11??? ?????? 12?????? ????????? ????????? ?????? ????????? ??????, ?????? ????????? ?????? ??? ??????????????????.</Text>
                                <ButtonBox>
                                <Button className="row" onClick={() => onContinueSelect("sat")}>3/11(???)</Button>
                                <Button className="row" onClick={() => onContinueSelect("sun")}>3/12(???)</Button>
                                </ButtonBox>

                                <Text>?????? ????????? ?????? ???????????? ??????, ?????? ??????????????? ??????????????????.</Text>
                                <Text>kakao : 010-8353-2755</Text>
                                <Button className="col" onClick={onMyHomeMove}>PREV</Button>
                            </>
                        )}
                        {check === 16 && (
                            <>
                                {values.day === "sat" &&
                                <>
                                <Text>3??? 11??? ????????? (?????? / ?????? ??????)</Text>
                                <div className="grid-box">
                                    {days.sat.map((index) => (
                                        index.reserved === false 
                                        ? <button onClick={() => onSelectDaysHandler(index.time)}><p>{index.time}</p></button>
                                        : null
                                    ))}
                                </div>
                                </>
                                }

                                {values.day === "sun" && (
                                    <>
                                    <Text>3??? 12??? ????????? (?????? / ?????? ??????)</Text>
                                    <div className="grid-box">
                                        {days.sun.map((index) => (
                                             index.reserved === false 
                                            ? <button onClick={() => onSelectDaysHandler(index.time)}><p>{index.time}</p></button>
                                            : null
                                        ))}
                                    </div>
                                </>
                                )}
                                <Button className="col" onClick={onPrevHandler}>PREV</Button>
                            </>
                        )}
                        {check === 17 && (
                            <>
                                <Text>????????? ????????? ????????? ????????? ??????????????????. ????????? ????????? ????????? ????????? ??????????????????.</Text>
                                <Text>??????: {values.name}</Text>
                                <Text>????????????: {values.day === "sat" ? "3/11 ?????????" : "3/12 ?????????"}</Text>
                                <Text>????????????: {values.time}</Text>
                                <ButtonBox>
                                    <Button className="row" onClick={onPrevHandler}>PREV</Button>
                                    <Button className="row" onClick={InterviewHandler}>SEND</Button>
                                </ButtonBox>
                            </>
                        )}
                        {check === 18 && (
                            <>
                                <Text>?????? ????????? ?????????????????????.</Text>
                                <Text>?????? ????????? ????????? ?????? ????????? ??????, ????????? ????????? ?????? ???????????? ?????? ??????????????????.</Text>
                                <Text>?????? ??????: {values.day === "sat" ? "3/11 ?????????" : "3/12 ?????????"}</Text>
                                <Text>?????? ??????: {values.time}</Text>
                                <Button className="col" onClick={onCloseHandler}>CLOSE</Button>
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
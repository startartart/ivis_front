import React, { useState } from "react";
import Dice from "../DiceGame-components/Dice";
import GameBoard from "../DiceGame-components/GameBoard";
import styled from "styled-components";
import "../DiceGame-components/GameButton.css"

const myGround = Array(100).fill(0);

const randomMoveArray = [
    { id: 1, name: "왼쪽 1", value: 1 },
    { id: 2, name: "왼쪽 2", value: 2 },    
    { id: 3, name: "왼쪽 3", value: 3 },
    { id: 4, name: "오른쪽 1", value: 4 },
    { id: 5, name: "오른쪽 2", value: 5 },
    { id: 6, name: "오른쪽 3", value: 6 },
    { id: 7, name: "위쪽 1", value: 7 },
    { id: 8, name: "위쪽 2", value: 8 },
    { id: 9, name: "위쪽 3", value: 9 },
    { id: 10, name: "아래쪽 1", value: 10 },
    { id: 11, name: "아래쪽 2", value: 11 },
    { id: 12, name: "아래쪽 3", value: 12 }
]

const currentSaveArray = [
    { id: 1, name: "왼쪽 1", value: 1 },
    { id: 2, name: "왼쪽 2", value: 2 },
    { id: 3, name: "왼쪽 3", value: 3 },
    { id: 4, name: "오른쪽 1", value: 4 },
    { id: 5, name: "오른쪽 2", value: 5 },
    { id: 6, name: "오른쪽 3", value: 6 },
]

const UserInterFace = styled.div`
    position: relative;
    width: 200px;
    height: 200px;
    margin: 0 auto;
    padding: 2rem;
    background-color: #fff;
    text-align: center;
`;

const Guest = () => {
    const [dice, setDice] = useState(0);
    const [waiting, setWaiting] = useState(false);
    const [current, setCurrent] = useState(currentSaveArray);
    const [ground, setGround] = useState(myGround);
    const [going, setGoing] = useState(false);
    const [original, setOriginal] = useState(0);

    const RollDice = () => {
        const scale = Math.floor(Math.random() * 6) + 1
        setDice(scale);
        setOriginal(scale);
        setWaiting(!waiting);

        Paddle();
    };

    const DecreasedAction = () => {
        setDice(dice - 1);
    };

    const Paddle = () => {
        // currentSaveArray 에서 랜덤으로 뽑은 값을 current 배열에 넣고 current 제일 왼쪽 값 제거
        const randomMove = randomMoveArray[Math.floor(Math.random() * randomMoveArray.length)];
        setCurrent(current.concat(randomMove).slice(1));

        // current 배열에 값이 6개 이상이면 current 배열 제일 왼쪽 값 제거
        if (current.length >= 7) {
            setCurrent(current.slice(1));
        }
    };

    const GoBlcok = () => {
        setDice(dice - 1);
        Paddle();
        setGoing(true);
    };

    const groundSetHandler = (id) => {
        const newGround = [...ground];
        newGround[id] = 1;
        setGround(newGround);
    }

    return (
        <>
            <GameBoard diceValue={dice} current={current} ground={ground} DecreasedAction={DecreasedAction} going={going} groundSet={groundSetHandler}>

            </GameBoard>
            <UserInterFace>
                <Dice value={original} />
                {waiting ? 
                <button className="game-button stop" onClick={RollDice}>Waitting</button> :
                <button className="game-button" onClick={RollDice}>Roll Dice</button>}
                {dice ?
                <button className="game-button" onClick={GoBlcok}>Go</button> : null}
            </UserInterFace>
        </>
    );
    };

export default Guest;
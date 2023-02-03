import React, { useState } from "react";
import styled from "styled-components";

const BoradBlock = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #fff;
    text-align: center;

    &:hover {
        //very bright color 
        background-color: #f11f11;
    }

    ${props => props.going && `
        animation: going 1s linear;

        @keyframes going {
            0% {
                left: 0;
            }
            100% {
                left: -30px;
            }
        }
    `}
`;

const GameBoardFragment = styled.div`
    position: relative;
    width: 300px;
    height: 300px;
    margin: 2rem auto;
    background-color: #fff;
    text-align: center;

    display: grid;
    grid-template-areas:
		// 10 x 10
        "1 1 1 1 1 1 1 1 1 1"
        "1 1 1 1 1 1 1 1 1 1"
        "1 1 1 1 1 1 1 1 1 1"
        "1 1 1 1 1 1 1 1 1 1"
        "1 1 1 1 1 1 1 1 1 1"
        "1 1 1 1 1 1 1 1 1 1"
        "1 1 1 1 1 1 1 1 1 1"
        "1 1 1 1 1 1 1 1 1 1"
        "1 1 1 1 1 1 1 1 1 1"
        "1 1 1 1 1 1 1 1 1 1";

    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(10, 1fr);

    //grid border lines
    & > ${BoradBlock} {
        border: 1px solid #000;
    }
`;

const MoveBlock = styled.div`
    background-color: #fff;
    text-align: center;

    ${props => props.id === 0 && `
        background-color: #f11f11;
    `}
`;

const MoveGroundFragment = styled.div`
    position: relative;
    width: 360px;
    height: 50px;
    background-color: #fff;
    text-align: center;
    margin: 1rem auto;

    display: grid;
    grid-template-areas:
        "1 1 1 1 1 1";
    grid-template-columns: repeat(6, 1fr);

    & > ${MoveBlock} {
        border: 1px solid #000;
    }
`;

const GameBoard = (props) => {
    const [ground, setGround] = useState(props.ground);

    const ActiveBlock = (e) => {
        if (props.diceValue > 0) {
            let copy = [...ground];
            copy[e.target.id] = 1;
            setGround(copy);

            e.target.style.backgroundColor = "#f11f11";
            props.groundSet(e.target.id);
            props.DecreasedAction();

        }
    }

    console.log(ground)

    return (
        <>
            <GameBoardFragment>
                {props.ground.map((el, index) => (
                    ground[index] && props.going ? <BoradBlock id={index} going={true}/> :
                    <BoradBlock id={index} onClick={ActiveBlock}/>
                ))}
            </GameBoardFragment>
            <MoveGroundFragment>
                {props.current.map((el, index) => (
                    <MoveBlock id={index}>
                        {el.name}
                    </MoveBlock>
                ))}
            </MoveGroundFragment>
            <h1>남은 횟수: {props.diceValue}</h1>
        </>

    );
}

export default GameBoard;
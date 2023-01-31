import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
`;

const ButtonBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;  
const Button = styled.button`
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
`;

const MainForm = () => {
    return (
        <div>
            <Content>
                <h1>IVIS</h1>
            </Content>
            <ButtonBox>
                <Button>Sign Up</Button>
                <Button>Login</Button>
                <Button>Guest</Button>
            </ButtonBox>
        </div>
    );
    };

export default MainForm;
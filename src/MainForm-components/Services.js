import React from 'react';
import styled from 'styled-components';

const ServicesFragment = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #fff;
    border: 1px solid #000;
    // font align center
    text-align: center;
`;

const ServicesBox = styled.div`
    //child elements are row of the Frame
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #fff;
    border: 1px solid #000;
`;

const Services = () => {
    return (
        <ServicesFragment>
            <h1>Services</h1>
            <h1>Services</h1>
            <ServicesBox>
                <h2>NAS</h2>
                <h2>WIKI</h2>
                <h2>EMAIL</h2>
            </ServicesBox>
            <h1>Services</h1>
        </ServicesFragment>
    );
    }
export default Services;
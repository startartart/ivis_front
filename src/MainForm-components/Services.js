import React, {useState} from 'react';
import styled from 'styled-components';
import SignUpForm from '../share-components/SignUpForm';

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
    const [show, setShow] = useState(false);
    const [gomain, setGomain] = useState(false);
    const [coord, setCoord] = useState(0);

    const take = async () => {
        setShow(!show);
    }

    const Show = (e) => {
        setShow(!show);
        setCoord(e.clientY);
    }
    return (
        <>
            <ServicesFragment>
                <h1>Services</h1>
                <h1>Services</h1>
                <ServicesBox>
                    <h2>NAS</h2>
                    <h2>WIKI</h2>
                    <h2 onClick={Show}>신청</h2>
                </ServicesBox>
                <h1>Services</h1>
            </ServicesFragment>
            {show ?<SignUpForm control={coord} take={take} /> : null}
        </>
    );
    }
export default Services;
import {React} from 'react';
import styled from 'styled-components';

const HeaderFrame = styled.div`
    height: 100%;
    margin: 1rem;
`;

const HeaderContainer = styled.div`
    height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	color: #9b9b9b;
`;

const HeaderBar = styled.div`
    position: relative;
	width: 50%;
	min-width: 300px;
	height: 50px;
	border: 10px solid transparent;
	box-shadow: 4px 4px 5px rgba(53, 214, 237, 0.3) inset;
    
`;

const HeaderLogo = styled.img`
    margin: 0.6rem;
`;

const SliderNavMenu = styled.ul`
    position: absolute;
	top: 0;
	right: 0;
	display: flex;
	list-style-type: none;
	margin: 0;
	padding: 0;
`;

const SliderNavItem = styled.li`
    display: inline-flex;
	padding: 0.6rem;
    margin: 0.4rem;
	color: #9b9b9b;
	cursor: pointer;
	transition: 0.3s linear all;

    &:hover {
        color: #35D6ED;
	    box-shadow: 0 50px 5px rgba(0, 0, 0, 0.15) inset;
    }
`;

const Header = () => {
    return (
        <HeaderFrame>
            <HeaderContainer>
                <HeaderBar>
                    <HeaderLogo src="images/ivis-logo36.png" alt="logo" />
                    <SliderNavMenu>
                        <SliderNavItem>Home</SliderNavItem>
                        <SliderNavItem>About</SliderNavItem>
                        <SliderNavItem>Services</SliderNavItem>
                    </SliderNavMenu>

                </HeaderBar>
            </HeaderContainer>
        </HeaderFrame>

    );
}

export default Header;
import {React, useState} from 'react';
import MainNavBar from './MainNavBar';
//react-icons
import {FaBars} from 'react-icons/fa';
import './Header.css';

const Header = () => {
    const [show, setShow] = useState(false);

    const showNav = () => {
        setShow(!show);
    }

    return (
        <>
        <div className="Header">
            <p>IVIS</p>
            <i className="fas fa-bars">
                <FaBars onClick={showNav} />
            </i> 
        </div>
        {show ? (
            <MainNavBar showNav={showNav} />
        ) : null}
        </>
    );
}

export default Header;
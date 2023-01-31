import React from 'react';
import './MainNavBar.css';

const MainNavBar = ({showNav}) => {

    showNav = () => {
        showNav();
    }

    return (
        <div className="MainNavBar">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/signup">Sign Up</a></li>
                <li><a href="/login">Login</a></li>
                <li><a href="/guest">Guest</a></li>
            </ul>
        </div>
    );
    }

export default MainNavBar;
import React from 'react';
import './Footer.scss';


const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-fragment">
                <ul className="footer-list">
                    <li className="footer-item">
                        <a className="footer-link" href="https://github.com/startartart/ivis_front">GITHUB</a></li>
                    <li className="footer-item">
                        <a className="footer-link" href="/">ROOT</a></li>
                    <li className="footer-item">
                        <a className="footer-link" href="http://ivis.kr/index.php/%EB%8C%80%EB%AC%B8">WIKI</a></li>
                    <li className="footer-item">
                        <a className="footer-link" href="https://ivislab.notion.site/2023-IVIS-376d38344a364ce1bed6be52896eb739">NOTION</a></li>
        
                </ul>
            </div>
        </div>
    );
}

export default Footer;
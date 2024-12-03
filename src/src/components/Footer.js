import React from 'react';
import './Footer.css';

function Footer() {
    return ( <
        footer className = "footer" >
        <
        div className = "top-footer" >
        <
        div className = "footer-section" >
        <
        h3 > About Us < /h3> <
        p > We provide guidance
        for your career goals with expert advice and resources. < /p> < /
        div > <
        div className = "footer-section" >
        <
        h3 > Quick Links < /h3> <
        ul >
        <
        li > < a href = "/about" > About < /a></li >
        <
        li > < a href = "/contact" > Contact < /a></li >
        <
        li > < a href = "/services" > Services < /a></li >
        <
        li > < a href = "/portfolio" > Portfolio < /a></li >
        <
        /ul> < /
        div > <
        div className = "footer-section" >
        <
        h3 > Contact < /h3> <
        p > Email: info @career.com < /p> <
        p > Phone: +123 - 456 - 7890 < /p> < /
        div > <
        /div> <
        div className = "footer-bottom" >
        <
        p > ©2024 Career Guidance.All rights reserved. < /p> < /
        div > <
        /footer>
    );
}

export default Footer;
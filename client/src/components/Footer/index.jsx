import React, { useState, useEffect } from 'react';
import '../../styles/Footer.css';

const Footer = () => {
    const words = ['surfers', 'adventurers', 'explorers', 'travelers', 'thrill-seekers'];
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 4000); 

        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="w-100 mt-auto bg-secondary p-4 footer">
            <div className="container text-center mb-5">
                <h4 className="footer-text">
                    Made by{' '}
                    <span className="footer-word">{words[currentWordIndex]}</span>
                </h4>
            </div>
        </footer>
    );
};

export default Footer;




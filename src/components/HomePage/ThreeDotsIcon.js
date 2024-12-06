import React, { useState } from "react";
import "./ThreeDotsIcon.css";

function ThreeDotsIcon() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="three-dots-container" onClick={toggleMenu}>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            {isOpen && (
                <div className="menu">
                    <p>Option 1</p>
                    <p>Option 2</p>
                    <p>Option 3</p>
                </div>
            )}
        </div>
    );
}

export default ThreeDotsIcon;

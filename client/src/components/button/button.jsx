// button.jsx
import React from "react";
import style from './button.module.css';

const CustomButton = ({ content, onClick }) => {
    return (
        <button className={style.customButton} onClick={onClick}>
            {content}
        </button>
    );
};

export default CustomButton;

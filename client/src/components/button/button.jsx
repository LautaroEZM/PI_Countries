import React from "react";
import style from './button.module.css';

const CustomButton = ({ content, onClick, icon }) => {
  return (
    <button className={style.customButton} onClick={onClick}>
      {icon ? (
        <img src={icon} alt={content} />
      ) : (
        content // Muestra el texto si no hay icono
      )}
    </button>
  );
};

export default CustomButton;

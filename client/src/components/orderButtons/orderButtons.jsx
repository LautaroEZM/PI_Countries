// orderButtons.jsx
import React from "react";
import CustomButton from "../button/button";
import styles from "./orderButtons.module.css";

const OrderButtons = () => {
  const handleButtonClick = (orderType) => {
    console.log(`Tipo de orden: ${orderType}`);
    // Puedes realizar acciones adicionales aquí
  };

  return (
    <div className={styles.orderButtonsContainer}>
      <CustomButton buttonText="Ordenar Ascendente" onClick={() => handleButtonClick("ascendente")} />
      <CustomButton buttonText="Ordenar Descendente" onClick={() => handleButtonClick("descendente")} />
    </div>
  );
};

export default OrderButtons;

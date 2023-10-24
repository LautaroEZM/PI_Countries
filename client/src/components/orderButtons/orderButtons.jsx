import React, { useState } from "react";
import { useAppDispatch } from "../../redux-hooks";
import CustomButton from "../button/button";
import styles from "./orderButtons.module.css";
import { sortCountries } from "../../store/actions";
import up from "../../img/up.png"
import down from "../../img/down.png"
import pop from "../../img/population.png"
import arrow from "../../img/arrow.png"

const OrderButtons = () => {
  const [sortName, setSortName] = useState("asc");
  const [sortPopulation, setSortPopulation] = useState("asc");

  const dispatch = useAppDispatch();

  const handleSort = (sortType) => {
    if (sortType === 'name') {
      const sort = sortName === "asc" ? "desc" : "asc"
      setSortName(sort);
      dispatch(sortCountries(sortType, sort));
    } else if (sortType === 'population') {
      const sort = sortPopulation === "asc" ? "desc" : "asc"
      setSortPopulation(sort);
      dispatch(sortCountries(sortType, sort));
    }
  };

  return (
    <div className={styles.orderButtonsContainer}>
      <CustomButton
        content="name"
        buttonText="Ordenar por nombre"
        onClick={() => handleSort("name")}
        icon={sortName === "asc" ? up : down}
      />
      
      <CustomButton
        content="population"
        buttonText="Ordenar por población"
        onClick={() => handleSort("population")}
        icon={pop}
      />
    </div>
  );
};

export default OrderButtons;

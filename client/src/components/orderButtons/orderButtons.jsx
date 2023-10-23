import React, { useState }  from "react";
import { useAppDispatch } from "../../redux-hooks";
import CustomButton from "../button/button";
import styles from "./orderButtons.module.css";
import { sortCountries } from "../../store/actions";

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
      <CustomButton content="name" buttonText="Ordenar por nombre" onClick={() => handleSort("name")} />
      <CustomButton content="population" buttonText="Ordenar por poblacion" onClick={() => handleSort("population")} />
    </div>
  );
};

export default OrderButtons;

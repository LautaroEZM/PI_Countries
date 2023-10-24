import React, { useState } from "react";
import { useAppDispatch } from "../../redux-hooks";
import CustomButton from "../button/button";
import styles from "./searchBar.module.css";
import searchIcon from '../../img/lupa.png';
import { setCurrentPage, getCountriesByName } from "../../store/actions";

const SearchBar = ({ onClearClick }) => { // Añade una prop 'onClearClick'
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState(""); 

  const handleSearch = (event) => {
    const newValue = event.target.value;
    setSearchValue(newValue);
    dispatch(getCountriesByName(newValue));
    dispatch(setCurrentPage(1));
  };

  const handleClearClick = () => {
    setSearchValue("");
    onClearClick(); // Llama a la función de devolución de llamada para limpiar en List
  };

  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.searchBar}>
        <input
          className={styles.textArea}
          placeholder={"Select a country..."}
          type="search"
          value={searchValue}
          onChange={handleSearch}
        />
        <CustomButton
          content={"x"}
          onClick={handleClearClick}
        />
      </div>
    </div>
  );
};

export default SearchBar;

import React from "react";
import { useAppDispatch } from "../../redux-hooks";
import CustomButton from "../button/button";
import styles from "./searchBar.module.css";
import searchIcon from '../../img/lupa.png';
import { setCurrentPage, getCountriesByName } from "../../store/actions";


const SearchBar = () => {
  const dispatch = useAppDispatch();


  const handleSearch = (event) => {
    dispatch(getCountriesByName(event.target.value));
    dispatch(setCurrentPage(1));
  };


  const handleButtonClick = () => {
    console.log("Botón de búsqueda clickeado");
  };

  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.searchBar}>
        <input
          className={styles.textArea}
          placeholder={"Select a country..."}
          type="search"
          onChange={handleSearch}
        />
        <CustomButton
          content={<img src={searchIcon} alt="Search" style={{ width: "20px", height: "20px" }} />}
          onClick={handleButtonClick}
        />
      </div>
    </div>
  );
};

export default SearchBar;

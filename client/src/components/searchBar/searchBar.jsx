import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux-hooks";
import CustomButton from "../button/button";
import styles from "./searchBar.module.css";
import searchIcon from '../../img/lupa.png';
import { setFilteredCountries, setCurrentPage } from "../../store/actions";


const SearchBar = () => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector((state) => state.countries);
  

  const handleSearch = (event) => {
    const matches = countries.filter(country => country.name.toLowerCase().includes(event.target.value.toLowerCase()))
    dispatch(setFilteredCountries(matches));
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

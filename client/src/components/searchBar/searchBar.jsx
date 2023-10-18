// searchBar.jsx
import React from "react";
import CustomButton from "../button/button";
import styles from "./searchBar.module.css";
import searchIcon from '../../img/lupa.png';

const SearchBar = () => {
  const handleSearch = (event) => {
    console.log("Texto de búsqueda:", event.target.value);
  };

  const handleButtonClick = () => {
    console.log("Botón de búsqueda clickeado");
  };

  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.searchBar}>
        <input
          className={styles.textArea}
          placeholder={"Ingresa el país que desea buscar..."}
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

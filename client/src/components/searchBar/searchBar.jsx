import React, { useState } from "react";
import { useAppDispatch } from "../../redux-hooks";
import CustomButton from "../button/button";
import styles from "./searchBar.module.css";
import { setCurrentPage, getCountriesByName } from "../../store/actions";

const SearchBar = ({ onClearClick }) => { 
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState(""); 

  // Manejar la búsqueda al escribir en el campo de búsqueda
  const handleSearch = (event) => {
    const newValue = event.target.value;
    setSearchValue(newValue);
    // Disparar la acción para obtener países por nombre
    dispatch(getCountriesByName(newValue));
    // Restablecer la página actual a la primera página
    dispatch(setCurrentPage(1));
  };

  // Manejar el clic en el botón de limpiar
  const handleClearClick = () => {
    setSearchValue("");
    // Llamar a la función proporcionada para limpiar los resultados de búsqueda
    onClearClick(); 
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

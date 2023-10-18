import React from "react";
import button from "./"

const searchBar = () => {
  const handleSearch = (event) => {
    // Aquí puedes manejar la lógica de búsqueda
    console.log("Texto de búsqueda:", event.target.value);
  };

  const handleButtonClick = () => {
    // Aquí puedes manejar la acción del botón de búsqueda
    console.log("Botón de búsqueda clickeado");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar..."
        onChange={handleSearch}
      />
      <button onClick={handleButtonClick}>Buscar</button>
    </div>
  );
};

export default searchBar;
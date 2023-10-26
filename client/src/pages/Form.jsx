import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux-hooks";
import { Link, useNavigate } from "react-router-dom";
import style from "./Form.module.css";
import { addActivity, setCurrentPage, getCountries } from "../store/actions";
import CustomButton from "../components/button/button";

function AddActivity() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Estados para el manejo de errores y validación del formulario
  const [nameError, setNameError] = useState(true);
  const [durationError, setDurationError] = useState(true);
  const [countryError, setCountryError] = useState(true);
  const [seasonsError, setSeasonsError] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  // Estado para almacenar los países seleccionados
  const [selectedCountries, setSelectedCountries] = useState([]);

  // Obtener la lista de países desde el estado global
  const countries = useAppSelector((state) => state.countries);

  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    name: "",
    difficulty: "1",
    duration: "",
    seasons: [],
    countries: [],
  });

  // Efecto secundario para obtener la lista de países al cargar el componente
  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  // Efecto secundario para validar el formulario
  useEffect(() => {
    if (
      !nameError &&
      !durationError &&
      formData.seasons.length &&
      formData.countries.length
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [formData, nameError, durationError]);

  // Función para manejar la selección de un país en el formulario
  const handleCountrySelect = (event) => {
    if (event.target.value === "-1") return;

    // Verificar si el país ya está en la lista de países seleccionados
    const exists = formData.countries.includes(event.target.value);

    if (!exists) {
      // Agregar el país a la lista de países seleccionados
      setFormData({
        ...formData,
        countries: [...formData.countries, event.target.value],
      });
      setSelectedCountries([...selectedCountries, event.target.value]);
      setCountryError(false);
    } else {
      // Eliminar el país de la lista de países seleccionados
      setFormData({
        ...formData,
        countries: formData.countries.filter(
          (country) => country !== event.target.value
        ),
      });
      setSelectedCountries(
        selectedCountries.filter((country) => country !== event.target.value)
      );
    }
  };

  // Función para manejar la selección o deselección de temporadas
  const handleSeasonSelect = (season) => {
    const seasons = formData.seasons.slice(); // Clonar el arreglo de temporadas

    if (seasons.includes(season)) {
      // Deseleccionar la temporada
      const index = seasons.indexOf(season);
      seasons.splice(index, 1);
    } else {
      // Seleccionar la temporada
      seasons.push(season);
    }

    setFormData({
      ...formData,
      seasons: seasons,
    });

    // Verificar si al menos hay una temporada seleccionada
    if (seasons.length === 0) {
      setSeasonsError(true); // Mostrar el error si no hay temporadas seleccionadas
    } else {
      setSeasonsError(false);
    }
  };

  // Función para eliminar un país de la lista de países seleccionados
  const handleRemoveSelectedCountry = (country) => {
    // Filtrar los países seleccionados para eliminar el país clicado
    const updatedSelectedCountries = selectedCountries.filter(
      (c) => c !== country
    );

    setSelectedCountries(updatedSelectedCountries);

    // Actualizar el formulario con los países seleccionados actualizados
    setFormData({
      ...formData,
      countries: updatedSelectedCountries,
    });

    // Verificar si al menos hay un país seleccionado
    if (updatedSelectedCountries.length === 0) {
      setCountryError(true);
    } else {
      setCountryError(false);
    }

    // Actualizar el estado del formulario
    setIsFormValid(
      !nameError &&
        !durationError &&
        formData.seasons.length &&
        updatedSelectedCountries.length
    );
  };

  // Opciones predeterminadas de temporadas
  const seasonsDefault = ["summer", "autumn", "winter", "spring"];

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid) {
      dispatch(addActivity(formData));
      dispatch(setCurrentPage(1));
      navigate("/list");
    }
  };

  // Función para manejar cambios en los campos del formulario y validarlos
  const handleChange = (type, value) => {
    if (type === "name") {
      const textRegex = /^[A-Za-z ]*$/;
      setNameError(!textRegex.test(value));
    } else if (type === "duration") {
      const textRegex = /^\d*$/;
      setDurationError(!textRegex.test(value));
    } else if (type === "country") {
      setCountryError(value === "-1");
    } else if (type === "seasons") {
      setSeasonsError(value === "-1");
    }

    if (type !== "seasons") {
      setFormData({ ...formData, [type]: value });
    }
  };

  return (
    <div className={style.container}>
      <h2 className={style.textName}>Add Activity</h2>
      <div className={style.leftContainer}>
        <form onSubmit={handleSubmit}>
          <div className={style.textStatus}>
            <label>Name:</label>
            <input
              className={style.searchCamp}
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
            {nameError && (
              <span className={style.errorSpan}>Invalid value.</span>
            )}
          </div>

          <div className={style.textStatus}>
            <label>Difficulty:</label>
            <select
              className={style.searchCamp}
              name="difficulty"
              value={formData.difficulty}
              onChange={(e) =>
                handleChange("difficulty", e.target.value)
              }
            >
              {Array.from({ length: 5 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div className={style.textStatus}>
            <label>Duration (in hours):</label>
            <input
              className={style.searchCamp}
              type="text"
              name="duration"
              value={formData.duration}
              onChange={(e) => handleChange("duration", e.target.value)}
              required
            />
            {durationError && (
              <span className={style.errorSpan}>Invalid value.</span>
            )}
          </div>
          <div className={style.textStatus}>
            <label>Seasons:</label>
            <div className={style.selectedCountries}>
              {seasonsDefault.map((season) => (
                <label key={season} className={style.selectedCountryLabel}>
                  <input
                    type="checkbox"
                    id={season} // Agrega un id único para el input
                    checked={formData.seasons.includes(season)}
                    onChange={() => handleSeasonSelect(season)}
                  />
                  {season}
                </label>
              ))}
            </div>
            {seasonsError && (
              <span className={style.errorSpan}>Select at least one.</span>
            )}
          </div>

          <div className={style.textStatus}>
            <label>Country:</label>
            <select
              className={style.searchCamp}
              name="country"
              value={formData.countries}
              onChange={handleCountrySelect}
            >
              <option value="-1">Select a country</option>
              {countries.map((country) => (
                <option key={country.idCode} value={country.idCode}>
                  {country.name}
                </option>
              ))}
            </select>
            {countryError && (
              <span className={style.errorSpan}>Select at least one.</span>
            )}
          </div>
          <div className={style.textStatus}>
            <label>Selected Countries:</label>
            <div className={style.selectedCountries}>
              {selectedCountries.map((selectedCountry) => (
                <div key={selectedCountry} className={style.selectedCountry}>
                  {selectedCountry}{" "}
                  <CustomButton
                    content="X"
                    onClick={() => handleRemoveSelectedCountry(selectedCountry)}
                  ></CustomButton>
                </div>
              ))}
            </div>
          </div>
          <div className={style.rightContainer}>
            <Link to={"/list"}>
              <button className={style.btnSearch}>Back</button>
            </Link>
            <button
              disabled={!isFormValid}
              className={`${style.btnSearch} ${
                !isFormValid && style.disabledButton
              }`}
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddActivity;

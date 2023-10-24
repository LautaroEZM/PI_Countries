import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux-hooks";
import { Link, useNavigate } from "react-router-dom";
import style from "./Form.module.css";
import { addActivity, setCurrentPage, getCountries } from "../store/actions";

function AddActivity() {
  const navigate = useNavigate();
  const [nameError, setNameError] = useState(false);
  const [durationError, setDurationError] = useState(false);
  const [countryError, setCountryError] = useState(true);
  const [seasonsError, setSeasonsError] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    difficulty: "1",
    duration: "",
    seasons: [],
    countries: [],
  });

  const dispatch = useAppDispatch();
  const countries = useAppSelector((state) => state.countries);

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

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

  const handleCountrySelect = (event) => {
    const exists = formData.countries.includes(event.target.value);
    if (!exists) {
      setFormData({
        ...formData,
        countries: [...formData.countries, event.target.value],
      });
      setCountryError(false); // Set countryError to false when a country is selected.
    } else {
      setFormData({
        ...formData,
        countries: formData.countries.filter((country) => country !== event.target.value),
      });
    }
  };

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



  const seasonsDefault = ["summer", "autumn", "winter", "spring"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      dispatch(addActivity(formData));
      dispatch(setCurrentPage(1));
      alert("Activity created successfully.");
      navigate("/list");
    }
  };

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
  }

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
            <label>Country:</label>
            <select
              className={style.searchCamp}
              name="country"
              value={formData.countries}
              onChange={handleCountrySelect}
            >
              <option value="-1" disabled>
                Select a country
              </option>
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
            <label>Seasons:</label>
            <div className={style.selectedCountries}>
              {seasonsDefault.map((season) => (
                <label key={season} className={style.selectedCountryLabel}>
                  {season}
                  <input
                    type="checkbox"
                    value={season}
                    checked={formData.seasons.includes(season)}
                    onChange={() => handleSeasonSelect(season)}
                  />
                </label>
              ))}
            </div>
            {seasonsError && (
              <span className={style.errorSpan}>Select at least one.</span>
            )}
          </div>
          <div className={style.rightContainer}>
            <Link to={"/list"}>
              <button className={style.btnSearch}>back</button>
            </Link>
            <button
              disabled={!isFormValid}
              className={style.btnSearch}
              style={isFormValid ? {} : { backgroundColor: '#ccc', color: '#888', cursor: 'not-allowed' }}
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

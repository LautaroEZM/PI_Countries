import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux-hooks";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import style from "./Form.module.css";
import { addActivity, setCurrentPage, getCountries } from "../store/actions";

function AddActivity(props) {
  const navigate = useNavigate();
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

  const handleCountrySelect = (event) => {
    const exists = formData.countries.includes(event.target.value);
    if (!exists) {
      setFormData({ ...formData, countries: [...formData.countries, event.target.value] });
    }
  };

  const handleSeasonSelect = (season) => {
    setFormData((prevData) => ({
      ...prevData,
      seasons: prevData.seasons.includes(season)
        ? prevData.seasons.filter((s) => s !== season)
        : [...prevData.seasons, season],
    }));
  };

  const seasonsDefault = ["verano", "otoño", "invierno", "primavera"];

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addActivity(formData);
    props.setCurrentPage(1);
    alert('Activity created successfully.');
    navigate('/list');
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
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className={style.textStatus}>
            <label>Difficulty:</label>
            <select
              className={style.searchCamp}
              name="difficulty"
              value={formData.difficulty}
              onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
            >
              {Array.from({ length: 5 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div className={style.textStatus}>
            <label>Duration:</label>
            <input
              className={style.searchCamp}
              type="text"
              name="duration"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              required
            />
          </div>
          <div className={style.textStatus}>
            <label>Country:</label>
            <select
              className={style.searchCamp}
              name="country"
              value={formData.countries}
              onChange={handleCountrySelect}
            >
              <option value="" disabled>
                Select a country
              </option>
              {countries.map((country) => (
                <option key={country.idCode} value={country.idCode}>
                  {country.name}
                </option>
              ))}
            </select>
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
          </div>
          <div className={style.rightContainer}>
            <button className={style.btnSearch} type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  addActivity: (data) => dispatch(addActivity(data)),
  setCurrentPage: (pageNumber) => dispatch(setCurrentPage(pageNumber)),
  getCountries: () => dispatch(getCountries()),
});

export default connect(null, mapDispatchToProps)(AddActivity);

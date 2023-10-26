import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux-hooks.js";
import style from "./sideBar.module.css";
import OptionFilter from "../OptionFilter/OptionFilter.jsx";
import { getActivities, clearFilters } from "../../store/actions.js";
import CustomButton from "../button/button.jsx";

const SideBar = () => {
  const dispatch = useAppDispatch();
  const activities = useAppSelector((state) => state.activities);
  const countries = useAppSelector((state) => state.countries);
  const activeFilters = useAppSelector((state) => state.activeFilters);
  const [continents, setContinents] = useState([]);
  const [activeActivity, setActiveActivity] = useState(false);
  const [activeContinent, setActiveContinent] = useState(false);
 

  useEffect(() => {
    const existingAcitivityFilter = activeFilters.find((filter) => filter.type === "activity");
    if (existingAcitivityFilter) {
      setActiveActivity(existingAcitivityFilter.value);
    } else {
      setActiveActivity(null);
    }
    const existingContinentFilter = activeFilters.find((filter) => filter.type === "continent");
    if (existingContinentFilter) {
      setActiveContinent(existingContinentFilter.value);
    } else {
      setActiveContinent(null);
    }
  }, [activeFilters]);

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  useEffect(() => {
    const continentList = [];
    countries.forEach(country => {
      if (!continentList.find((c) => c.name === country.continent)) {
        continentList.push({ name: country.continent });
      }
    });
    setContinents(continentList);
  }, [countries]);

  const handleClearFilters = () => {
    dispatch(clearFilters());
  }

  return (
    <div className={style.fatherContainer}>
      <Link to="/form" className={style.homeButton}>
        <span>NEW ACTIVITY</span>
      </Link>
      <div className={style.activitiesFilter}>
        <div className={style.titleFilter}>FILTER BY ACTIVITY</div>
        {activities.map((activity, index) => (
          <OptionFilter key={index} item={activity} type="activity" selected={activity.name===activeActivity}/>
        ))}
      </div>
      <div className={style.activitiesFilter}>
      <div className={style.titleFilter}>FILTER BY CONTINENT</div>
        {continents.map((continent, index) => (
          <OptionFilter key={index} item={continent} type="continent" selected={continent.name===activeContinent}/>
        ))}
      </div>
      <CustomButton content="CLEAR FILTERS" onClick={handleClearFilters} />
    </div>
  );
};

export default SideBar;
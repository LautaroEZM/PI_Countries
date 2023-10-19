import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux-hooks.js";
import style from "./sideBar.module.css";
import OptionFilter from "../OptionFilter/OptionFilter.jsx";
import { getActivities } from "../../store/actions.js";

const SideBar = ({ content, onClick }) => {
  const dispatch = useAppDispatch();
  const activities = useAppSelector((state) => state.activities);

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  return (
    <div className={style.fatherContainer}>
      <div className={style.activitiesFilter}>
        {activities.map((activity, index) => (
          <OptionFilter key={index} activity={activity} />
        ))}
      </div>
      <div className={style.continentsFilter}></div>
    </div>
  );
};

export default SideBar;

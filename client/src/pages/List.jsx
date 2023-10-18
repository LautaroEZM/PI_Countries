import { useEffect } from "react";
import { getCountries, toggleForm, setCurrentPage } from "../store/actions";
import { useAppDispatch, useAppSelector } from "../redux-hooks.js";
import style from "./List.module.css";
import SearchBar from "../components/searchBar/searchBar";
import OrderButtons from '../components/orderButtons/orderButtons';
import Card from "../components/card/card";

function List() {
  const dispatch = useAppDispatch();
  const countries = useAppSelector((state) => state.countries);

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <div className={style.firstContainer}>
      {/*container de arriba*/}
      <div className={style.topContainer}>
        <div className={style.coloredDiv}></div>
        <div className={style.coloredDiv}>
          <SearchBar />
        </div>
        <div className={style.coloredDivRight}>
          <OrderButtons />
        </div>
      </div>
      {/*container de abajo*/}
      <div className={style.botContainer}>
        <div className={style.filterContainer}></div>
        <div className={style.cardContainer}></div>
      </div>
    </div>
  );
}

export default List;

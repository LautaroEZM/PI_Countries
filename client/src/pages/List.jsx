import { useEffect } from "react";
import { getCountries, toggleForm, setCurrentPage } from "../store/actions";
import { useAppDispatch, useAppSelector } from "../redux-hooks.js";
import style from "./List.module.css";
import SearchBar from "../components/searchBar/searchBar";


function List() {
  const dispatch = useAppDispatch();
  const countries = useAppSelector((state) => state.countries);
  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <div className={style.firstContainer}>
      <div className={style.topContainer}><SearchBar/></div>
    </div>
    
  );
}

export default List;

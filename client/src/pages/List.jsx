import { useEffect } from "react";
import { getCountries, setCurrentPage } from "../store/actions";
import { useAppDispatch, useAppSelector } from "../redux-hooks.js";
import style from "./List.module.css";
import SearchBar from "../components/searchBar/searchBar";
import OrderButtons from '../components/orderButtons/orderButtons';
import Card from "../components/card/Card";
import SideBar from "../components/sideBar/sideBar";

function List() {
  const dispatch = useAppDispatch();
  const countries = useAppSelector((state) => state.countries);
  const currentPage = useAppSelector((state) => state.currentPage);

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCountries = countries.slice(startIndex, endIndex);

  const setPage = (page) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div className={style.firstContainer}>
      <div className={style.topContainer}>
        <div className={style.coloredDiv}></div>
        <div className={style.coloredDiv}>
          <SearchBar />
        </div>
        <div className={style.coloredDivRight}>
          <OrderButtons />
        </div>
      </div>
      <div className={style.botContainer}>
        <div className={style.filterContainer}>
          <SideBar />
        </div>
        <div className={style.contentContainer}>
          <div className={style.cardContainer}>
            <div className={style.cardRow}>
              {paginatedCountries.map((country, index) => (
                <Card key={index} country={country} />
              ))}
            </div>
          </div>
          <div className={style.pagination}>
            <button
              onClick={() => setPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              PREV
            </button>
            {Array.from({ length: Math.ceil(countries.length / itemsPerPage) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setPage(index + 1)}
                className={currentPage === index + 1 ? style.active : ''}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setPage(currentPage + 1)}
              disabled={currentPage === Math.ceil(countries.length / itemsPerPage)}
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;

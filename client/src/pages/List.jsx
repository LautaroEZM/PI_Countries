import React, { useEffect, useState } from "react";
import { getCountries, setCurrentPage } from "../store/actions";
import { useAppDispatch, useAppSelector } from "../redux-hooks.js";
import style from "./List.module.css";
import SearchBar from "../components/searchBar/searchBar";
import OrderButtons from '../components/orderButtons/orderButtons';
import Card from "../components/card/Card";
import SideBar from "../components/sideBar/sideBar";

function List() {
  const [paginatedCountries, setPaginatedCountries] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.currentPage);
  const filteredCountries = useAppSelector((state) => state.filteredCountries);

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const itemsPerPage = 10;

  useEffect(() => {
    setStartIndex((currentPage - 1) * itemsPerPage);
    setEndIndex(startIndex + itemsPerPage);
    setPaginatedCountries(filteredCountries.slice(startIndex, endIndex));
  }, [filteredCountries, startIndex, endIndex, currentPage]);

  const setPage = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handleClearClick = () => {
    dispatch(setCurrentPage(1));
    dispatch(getCountries()); 
  };

  return (
    <div className={style.firstContainer}>
      <div className={style.topContainer}>
        <div className={style.coloredDiv}></div>
        <div className={style.coloredDiv}>
          <SearchBar onClearClick={handleClearClick} />
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
          {filteredCountries.length > 0 ? ( // Mostrar el mensaje si hay elementos disponibles
            <div className={style.pagination}>
              <button
                onClick={() => setPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                PREV
              </button>
              {Array.from({ length: Math.ceil(filteredCountries.length / itemsPerPage) }).map((_, index) => (
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
                disabled={currentPage === Math.ceil(filteredCountries.length / itemsPerPage)}
              >
                NEXT
              </button>
            </div>
          ) : ( // Mostrar el mensaje si no hay elementos disponibles
            <div className={style.pagination}>No elements available</div>
          )}
        </div>
      </div>
    </div>
  );
}


export default List;

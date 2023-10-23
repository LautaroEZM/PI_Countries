import {
  GET_COUNTRIES,
  GET_COUNTRIES_BY_NAME,
  SET_FILTERED_COUNTRIES,
  SET_CURRENT_PAGE,
  GET_COUNTRY,
  GET_ACTIVITY,
  GET_ACTIVITIES,
  SORT_COUNTRIES,
} from "./actions";

const initialState = {
  countries: [],
  country: {},
  filteredCountries: [],
  activities: [],
  activity: {},
  currentPage: 1,
  itemsPerPage: 10,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES_BY_NAME:
    case GET_COUNTRIES:
      return { ...state, countries: action.payload };
    case GET_COUNTRY:
      return { ...state, country: action.payload };
    case SET_FILTERED_COUNTRIES:
      return { ...state, filteredCountries: action.payload };
    case GET_ACTIVITIES:
      return { ...state, activities: action.payload };
    case GET_ACTIVITY:
      return { ...state, activity: action.payload };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    case SORT_COUNTRIES:
      let sortedCountries = [...state.filteredCountries]; // Crear una nueva matriz copiando los países filtrados
      if (action.payload.sortType === "name") {
        sortedCountries = sortedCountries.sort((a, b) => {
          if (action.payload.sort === "asc") {
            return a.name.localeCompare(b.name);
          } else {
            return b.name.localeCompare(a.name);
          }
        });
      } else if (action.payload.sortType === "population") {
        sortedCountries = sortedCountries.sort((a, b) => {
          if (action.payload.sort === "asc") {
            return a.population - b.population;
          } else {
            return b.population - a.population;
          }
        });
      }
      return { ...state, filteredCountries: sortedCountries };

    default:
      return { ...state };
  }
};

export default rootReducer;

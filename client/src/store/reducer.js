import {
  GET_COUNTRIES,
  GET_COUNTRIES_BY_NAME,
  SET_FILTERED_COUNTRIES,
  SET_CURRENT_PAGE,
  GET_COUNTRY,
  GET_ACTIVITY,
  GET_ACTIVITIES,
  SORT_COUNTRIES,
  APPLY_FILTERS,
  SET_FILTER,
  CLEAR_FILTERS,
  CLEAR_COUNTRY,
} from "./actions";

const initialState = {
  countries: [],
  country: {},
  filteredCountries: [],
  activities: [],
  activity: {},
  currentPage: 1,
  itemsPerPage: 10,
  activeFilters: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES_BY_NAME:
    case GET_COUNTRIES:
      // Actualizar la lista de países en el estado con los datos obtenidos de la acción
      return { ...state, countries: action.payload };

    case GET_COUNTRY:
      // Actualizar los detalles del país en el estado con los datos obtenidos de la acción
      return { ...state, country: action.payload };

    case SET_FILTERED_COUNTRIES:
      // Actualizar la lista de países filtrados en el estado
      return { ...state, filteredCountries: action.payload };

    case GET_ACTIVITIES:
      // Actualizar la lista de actividades en el estado con los datos obtenidos de la acción
      return { ...state, activities: action.payload };

    case GET_ACTIVITY:
      // Actualizar los detalles de la actividad en el estado con los datos obtenidos de la acción
      return { ...state, activity: action.payload };

    case SET_CURRENT_PAGE:
      // Actualizar la página actual en el estado
      return { ...state, currentPage: action.payload };

    case SORT_COUNTRIES:
      // Ordenar la lista de países según el tipo y dirección de orden especificados
      let sortedCountries = [...state.filteredCountries]; // Crear una nueva matriz copiando los países filtrados

      if (action.payload.sortType === "name") {
        // Ordenar por nombre
        sortedCountries = sortedCountries.sort((a, b) => {
          if (action.payload.sort === "asc") {
            return a.name.localeCompare(b.name);
          } else {
            return b.name.localeCompare(a.name);
          }
        });
      } else if (action.payload.sortType === "population") {
        // Ordenar por población
        sortedCountries = sortedCountries.sort((a, b) => {
          if (action.payload.sort === "asc") {
            return a.population - b.population;
          } else {
            return b.population - a.population;
          }
        });
      }
      // Actualizar la lista de países filtrados en el estado con la lista ordenada
      return { ...state, filteredCountries: sortedCountries };

    case SET_FILTER:
      // Establecer un filtro activo en el estado
      const existingFilter = state.activeFilters.find(
        (f) => f.type === action.payload.type
      );

      if (!existingFilter) {
        // Si no existe un filtro con el mismo tipo, agregar el filtro a la lista de filtros activos
        const activeFilters = [...state.activeFilters, action.payload];
        return { ...state, activeFilters };
      } else {
        // Si ya existe un filtro con el mismo tipo, actualizar su valor
        existingFilter.value = action.payload.value;
        return {
          ...state,
          activeFilters: [...state.activeFilters, existingFilter],
        };
      }

    case APPLY_FILTERS:
      // Aplicar filtros a la lista de países
      let countries = state.countries;
      state.activeFilters.forEach((filter) => {
        if (filter.type === "activity") {
          // Filtrar por actividad
          countries = countries.filter((c) => {
            const currentCountryActivities = c.activities.map((a) => a.name);
            return currentCountryActivities.includes(filter.value);
          });
        } else if (filter.type === "continent") {
          // Filtrar por continente
          countries = countries.filter((c) => c.continent === filter.value);
        }
      });
      // Actualizar la lista de países filtrados en el estado
      return { ...state, filteredCountries: countries };

    case CLEAR_FILTERS:
      // Limpiar todos los filtros activos
      return { ...state, activeFilters: [] };

    case CLEAR_COUNTRY:
      // Limpiar los detalles del país
      return { ...state, country: {} };

    default:
      return { ...state };
  }
};

export default rootReducer;

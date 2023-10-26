import axios from "axios";

// Acción para obtener la lista de países desde la API
export const GET_COUNTRIES = "GET_COUNTRIES";
export const getCountries = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/countries");
      dispatch({
        type: GET_COUNTRIES,
        payload: response.data,
      });
      // Establecer la lista de países filtrados inicialmente igual a la lista completa
      dispatch({
        type: SET_FILTERED_COUNTRIES,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

// Acción para obtener países por nombre
export const GET_COUNTRIES_BY_NAME = "GET_COUNTRIES_BY_NAME";
export const getCountriesByName = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/countries/name?name=${name}`
      );
      dispatch({
        type: GET_COUNTRIES_BY_NAME,
        payload: response.data,
      });
      // Establecer la lista de países filtrados inicialmente igual a la lista completa
      dispatch({
        type: SET_FILTERED_COUNTRIES,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

// Acción para establecer la lista de países filtrados
export const SET_FILTERED_COUNTRIES = "SET_FILTERED_COUNTRIES";
export const setFilteredCountries = (matches) => {
  return (dispatch) => {
    return dispatch({
      type: SET_FILTERED_COUNTRIES,
      payload: matches,
    });
  };
};

// Acción para obtener detalles de un país
export const GET_COUNTRY = "GET_COUNTRY";
export const getCountry = (countryCode) => {
  const endpoint = `http://localhost:3001/countries/${countryCode}`;
  return (dispatch) => {
    axios.get(endpoint).then(({ data }) => {
      return dispatch({
        type: GET_COUNTRY,
        payload: data,
      });
    });
  };
};

// Acción para obtener la lista de actividades
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const getActivities = () => {
  const endpoint = "http://localhost:3001/activities";
  return (dispatch) => {
    axios.get(endpoint).then(({ data }) => {
      return dispatch({
        type: GET_ACTIVITIES,
        payload: data,
      });
    });
  };
};

// Acción para obtener detalles de una actividad por país
export const GET_ACTIVITY = "GET_ACTIVITY";
export const getActivity = (countryCode) => {
  const endpoint = `http://localhost:3001/countries/${countryCode}`;
  return (dispatch) => {
    axios.get(endpoint).then(({ data }) => {
      return dispatch({
        type: GET_ACTIVITY,
        payload: data,
      });
    });
  };
};

// Acción para agregar una nueva actividad
export const ADD_ACTIVITY = "ADD_ACTIVITY";
export const addActivity = (data) => {
  const endpoint = "http://localhost:3001/activities";
  return (dispatch) => {
    axios
      .post(endpoint, data)
      .then(({ data }) => {
        alert("Activity created successfully");
        return dispatch({
          type: ADD_ACTIVITY,
          payload: data,
        });
      })
      .catch((e) => {
        console.log(e);
        alert(e.response.data.error);
      });
  };
};

// Acción para establecer la página actual
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const setCurrentPage = (page) => {
  return (dispatch) => {
    return dispatch({
      type: SET_CURRENT_PAGE,
      payload: page,
    });
  };
};

// Acción para ordenar la lista de países
export const SORT_COUNTRIES = "SORT_COUNTRIES";
export const sortCountries = (sortType, sort) => {
  return (dispatch) => {
    return dispatch({
      type: SORT_COUNTRIES,
      payload: { sortType, sort },
    });
  };
};

// Acción para establecer un filtro
export const SET_FILTER = "SET_FILTER";
export const setFilter = (filter) => {
  return (dispatch) => {
    return dispatch({
      type: SET_FILTER,
      payload: filter,
    });
  };
};

// Acción para aplicar filtros a la lista de países
export const APPLY_FILTERS = "APPLY_FILTERS";
export const applyFilters = (filter) => {
  return (dispatch) => {
    return dispatch({
      type: APPLY_FILTERS,
      payload: filter,
    });
  };
};

// Acción para limpiar todos los filtros
export const CLEAR_FILTERS = "CLEAR_FILTERS";
export const clearFilters = () => {
  return (dispatch) => {
    return dispatch({
      type: CLEAR_FILTERS,
    });
  };
};

// Acción para limpiar los detalles del país
export const CLEAR_COUNTRY = "CLEAR_COUNTRY";
export const clearCountry = () => {
  return (dispatch) => {
    return dispatch({
      type: CLEAR_COUNTRY,
    });
  };
};

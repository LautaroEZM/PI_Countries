import axios from "axios";
export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRIES_BY_NAME = "GET_COUNTRIES_BY_NAME";
export const GET_COUNTRY = "GET_COUNTRY";
export const SET_FILTERED_COUNTRIES = "SET_FILTERED_COUNTRIES";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const GET_ACTIVITY = "GET_ACTIVITY";
export const ADD_ACTIVITY = "ADD_ACTIVITY";
export const SORT_COUNTRIES = "SORT_COUNTRIES";

export const getCountries = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/countries");
      dispatch({
        type: GET_COUNTRIES,
        payload: response.data,
      });
      dispatch({
        type: SET_FILTERED_COUNTRIES,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

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
      dispatch({
        type: SET_FILTERED_COUNTRIES,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const setFilteredCountries = (matches) => {
  return (dispatch) => {
    return dispatch({
      type: "SET_FILTERED_COUNTRIES",
      payload: matches,
    });
  };
};

export const getCountry = (countryCode) => {
  const endpoint = `http://localhost:3001/countries/${countryCode}`;
  return (dispatch) => {
    axios.get(endpoint).then(({ data }) => {
      return dispatch({
        type: "GET_COUNTRY",
        payload: data,
      });
    });
  };
};

export const getActivities = () => {
  const endpoint = "http://localhost:3001/activities";
  return (dispatch) => {
    axios.get(endpoint).then(({ data }) => {
      return dispatch({
        type: "GET_ACTIVITIES",
        payload: data,
      });
    });
  };
};

export const getActivity = (countryCode) => {
  const endpoint = `http://localhost:3001/countries/${countryCode}`;
  return (dispatch) => {
    axios.get(endpoint).then(({ data }) => {
      return dispatch({
        type: "GET_ACTIVITY",
        payload: data,
      });
    });
  };
};

export const addActivity = (data) => {
  const endpoint = "http://localhost:3001/activities";
  return (dispatch) => {
    axios
      .post(endpoint, data)
      .then(({ data }) => {
        return dispatch({
          type: "ADD_ACTIVITY",
          payload: data,
        });
      })
      .catch((e) => {
        console.log(e);
        alert(e.response.data.error);
      });
  };
};

export const setCurrentPage = (page) => {
  return (dispatch) => {
    return dispatch({
      type: "SET_CURRENT_PAGE",
      payload: page,
    });
  };
};

export const sortCountries = (sortType, sort) => {
  return (dispatch) => {
    
    return dispatch({
      type: "SORT_COUNTRIES",
      payload: {sortType, sort},
    });
  };
};


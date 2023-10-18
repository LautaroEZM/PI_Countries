import axios from "axios";
export const GET_COUNTRIES = "GET_COUNTRIES";
export const TOGGLE_FORM = "TOGGLE_FORM";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";

export const getCountries = () => {
  const endpoint = 'http://localhost:3001/countries';
  return (dispatch) => {
    axios.get(endpoint).then(({ data }) => {
      return dispatch({
        type: 'GET_COUNTRIES',
        payload: data,
      });
    });
  };
};

export const setCurrentPage = (pageNumber) => {
  return (dispatch) => {
    return dispatch({
      type: "SET_CURRENT_PAGE",
      payload: pageNumber,
    });
  };
};

export const toggleForm = () => {
  return (dispatch) => {
    return dispatch({
      type: "TOGGLE_FORM",
    });
  };
};

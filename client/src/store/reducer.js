import { GET_COUNTRIES, TOGGLE_FORM, SET_CURRENT_PAGE, GET_COUNTRY, GET_ACTIVITY, GET_ACTIVITIES } from "./actions";

const initialState = {
  countries: [],
  country: {},
  activities: [],
  activity: {},
  currentPage: 1,
  itemsPerPage: 10,
  visibleForm: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return { ...state };
    case GET_COUNTRIES:
      return { ...state, countries: action.payload };
    case GET_COUNTRY:
      return { ...state, country: action.payload };
    case GET_ACTIVITIES:
      return { ...state, activities: action.payload };
    case GET_ACTIVITY:
      return { ...state, activity: action.payload };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    case TOGGLE_FORM:
      return { ...state, visibleForm: !state.visibleForm };
  }
};

export default rootReducer;

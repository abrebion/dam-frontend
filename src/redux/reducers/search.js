import { SEARCH_INITIATE, SEARCH_COMPLETE, SEARCH_FAILURE, SEARCH_REFRESH, SEARCH_RESET } from "../actionTypes";

const initialState = {
  results: [],
  loading: false,
  error: null,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_INITIATE:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SEARCH_COMPLETE:
      return {
        ...state,
        results: action.data,
        loading: false,
        error: null,
      };
    case SEARCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case SEARCH_REFRESH:
      return {
        ...state,
        results: state.results.filter(({ _id }) => _id !== action.id),
      };
    case SEARCH_RESET:
      return initialState;
    default:
      return state;
  }
};

export default searchReducer;

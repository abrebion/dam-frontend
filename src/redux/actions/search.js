import { SEARCH_INITIATE, SEARCH_COMPLETE, SEARCH_FAILURE, SEARCH_RESET } from "../actionTypes";
import api from "../../api/apiHandler";

const defaultURL = "/assets/search?sort=-createdAt";

export const search = (searchURL = defaultURL) => {
  return async (dispatch) => {
    dispatch(searchInitiated());
    try {
      const results = await api.get(searchURL);
      const data = results.data;
      dispatch(searchCompleted(data));
    } catch (error) {
      dispatch(searchFailure(error));
    }
  };
};

const searchInitiated = () => ({
  type: SEARCH_INITIATE,
});

const searchCompleted = (data) => ({
  type: SEARCH_COMPLETE,
  data,
});

const searchFailure = (error) => ({
  type: SEARCH_FAILURE,
  error,
});

export const searchReset = () => ({
  type: SEARCH_RESET,
});

import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import assetsReducer from "../reducers/assets";
import searchReducer from "../reducers/search";
import selectionReducer from "../reducers/selection";

const store = createStore(
  combineReducers({
    assets: assetsReducer,
    selection: selectionReducer,
    search: searchReducer,
  }),
  applyMiddleware(thunk)
);

export default store;

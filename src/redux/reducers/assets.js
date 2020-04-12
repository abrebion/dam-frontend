import { TOGGLE_UPLOADER, LIST_ASSET, ADD_ASSET, DELETE_ASSET, UPDATE_ASSET } from "../actionTypes";

const initialState = {
  uploaderIsVisible: false,
  assets: [],
  activeAsset: {},
};

const assetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_UPLOADER:
      return {
        ...state,
        uploaderIsVisible: !state.uploaderIsVisible,
      };
    case ADD_ASSET:
      return {
        ...state,
        assets: [...state.assets, action.asset],
      };
    case DELETE_ASSET:
      return {
        ...state,
        assets: state.assets.filter(({ id }) => id !== action.id),
      };
    case UPDATE_ASSET:
      return state;
    default:
      return state;
  }
};

export default assetsReducer;

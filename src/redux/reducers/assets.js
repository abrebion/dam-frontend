import { TOGGLE_UPLOADER, GET_ASSET_FILTERS, SET_CURRENT_ASSET, SET_METADATA, ADD_ASSET, DELETE_ASSET_COMPLETED, UPDATE_ASSET } from "../actionTypes";

const initialState = {
  uploaderIsVisible: false,
  filters: {},
  assets: [],
  currentAsset: {},
};

const assetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_UPLOADER:
      return {
        ...state,
        uploaderIsVisible: !state.uploaderIsVisible,
      };
    case GET_ASSET_FILTERS:
      return {
        ...state,
        filters: action.filters,
      };
    case SET_CURRENT_ASSET:
      return {
        ...state,
        currentAsset: action.asset,
      };
    case SET_METADATA:
      return {
        ...state,
        currentAsset: { ...state.asset.currentAsset, [action.metadata]: action.value },
      };
    case ADD_ASSET:
      return {
        ...state,
        assets: [...state.assets, action.asset],
        currentAsset: action.asset,
      };
    case UPDATE_ASSET:
      return {
        ...state,
        assets: [...state.assets, action.asset],
        currentAsset: action.asset,
      };
    case DELETE_ASSET_COMPLETED:
      return {
        ...state,
        assets: state.assets.filter(({ id }) => id !== action.id),
      };
    default:
      return state;
  }
};

export default assetsReducer;

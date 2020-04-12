import { ADD_TO_SELECTION, ADD_ALL_TO_SELECTION, REMOVE_FROM_SELECTION, REMOVE_ALL_FROM_SELECTION } from "../actionTypes";

export const addToSelection = (asset) => ({
  type: ADD_TO_SELECTION,
  asset,
});

export const addAllToSelection = (assets) => ({
  type: ADD_ALL_TO_SELECTION,
  assets,
});

export const removeFromSelection = (assets) => ({
  type: REMOVE_FROM_SELECTION,
  assets,
});

export const removeAllFromSelection = () => ({
  type: REMOVE_ALL_FROM_SELECTION,
});

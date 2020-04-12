import { TOGGLE_UPLOADER, ADD_ASSET, DELETE_ASSET, UPDATE_ASSET, LIST_ASSET } from "../actionTypes";

export const toogleUploader = () => ({
  type: TOGGLE_UPLOADER,
});

export const addAsset = (asset) => ({
  type: ADD_ASSET,
  asset,
});

export const deleteAsset = (id) => ({
  type: DELETE_ASSET,
  id,
});

export const updateAsset = (id, asset) => ({
  type: UPDATE_ASSET,
  id,
  asset,
});

export const listAsset = (assets) => ({
  type: LIST_ASSET,
  assets,
});

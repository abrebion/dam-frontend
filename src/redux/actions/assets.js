import {
  TOGGLE_UPLOADER,
  GET_ASSET_FILTERS,
  SET_CURRENT_ASSET,
  SET_METADATA,
  ADD_ASSET,
  UPDATE_ASSET,
  DELETE_ASSET_INITIATE,
  DELETE_ASSET_COMPLETED,
  DELETE_ASSET_FAILURE,
} from "../actionTypes";
import { searchRefresh } from "./search";
import api from "../../api/apiHandler";

export const toogleUploader = () => ({
  type: TOGGLE_UPLOADER,
});

export const loadAssetFilters = () => {
  return async (dispatch) => {
    let filters = {};
    try {
      const fetchedBrands = await api.get("/assets/brands");
      const meta_brand = fetchedBrands.data.map((el) => ({ value: el, label: el, meta: "meta_brand" }));
      const fetchedRecipes = await api.get("/assets/recipes");
      const meta_recipe = fetchedRecipes.data.map((el) => ({ value: el, label: el, meta: "meta_recipe" }));
      const fetchedFlavours = await api.get("/assets/flavours");
      const meta_flavour = fetchedFlavours.data.map((el) => ({ value: el, label: el, meta: "meta_flavour" }));
      const fetchedCapacities = await api.get("/assets/capacities");
      const meta_capacity = fetchedCapacities.data.map((el) => ({ value: el, label: el, meta: "meta_capacity" }));
      const fetchedPackagings = await api.get("/assets/packagings");
      const meta_packaging = fetchedPackagings.data.map((el) => ({ value: el, label: el, meta: "meta_packaging" }));
      const fetchedFormats = await api.get("/assets/formats");
      const meta_format = fetchedFormats.data.map((el) => ({ value: el, label: el, meta: "meta_format" }));
      const fetchedEANs = await api.get("/assets/eans");
      const meta_ean13 = fetchedEANs.data.map((el) => ({ value: el, label: el, meta: "meta_ean13" }));
      const fetchedTags = await api.get("/tags");
      const meta_tags = fetchedTags.data.map((el) => ({ value: el._id, label: el.name, meta: "meta_tags" }));
      filters = {
        meta_brand,
        meta_recipe,
        meta_flavour,
        meta_capacity,
        meta_packaging,
        meta_format,
        meta_ean13,
        meta_tags,
      };
    } catch (error) {
      console.log(error);
    }
    dispatch(getAssetFilters(filters));
  };
};

const getAssetFilters = (filters) => ({
  type: GET_ASSET_FILTERS,
  filters,
});

export const setCurrentAsset = (asset) => ({
  type: SET_CURRENT_ASSET,
  asset,
});

export const setMetadata = (metadata, value) => ({
  type: SET_METADATA,
  metadata,
  value,
});

export const addAsset = (asset) => {
  return async (dispatch) => {
    try {
      const results = await api.post("/assets", asset);
      dispatch(addAssetCompleted(results.data));
    } catch (error) {
      console.log(error);
    }
  };
};

const addAssetCompleted = (asset) => ({
  type: ADD_ASSET,
  asset,
});

export const updateAsset = (id, asset) => {
  return async (dispatch) => {
    try {
      const results = await api.patch("/assets/" + id, asset);
      dispatch(updateAssetCompleted(id, results.data));
    } catch (error) {
      console.log(error);
    }
  };
};

const updateAssetCompleted = (id, asset) => ({
  type: UPDATE_ASSET,
  id,
  asset,
});

export const deleteAsset = (id) => {
  return async (dispatch) => {
    dispatch(deleteAssetInitiated());
    try {
      const results = await api.delete("/assets/" + id);
      dispatch(searchRefresh(id));
    } catch (error) {
      dispatch(deleteAssetFailure(error));
    }
  };
};

const deleteAssetInitiated = () => ({
  type: DELETE_ASSET_INITIATE,
});

const deleteAssetCompleted = (id) => ({
  type: DELETE_ASSET_COMPLETED,
  id,
});

const deleteAssetFailure = (error) => ({
  type: DELETE_ASSET_FAILURE,
  error,
});

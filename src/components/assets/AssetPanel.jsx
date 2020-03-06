import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AssetUploader from "./AssetUploader";
import api from "../../api/apiHandler";
import Select from "react-select";
import UserContext from "../../authentication/UserContext";

const customTheme = theme => {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      primary: "#007696"
    }
  };
};

export default function AssetPanel({ asset, handleTogglePanel, handleSearch }) {
  const userContext = useContext(UserContext);
  const { currentUser } = userContext;

  const [assetMetadata, setAssetMetadata] = useState({
    name: asset.name,
    secure_url: asset.secure_url,
    type: asset.type,
    meta_ean13: asset.meta_ean13,
    meta_brand: asset.meta_brand,
    meta_recipe: asset.meta_recipe,
    meta_flavour: asset.meta_flavour,
    meta_packaging: asset.meta_packaging,
    meta_capacity: asset.meta_capacity,
    meta_format: asset.meta_format,
    meta_tags: asset.meta_tags
  });

  const [mode, setMode] = useState("edit");
  const [setRecipes] = useState([]);
  const [setFlavours] = useState([]);
  const [tags, setTags] = useState([]);
  const [defaultTags, setDefaultTags] = useState([]);

  useEffect(() => {
    async function fetchTags() {
      try {
        const fetchedTags = await api.get("/tags");
        const tags = fetchedTags.data.map(el => {
          return { value: el._id, label: el.name, meta: "meta_tags" };
        });
        setDefaultTags(
          tags.filter(el => {
            return asset.meta_tags.includes(el.value);
          })
        );
        // setDefaultTags(defaultTags);
        setTags(tags);
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchRecipes() {
      try {
        const fetchedRecipes = await api.get("/assets/recipes");
        const recipes = fetchedRecipes.data.map(el => {
          return { value: el, label: el, meta: "meta_recipe" };
        });
        setRecipes(recipes);
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchFlavours() {
      try {
        const fetchedFlavours = await api.get("/assets/flavours");
        const flavours = fetchedFlavours.data.map(el => {
          return { value: el, label: el, meta: "meta_flavour" };
        });
        setFlavours(flavours);
      } catch (error) {
        console.log(error);
      }
    }
    fetchRecipes();
    fetchFlavours();
    fetchTags();
  }, []);

  const handleSelect = meta => {
    return selectedOptions => {
      if (meta === "meta_tags") {
        console.log(selectedOptions);
        setDefaultTags(selectedOptions);
        selectedOptions.value = selectedOptions.map(el => el.value);
      }
      setAssetMetadata({ ...assetMetadata, [meta]: selectedOptions.value });
    };
  };

  const handleInput = e => {
    setAssetMetadata({ ...assetMetadata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.patch("/assets/" + asset._id, assetMetadata);
      // handleTogglePanel();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpload = e => {
    setMode("upload");
    console.log("Upload new file");
  };

  return (
    <div className="asset-panel">
      <FontAwesomeIcon icon={["fas", "times"]} className="asset-panel-close" onClick={handleTogglePanel} />
      {mode === "edit" ? (
        <div className="asset-panel-preview">
          <img src={assetMetadata.secure_url} alt="" />
        </div>
      ) : (
        <div className="asset-panel-upload">
          <AssetUploader handleSearch={handleSearch} mode="edit" />
        </div>
      )}

      <div className="asset-panel-actions">
        {currentUser && currentUser.role !== "user" && <FontAwesomeIcon icon="upload" className="action" title="Replace asset with new file" onClick={handleUpload} />}
        <FontAwesomeIcon icon="download" className="action" title="Download file to your desktop" />
        <FontAwesomeIcon icon="external-link-alt" className="action" title="Open file in a new tab" />
        <FontAwesomeIcon icon="link" className="action" title="Copy link to your clipboard" />
      </div>

      <form className="asset-panel-form" onChange={handleInput} onSubmit={handleSubmit}>
        <fieldset disabled={currentUser && currentUser.role === "user"}>
          <div className="row">
            <div className="col">
              <div className="form-group row">
                <label htmlFor="type" className="col-sm-3 col-form-label col-form-label-sm">
                  Type
                </label>
                <div className="col-sm-9">
                  <select name="type" className="custom-select custom-select-sm" id="type" value={assetMetadata.type}>
                    <option>Select a type of asset...</option>
                    <option value="Product Image">Product Image</option>
                    <option value="Video">Video</option>
                    <option value="Logo">Logo</option>
                    <option value="Presentation">Presentation</option>
                    <option value="Brand Guidelines">Brand Guidelines</option>
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="name" className="col-sm-3 col-form-label col-form-label-sm">
                  Name
                </label>
                <div className="col-sm-9">
                  <input type="text" name="name" className="form-control form-control-sm" id="name" value={assetMetadata.name} />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="brand" className="col-sm-3 col-form-label col-form-label-sm">
                  Brand
                </label>
                <div className="col-sm-9">
                  <select name="meta_brand" className="custom-select custom-select-sm" id="brand" value={assetMetadata.meta_brand}>
                    <option>Select a brand...</option>
                    <option value="Orangina">Orangina</option>
                    <option value="Schweppes">Schweppes</option>
                    <option value="Oasis">Oasis</option>
                    <option value="MayTea">MayTea</option>
                    <option value="Pulco">Pulco</option>
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="recipe" className="col-sm-3 col-form-label col-form-label-sm">
                  Recipe
                </label>
                <div className="col-sm-9">
                  <input type="text" name="meta_recipe" className="form-control form-control-sm" id="recipe" value={assetMetadata.meta_recipe} />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="flavour" className="col-sm-3 col-form-label col-form-label-sm">
                  Flavour
                </label>
                <div className="col-sm-9">
                  <input type="text" name="meta_flavour" className="form-control form-control-sm" id="flavour" value={assetMetadata.meta_flavour} />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="packaging" className="col-sm-3 col-form-label col-form-label-sm">
                  Packaging
                </label>
                <div className="col-sm-9">
                  <select name="meta_packaging" className="custom-select custom-select-sm" id="packaging" value={assetMetadata.meta_packaging}>
                    <option>Select a packaging...</option>
                    <option value="PET">PET</option>
                    <option value="CAN">CAN</option>
                    <option value="VERRE">VERRE</option>
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="capacity" className="col-sm-3 col-form-label col-form-label-sm">
                  Capacity
                </label>
                <div className="col-sm-9">
                  <select name="meta_capacity" className="custom-select custom-select-sm" id="capacity" value={assetMetadata.meta_capacity}>
                    <option>Select a capacity...</option>
                    <option value="15cl">15cl</option>
                    <option value="25cl">25cl</option>
                    <option value="33cl">33cl</option>
                    <option value="50cl">50cl</option>
                    <option value="1l">1l</option>
                    <option value="1.5l">1.5l</option>
                    <option value="2l">2l</option>
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="format" className="col-sm-3 col-form-label col-form-label-sm">
                  Format
                </label>
                <div className="col-sm-9">
                  <select name="meta_format" className="custom-select custom-select-sm" id="format" value={assetMetadata.meta_format}>
                    <option>Select a format...</option>
                    <option value="Standard">Standard</option>
                    <option value="Lot Gratuité">Lot Gratuité</option>
                    <option value="Lot Physique">Lot Physique</option>
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="ean" className="col-sm-3 col-form-label col-form-label-sm">
                  EAN
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    name="meta_ean13"
                    pattern="[0-9]{13}"
                    placeholder="#############"
                    className="form-control form-control-sm"
                    id="meta_ean"
                    value={assetMetadata.meta_ean13}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="tags" className="col-sm-3 col-form-label col-form-label-sm">
                  Tags
                </label>
                <div className="col-sm-9">
                  <Select
                    options={tags}
                    isMulti
                    onChange={handleSelect("meta_tags")}
                    name="meta_tags"
                    id="meta_tags"
                    classNamePrefix="react-select"
                    theme={customTheme}
                    // value={assetMetadata.meta_tags}
                    value={defaultTags}
                  />
                  {/* <input type="text" name="meta_tags" className="form-control form-control-sm" id="tags" value={assetMetadata.meta_tags} /> */}
                </div>
              </div>
              {currentUser && currentUser.role !== "user" && (
                <div className="form-group row">
                  <label htmlFor="tags" className="col-sm-3 col-form-label col-form-label-sm"></label>
                  <div className="col-sm-9">
                    <button type="submit" className="btn btn-sm btn-block btn-primary">
                      Update
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

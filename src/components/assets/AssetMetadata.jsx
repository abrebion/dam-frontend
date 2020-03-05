import React, { useState, useEffect } from "react";
import Select from "react-select";
import api from "../../api/apiHandler";
import formatBytes from "../../helpers/formatBytes";

const type = [
  { value: "Product Image", label: "Product Image", meta: "type" },
  { value: "Video", label: "Video", meta: "type" },
  { value: "Presentation", label: "Presentation", meta: "type" },
  { value: "Logo", label: "Logo", meta: "type" },
  { value: "Font", label: "Font", meta: "type" },
  { value: "Brand Guideline", label: "Brand Guideline", meta: "type" }
];

const meta_brand = [
  { value: "Schweppes", label: "Schweppes", meta: "meta_brand" },
  { value: "Orangina", label: "Orangina", meta: "meta_brand" },
  { value: "Oasis", label: "Oasis", meta: "meta_brand" },
  { value: "Oasis O'Verger", label: "Oasis O'Verger", meta: "meta_brand" },
  { value: "MayTea", label: "MayTea", meta: "meta_brand" },
  { value: "Pulco", label: "Pulco", meta: "meta_brand" },
  { value: "Champomy", label: "Champomy", meta: "meta_brand" },
  { value: "Gini", label: "Gini", meta: "meta_brand" },
  { value: "Canada Dry", label: "Canada Dry", meta: "meta_brand" },
  { value: "Pampryl", label: "Pampryl", meta: "meta_brand" },
  { value: "Ricqlès", label: "Ricqlès", meta: "meta_brand" },
  { value: "Brut de Pomme", label: "Brut de Pomme", meta: "meta_brand" },
  { value: "Banga", label: "Banga", meta: "meta_brand" }
];

const meta_capacity = [
  { value: "2l", label: "2l", meta: "meta_capacity" },
  { value: "1.5l", label: "1.5l", meta: "meta_capacity" },
  { value: "1l", label: "1l", meta: "meta_capacity" },
  { value: "75cl", label: "75cl", meta: "meta_capacity" },
  { value: "50cl", label: "50cl", meta: "meta_capacity" },
  { value: "33cl", label: "33cl", meta: "meta_capacity" },
  { value: "25cl", label: "25cl", meta: "meta_capacity" },
  { value: "20cl", label: "20cl", meta: "meta_capacity" },
  { value: "15cl", label: "15cl", meta: "meta_capacity" }
];

const meta_packaging = [
  { value: "PET", label: "PET", meta: "meta_packaging" },
  { value: "CAN", label: "CAN", meta: "meta_packaging" },
  { value: "VERRE", label: "VERRE", meta: "meta_packaging" }
];

const meta_format = [
  { value: "Standard", label: "Standard", meta: "meta_format" },
  { value: "Lot Gratuité", label: "Lot Gratuité", meta: "meta_format" },
  { value: "Lot Physique", label: "Lot Physique", meta: "meta_format" }
];

const customTheme = theme => {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      primary: "#007696"
    }
  };
};

export default function AssetMetadata({ cloudinaryData, toggleUploadModal, handleSearch, searchResults, setSearchResults }) {
  const [recipes, setRecipes] = useState([]);
  const [flavours, setFlavours] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    async function fetchTags() {
      try {
        const fetchedTags = await api.get("/tags");
        const tags = fetchedTags.data.map(el => {
          return { value: el._id, label: el.name, meta: "meta_tags" };
        });
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

  const [assetMetadata, setAssetMetadata] = useState({
    name: "",
    type: "",
    meta_ean13: "",
    meta_brand: "",
    meta_recipe: "",
    meta_flavour: "",
    meta_packaging: "",
    meta_capacity: "",
    meta_format: "",
    meta_tags: []
  });

  useEffect(() => {
    setAssetMetadata({
      ...assetMetadata,
      public_id: cloudinaryData.public_id,
      secure_url: cloudinaryData.secure_url,
      meta_file_width: cloudinaryData.width,
      meta_file_height: cloudinaryData.height,
      meta_file_extension: cloudinaryData.format,
      meta_file_bytes: cloudinaryData.bytes
    });
  }, [cloudinaryData]);

  const handleInput = e => {
    setAssetMetadata({ ...assetMetadata, [e.target.name]: e.target.value });
  };

  const handleSelect = meta => {
    return selectedOptions => {
      console.log("Selected Values", selectedOptions);
      if (meta === "meta_tags") {
        selectedOptions.value = selectedOptions.map(el => el.value);
      }
      setAssetMetadata({ ...assetMetadata, [meta]: selectedOptions.value });
    };
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await api.post("/assets", assetMetadata);
      console.log(assetMetadata, response.data);
      setSearchResults([...searchResults, response.data.data]);
      handleSearch();
      toggleUploadModal();
    } catch (error) {
      console.error(error);
    }
  };

  // console.log("Cloudinary Props >>>>>", cloudinaryData);

  return (
    <form onSubmit={handleSubmit} id="new-asset-metadata">
      <div className="row">
        <div className="col-4 d-flex flex-column justify-content-center align-items-center">
          {cloudinaryData.bytes && (
            <div className="small text-muted">
              <img src={cloudinaryData.secure_url} alt="" className="img-fluid" />
              <small className="d-block">
                File details: .{cloudinaryData.format}, {cloudinaryData.width}x{cloudinaryData.height} pixels, {formatBytes(cloudinaryData.bytes)}
              </small>
              <small className="d-block">
                Fill in additional data to make it searchable.
                <br />
                Don't worry, you'll be able to edit this later as well.
              </small>
            </div>
          )}
        </div>
        <div className="col-4">
          <div className="form-group row">
            <label htmlFor="type" className="col-sm-2 col-form-label col-form-label-sm">
              Type
            </label>
            <div className="col-sm-10">
              <Select
                options={type}
                onChange={handleSelect("type")}
                name="type"
                id="brand"
                classNamePrefix="react-select"
                theme={customTheme}
                // value={assetMetadata.type}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label col-form-label-sm">
              Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                name="name"
                className="form-control form-control-sm"
                id="name"
                value={assetMetadata.name}
                onChange={handleInput}
                placeholder="Enter a descriptive name..."
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="brand" className="col-sm-2 col-form-label col-form-label-sm">
              Brand
            </label>
            <div className="col-sm-10">
              {/* <select name="meta_brand" className="custom-select custom-select-sm" id="brand" value={assetMetadata.meta_brand}>
                <option>Select a brand...</option>
                <option value="Orangina">Orangina</option>
                <option value="Schweppes">Schweppes</option>
                <option value="Oasis">Oasis</option>
                <option value="MayTea">MayTea</option>
                <option value="Pulco">Pulco</option>
              </select> */}
              <Select
                options={meta_brand}
                onChange={handleSelect("meta_brand")}
                name="meta_brand"
                id="brand"
                classNamePrefix="react-select"
                theme={customTheme}
                // value={assetMetadata.meta_brand}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="recipe" className="col-sm-2 col-form-label col-form-label-sm">
              Recipe
            </label>
            <div className="col-sm-10">
              <Select
                options={recipes}
                onChange={handleSelect("meta_recipe")}
                name="meta_recipe"
                id="brand"
                classNamePrefix="react-select"
                theme={customTheme}
                // value={assetMetadata.meta_brand}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="flavour" className="col-sm-2 col-form-label col-form-label-sm">
              Flavour
            </label>
            <div className="col-sm-10">
              <Select
                options={flavours}
                onChange={handleSelect("meta_flavour")}
                name="meta_flavour"
                id="brand"
                classNamePrefix="react-select"
                theme={customTheme}
                // value={assetMetadata.meta_brand}
              />
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="form-group row">
            <label htmlFor="packaging" className="col-sm-3 col-form-label col-form-label-sm">
              Packaging
            </label>
            <div className="col-sm-9">
              {/* <select name="meta_packaging" className="custom-select custom-select-sm" id="packaging" value={assetMetadata.meta_packaging} onChange={handleInput}>
                <option>Select a packaging...</option>
                <option value="PET">PET</option>
                <option value="CAN">CAN</option>
                <option value="VERRE">VERRE</option>
              </select> */}
              <Select
                options={meta_packaging}
                onChange={handleSelect("meta_packaging")}
                name="meta_packaging"
                id="brand"
                classNamePrefix="react-select"
                theme={customTheme}
                // value={assetMetadata.meta_packaging}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="capacity" className="col-sm-3 col-form-label col-form-label-sm">
              Capacity
            </label>
            <div className="col-sm-9">
              <Select
                options={meta_capacity}
                onChange={handleSelect("meta_capacity")}
                name="meta_capacity"
                id="brand"
                classNamePrefix="react-select"
                theme={customTheme}
                // value={assetMetadata.meta_capacity}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="format" className="col-sm-3 col-form-label col-form-label-sm">
              Format
            </label>
            <div className="col-sm-9">
              <Select
                options={meta_format}
                onChange={handleSelect("meta_format")}
                name="meta_format"
                id="brand"
                classNamePrefix="react-select"
                theme={customTheme}
                // value={assetMetadata.meta_format}
              />
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
                onChange={handleInput}
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
                // value={assetMetadata.meta_format}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

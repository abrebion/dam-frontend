import React, { useState, useEffect } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { searchAssets } from "../../redux/actions/search";
import { loadAssetFilters, setMetadata, addAsset, updateAsset } from "../../redux/actions/assets";

const customTheme = (theme) => {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      primary: "#007696",
    },
  };
};

const AddEditMetaData = ({ mode, asset, filters, loadAssetFilters, setMetadata, handleAddAsset, handleUpdateAsset, handleSearch, toggleUploadModal }) => {
  useEffect(() => {
    loadAssetFilters();
  }, []);

  const handleInput = (e) => {
    setMetadata([e.target.name], e.target.value);
  };

  const handleSelect = (meta) => {
    return (selectedOptions) => {
      if (meta === "meta_tags") {
        selectedOptions.value = selectedOptions.map((el) => el.value);
      }
      setMetadata([meta], selectedOptions.value);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "edit") {
        handleUpdateAsset(asset._id, asset);
        toggleUploadModal();
      } else {
        handleAddAsset(asset);
        handleSearch();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} id="new-asset-metadata">
      <div className="row">
        <div className="col-6">
          <div className="form-group row">
            <label htmlFor="type" className="col-sm-2 col-form-label col-form-label-sm">
              Type
            </label>
            <div className="col-sm-10">
              {/* <Select options={type} onChange={handleSelect("type")} name="type" id="brand" classNamePrefix="react-select" theme={customTheme} /> */}
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
                value={asset.name}
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
              <Select options={filters.meta_brand} onChange={handleSelect("meta_brand")} name="meta_brand" id="brand" classNamePrefix="react-select" theme={customTheme} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="recipe" className="col-sm-2 col-form-label col-form-label-sm">
              Recipe
            </label>
            <div className="col-sm-10">
              <Select options={filters.meta_recipe} onChange={handleSelect("meta_recipe")} name="meta_recipe" id="brand" classNamePrefix="react-select" theme={customTheme} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="flavour" className="col-sm-2 col-form-label col-form-label-sm">
              Flavour
            </label>
            <div className="col-sm-10">
              <Select options={filters.meta_flavour} onChange={handleSelect("meta_flavour")} name="meta_flavour" id="brand" classNamePrefix="react-select" theme={customTheme} />
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="form-group row">
            <label htmlFor="packaging" className="col-sm-3 col-form-label col-form-label-sm">
              Packaging
            </label>
            <div className="col-sm-9">
              <Select
                options={filters.meta_packaging}
                onChange={handleSelect("meta_packaging")}
                name="meta_packaging"
                id="brand"
                classNamePrefix="react-select"
                theme={customTheme}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="capacity" className="col-sm-3 col-form-label col-form-label-sm">
              Capacity
            </label>
            <div className="col-sm-9">
              <Select options={filters.meta_capacity} onChange={handleSelect("meta_capacity")} name="meta_capacity" id="brand" classNamePrefix="react-select" theme={customTheme} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="format" className="col-sm-3 col-form-label col-form-label-sm">
              Format
            </label>
            <div className="col-sm-9">
              <Select options={filters.meta_format} onChange={handleSelect("meta_format")} name="meta_format" id="brand" classNamePrefix="react-select" theme={customTheme} />
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
                value={asset.meta_ean13}
                onChange={handleInput}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="tags" className="col-sm-3 col-form-label col-form-label-sm">
              Tags
            </label>
            <div className="col-sm-9">
              <Select options={filters.meta_tags} isMulti onChange={handleSelect("meta_tags")} name="meta_tags" id="meta_tags" classNamePrefix="react-select" theme={customTheme} />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  filters: state.assets.filters,
});

const mapDispatchToProps = (dispatch) => ({
  handleSearch: (url) => dispatch(searchAssets(url)),
  loadAssetFilters: () => dispatch(loadAssetFilters()),
  setMetadata: (field, value) => dispatch(setMetadata(field, value)),
  handleAddAsset: (asset) => dispatch(addAsset(asset)),
  handleUpdateAsset: (id, asset) => dispatch(updateAsset(id, asset)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEditMetaData);

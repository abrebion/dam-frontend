import React, { useState, useEffect } from "react";
import Select from "react-select";
import api from "../../api/apiHandler";
import formatBytes from "../../helpers/formatBytes";

// Redux Store
import { connect } from "react-redux";
import { searchAssets } from "../../redux/actions/search";
import { loadAssetFilters } from "../../redux/actions/assets";

const type = [
  { value: "Product Image", label: "Product Image", meta: "type" },
  { value: "Video", label: "Video", meta: "type" },
  { value: "Presentation", label: "Presentation", meta: "type" },
  { value: "Logo", label: "Logo", meta: "type" },
  { value: "Font", label: "Font", meta: "type" },
  { value: "Brand Guideline", label: "Brand Guideline", meta: "type" },
];

const customTheme = (theme) => {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      primary: "#007696",
    },
  };
};

const AssetMetadata = ({ cloudinaryData, toggleUploadModal, filters, loadAssetFilters, handleSearch }) => {
  useEffect(() => {
    loadAssetFilters();
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
    meta_tags: [],
  });

  useEffect(() => {
    setAssetMetadata({
      ...assetMetadata,
      public_id: cloudinaryData.public_id,
      secure_url: cloudinaryData.secure_url,
      meta_file_width: cloudinaryData.width,
      meta_file_height: cloudinaryData.height,
      meta_file_extension: cloudinaryData.format,
      meta_file_bytes: cloudinaryData.bytes,
    });
  }, [cloudinaryData]);

  const handleInput = (e) => {
    setAssetMetadata({ ...assetMetadata, [e.target.name]: e.target.value });
  };

  const handleSelect = (meta) => {
    return (selectedOptions) => {
      if (meta === "meta_tags") {
        selectedOptions.value = selectedOptions.map((el) => el.value);
      }
      setAssetMetadata({ ...assetMetadata, [meta]: selectedOptions.value });
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/assets", assetMetadata);
      handleSearch();
      toggleUploadModal();
    } catch (error) {
      console.error(error);
    }
  };

  const setAspectRatioClass = (width, height) => {
    if (width > height) return "landscape";
    return "portrait";
  };

  return (
    <form onSubmit={handleSubmit} id="new-asset-metadata">
      <div className="row">
        <div className="col-4 d-flex flex-column justify-content-center align-items-center">
          {cloudinaryData.bytes && (
            <React.Fragment>
              <img
                src={cloudinaryData.secure_url.replace("/image/upload/", "/image/upload/h_300/")}
                alt=""
                className={"upload-" + setAspectRatioClass(cloudinaryData.width, cloudinaryData.height)}
              />
              <div className="small text-muted">
                <small className="d-block">
                  File details: .{cloudinaryData.format}, {cloudinaryData.width}x{cloudinaryData.height} pixels, {formatBytes(cloudinaryData.bytes)}
                </small>
                <small className="d-block">
                  Fill in additional data to make it searchable.
                  <br />
                  Don't worry, you'll be able to edit this later as well.
                </small>
              </div>
            </React.Fragment>
          )}
        </div>
        <div className="col-4">
          <div className="form-group row">
            <label htmlFor="type" className="col-sm-2 col-form-label col-form-label-sm">
              Type
            </label>
            <div className="col-sm-10">
              <Select options={type} onChange={handleSelect("type")} name="type" id="brand" classNamePrefix="react-select" theme={customTheme} />
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
        <div className="col-4">
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
});

export default connect(mapStateToProps, mapDispatchToProps)(AssetMetadata);

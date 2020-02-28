import React, { useState } from "react";
import api from "../api/apiHandler";

export default function AssetMetadata({ cloudinaryData }) {
  const [assetMetadata, setAssetMetadata] = useState({
    cloudinary_public_id: "",
    url_original: "",
    name: "Schweppes Agrumes 1.5l",
    type: "Product Image",
    meta_ean13: "1234567890123",
    meta_brand: "Schweppes",
    meta_recipe: "Schweppes Fruit",
    meta_flavour: "Schweppes Agrumes",
    meta_packaging: "PET",
    meta_capacity: "1.5l",
    meta_format: "Standard",
    meta_tags: []
    // meta_width: "1920",
    // meta_height: "1080",
    // meta_extension: "png",
    // meta_bytes: "3000000"
  });

  const handleInput = e => {
    setAssetMetadata({ ...assetMetadata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const insertedAsset = await api.post("/assets", assetMetadata);
      console.log(insertedAsset);
    } catch (error) {
      console.error(error);
    }
  };

  function formatBytes(a, b) {
    if (0 == a) return "0 Bytes";
    var c = 1024,
      d = b || 2,
      e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
      f = Math.floor(Math.log(a) / Math.log(c));
    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f];
  }
  console.log("Cloudinary Props >>>>>", cloudinaryData);

  return (
    <form onChange={handleInput} onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-4 d-flex flex-column justify-content-center align-items-center">
          {cloudinaryData.bytes && (
            <div>
              <img src={cloudinaryData.secure_url} alt="" className="img-fluid" />
              <small className="d-block">
                File details:<br></br>.{cloudinaryData.format}, {cloudinaryData.width}x{cloudinaryData.height} pixels, {formatBytes(cloudinaryData.bytes)}
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
            <label htmlFor="name" className="col-sm-2 col-form-label col-form-label-sm">
              Name
            </label>
            <div className="col-sm-10">
              <input type="text" name="name" className="form-control form-control-sm" id="name" value={assetMetadata.name} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="brand" className="col-sm-2 col-form-label col-form-label-sm">
              Brand
            </label>
            <div className="col-sm-10">
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
            <label htmlFor="recipe" className="col-sm-2 col-form-label col-form-label-sm">
              Recipe
            </label>
            <div className="col-sm-10">
              <input type="text" name="meta_recipe" className="form-control form-control-sm" id="recipe" value={assetMetadata.meta_recipe} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="flavour" className="col-sm-2 col-form-label col-form-label-sm">
              Flavour
            </label>
            <div className="col-sm-10">
              <input type="text" name="meta_flavour" className="form-control form-control-sm" id="flavour" value={assetMetadata.meta_flavour} />
            </div>
          </div>
        </div>
        <div className="col-4">
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
              <input type="text" name="meta_tags" className="form-control form-control-sm" id="tags" value={assetMetadata.meta_tags} />
            </div>
          </div>
          <fieldset>
            <input type="hidden" name="cloudinary_public_id" defaultValue={cloudinaryData.public_id} />
            <input type="hidden" name="url_original" defaultValue={cloudinaryData.secure_url} />
            <input type="hidden" name="meta_width" defaultValue={cloudinaryData.width} />
            <input type="hidden" name="meta_height" defaultValue={cloudinaryData.height} />
            <input type="hidden" name="meta_extension" defaultValue={cloudinaryData.format} />
            <input type="hidden" name="meta_bytes" defaultValue={cloudinaryData.bytes} />
          </fieldset>
        </div>
        {/* <div className="col-3">
          <fieldset disabled>
            <div className="form-group row">
              <label className="col-sm-6 col-form-label col-form-label-sm text-nowrap">
                <small>File Width</small>
              </label>
              <div className="col-sm-6">
                <label className="col-sm-6 col-form-label col-form-label-sm text-nowrap">
                  <small className="text-muted">{cloudinaryData.width}</small>
                </label>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="height" className="col-sm-6 col-form-label col-form-label-sm text-nowrap">
                <small>File Height</small>
              </label>
              <div className="col-sm-6">
                <label className="col-sm-6 col-form-label col-form-label-sm text-nowrap">
                  <small className="text-muted">{cloudinaryData.height}</small>
                </label>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="extension" className="col-sm-6 col-form-label col-form-label-sm text-nowrap">
                <small>File Extension</small>
              </label>
              <div className="col-sm-6">
                <label className="col-sm-6 col-form-label col-form-label-sm text-nowrap">
                  <small className="text-muted">{cloudinaryData.format}</small>
                </label>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="bytes" className="col-sm-6 col-form-label col-form-label-sm text-nowrap">
                <small>File Bytes</small>
              </label>
              <div className="col-sm-6">
                <label className="col-sm-6 col-form-label col-form-label-sm text-nowrap">
                  <small className="text-muted">{cloudinaryData.bytes}</small>
                </label>
              </div>
            </div>
          </fieldset>
        </div> */}
      </div>
    </form>
  );
}

import React from "react";
import AssetUploader from "./AssetUploader";
import { useState } from "react";

export default function NewAssetModal({ toggleUploadModal }) {
  const [showSaveButton, setShowSaveButton] = useState(false);
  const toggleSaveButton = () => {
    setShowSaveButton(true);
  };
  return (
    <div className="upload-modal-container">
      <div className="upload-modal" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Upload Asset
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={toggleUploadModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <AssetUploader toggleSaveButton={toggleSaveButton} toggleUploadModal={toggleUploadModal} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={toggleUploadModal}>
                Cancel
              </button>
              {showSaveButton && (
                <button form="new-asset-metadata" type="submit" className="btn btn-primary">
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

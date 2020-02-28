import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import AssetMetadata from "./AssetMetadata";

const getColor = props => {
  if (props.isDragAccept) {
    return "#4a903c";
  }
  if (props.isDragReject) {
    return "#ce071c";
  }
  if (props.isDragActive) {
    return "#f69f03";
  }
  return "#cacaca";
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 40px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: ${props => getColor(props)};
  outline: none;
  transition: all 0.24s ease-in-out;
  cursor: pointer;
  &:hover {
    color: #4a903c;
    border-color: #4a903c};
  }
`;

function Dropzone(props) {
  const [asset, setAsset] = useState({});

  const onDrop = useCallback(acceptedFiles => {
    // Upload file to Cloudinary using XHR and a direct call to the Cloudinary API
    const uploaders = acceptedFiles.map(file => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
      formData.append("api_key", process.env.REACT_APP_CLOUDINARY_KEY);
      formData.append("timestamp", Date.now());
      return axios
        .post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, formData, {
          headers: { "X-Requested-With": "XMLHttpRequest" }
        })
        .then(response => {
          setAsset({ ...response.data });
        });
    });
    axios.all(uploaders).then(() => {});
  }, []);

  const { getRootProps, getInputProps, acceptedFiles, isDragActive, isDragAccept, isDragReject } = useDropzone({ onDrop, multiple: false, accept: "image/*" });

  return (
    <div>
      {acceptedFiles.length === 0 && (
        <Container {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
          <input {...getInputProps()} />
          <FontAwesomeIcon icon="upload" size="3x" />
          <p className="mt-3">Drag 'n' drop a file here, or click to select one</p>
        </Container>
      )}
      {acceptedFiles.length > 0 && <AssetMetadata cloudinaryData={asset} />}
    </div>
  );
}

export default function AssetUploader({ toggleUploadModal }) {
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
              <Dropzone />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={toggleUploadModal}>
                Cancel
              </button>
              <button type="button" className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

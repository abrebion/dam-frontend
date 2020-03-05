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
    color: #007696;
    border-color: #007696};
  }
`;

export default function AssetUploader({ mode, toggleSaveButton, toggleUploadModal, handleSearch, searchResults, setSearchResults }) {
  const [asset, setAsset] = useState({});

  const onDrop = useCallback(
    acceptedFiles => {
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
      axios.all(uploaders).then(() => {
        if (mode === "add") toggleSaveButton();
      });
    },
    [toggleSaveButton]
  );

  const { getRootProps, getInputProps, acceptedFiles, isDragActive, isDragAccept, isDragReject } = useDropzone({ onDrop, multiple: false, accept: "image/*" });

  return (
    <div>
      {acceptedFiles.length === 0 && (
        <Container {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
          <input {...getInputProps()} />
          <FontAwesomeIcon icon="upload" size="3x" />
          <p className="mt-3 upload-text">Drag 'n' drop a file here, or click to select one</p>
        </Container>
      )}
      {acceptedFiles.length > 0 && mode === "add" && (
        <AssetMetadata cloudinaryData={asset} toggleUploadModal={toggleUploadModal} handleSearch={handleSearch} searchResults={searchResults} setSearchResults={setSearchResults} />
      )}
    </div>
  );
}

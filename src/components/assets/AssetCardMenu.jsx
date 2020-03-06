import React, { useState, useEffect, useRef, useContext } from "react";
import { useWindowDimensions } from "../../helpers/useWindowDimensions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserContext from "../../authentication/UserContext";
import "@github/clipboard-copy-element";

export default function AssetCardMenu({ asset, handleToggleEditMenu, handleTogglePanel, handleAssetDelete }) {
  const menu = useRef(null);
  const { width: windowWidth } = useWindowDimensions();
  const [menuClass, setMenuClass] = useState("");
  const userContext = useContext(UserContext);
  const { currentUser } = userContext;

  useEffect(() => {
    if (menu.current.getBoundingClientRect().right > windowWidth) {
      //   console.log(menu.current.getBoundingClientRect().right);
      setMenuClass("offset");
    }
    document.addEventListener("mousedown", handleClick, false);
    return () => {
      document.removeEventListener("mousedown", handleClick, false);
      handleToggleEditMenu(asset);
    };
  });

  const handleClick = e => {
    if (menu.current.contains(e.target)) {
      return;
    }
    handleToggleEditMenu(asset);
  };

  const downloadImage = async (url, name) => {
    let blob = await fetch(url).then(r => r.blob());
    let dataUrl = await new Promise(resolve => {
      let reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
    // console.log(dataUrl);
    const link = document.createElement("a");
    link.download = name;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const createImage = options => {
    options = options || {};
    const img = document.createElement("img");
    if (options.src) {
      img.src = options.src;
    }
    return img;
  };

  const copyToClipboard = async pngBlob => {
    try {
      await navigator.clipboard.write([
        // eslint-disable-next-line no-undef
        new ClipboardItem({
          [pngBlob.type]: pngBlob
        })
      ]);
      console.log("Image copied");
    } catch (error) {
      console.error(error);
    }
  };

  const convertToPng = imgBlob => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const imageEl = createImage({ src: window.URL.createObjectURL(imgBlob) });
    imageEl.onload = e => {
      canvas.width = e.target.width;
      canvas.height = e.target.height;
      ctx.drawImage(e.target, 0, 0, e.target.width, e.target.height);
      canvas.toBlob(copyToClipboard, "image/png", 1);
    };
  };

  const copyImageToClipbaord = async src => {
    const img = await fetch(src);
    const imgBlob = await img.blob();
    const extension = src.split(".").pop();
    const supportedToBeConverted = ["jpeg", "jpg", "gif"];
    if (supportedToBeConverted.indexOf(extension.toLowerCase())) {
      return convertToPng(imgBlob);
    } else if (extension.toLowerCase() === "png") {
      return copyToClipboard(imgBlob);
    }
    console.error("Format unsupported");
    return;
  };

  return (
    <div className={"card-menu text-muted " + menuClass} ref={menu}>
      {currentUser.role !== "user" ? (
        <span onClick={() => handleTogglePanel(asset)}>
          <FontAwesomeIcon icon="edit" />
          Edit
        </span>
      ) : (
        <span onClick={() => handleTogglePanel(asset)}>
          <FontAwesomeIcon icon={["far", "eye"]} />
          Quick View
        </span>
      )}
      <span
        onClick={() => {
          copyImageToClipbaord(asset.secure_url);
          handleToggleEditMenu(asset);
        }}
      >
        <FontAwesomeIcon icon="copy" />
        Copy to Clipboard
      </span>
      <span
        onClick={() => {
          downloadImage(asset.secure_url, asset.name);
          handleToggleEditMenu(asset);
        }}
      >
        <FontAwesomeIcon icon="download" />
        Download
      </span>
      <span onClick={() => handleToggleEditMenu(asset)}>
        <FontAwesomeIcon icon="link" />
        <clipboard-copy value={asset.secure_url}>Copy URL</clipboard-copy>
      </span>
      {/* <span>
        <FontAwesomeIcon icon="folder-plus" />
        Add to Collection
      </span> */}
      {currentUser.role !== "user" && (
        <span onClick={() => handleAssetDelete(asset._id)}>
          <FontAwesomeIcon icon="trash-alt" />
          Delete
        </span>
      )}
    </div>
  );
}

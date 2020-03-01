import React, { useState, useEffect, useRef } from "react";
import { useWindowDimensions } from "../helpers/useWindowDimensions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AssetCardMenu({ handleToggleEditMenu, handleTogglePanel }) {
  const menu = useRef(null);
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const [menuClass, setMenuClass] = useState("");

  useEffect(() => {
    if (menu.current.getBoundingClientRect().right > windowWidth) {
      //   console.log(menu.current.getBoundingClientRect().right);
      setMenuClass("offset");
    }
    document.addEventListener("mousedown", handleClick, false);
    return () => {
      document.removeEventListener("mousedown", handleClick, false);
    };
  });

  const handleClick = e => {
    if (menu.current.contains(e.target)) {
      return;
    }
    handleToggleEditMenu();
    // document.removeEventListener("mousedown", handleClick, false);
  };

  return (
    <div className={"card-menu text-muted " + menuClass} ref={menu}>
      <span onClick={handleTogglePanel}>
        <FontAwesomeIcon icon={["far", "eye"]} />
        Quick View
      </span>
      <span onClick={handleTogglePanel}>
        <FontAwesomeIcon icon="edit" />
        Edit
      </span>
      <span>
        <FontAwesomeIcon icon="download" />
        Download
      </span>
      <span>
        <FontAwesomeIcon icon="link" />
        Copy URL
      </span>
      <span>
        <FontAwesomeIcon icon="folder-plus" />
        Add to Collection
      </span>
      <span>
        <FontAwesomeIcon icon="trash-alt" />
        Delete
      </span>
    </div>
  );
}

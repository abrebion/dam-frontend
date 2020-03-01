import React, { useState, useEffect, useRef, useContext } from "react";
import { useWindowDimensions } from "../helpers/useWindowDimensions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserContext from "../authentication/UserContext";

export default function AssetCardMenu({ asset, handleToggleEditMenu, handleTogglePanel }) {
  const menu = useRef(null);
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
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
      {currentUser.role !== "user" && (
        <span>
          <FontAwesomeIcon icon="trash-alt" />
          Delete
        </span>
      )}
    </div>
  );
}

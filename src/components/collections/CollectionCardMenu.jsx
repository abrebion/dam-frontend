import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useWindowDimensions } from "../../helpers/useWindowDimensions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@github/clipboard-copy-element";

export default function CollectionCardMenu({ collection, handleToggleMenu, handleDelete, handleShare }) {
  const menu = useRef(null);
  const { width: windowWidth } = useWindowDimensions();
  const [menuClass, setMenuClass] = useState("");

  useEffect(() => {
    if (menu.current.getBoundingClientRect().right > windowWidth) {
      setMenuClass("offset");
    }
    document.addEventListener("mousedown", handleClick, false);
    return () => {
      document.removeEventListener("mousedown", handleClick, false);
      handleToggleMenu(collection);
    };
  }, []);

  const handleClick = e => {
    if (menu.current.contains(e.target)) {
      return;
    }
    handleToggleMenu(collection);
  };

  return (
    <div className={"card-menu text-muted " + menuClass} ref={menu}>
      <span>
        <Link to={"/dashboard/" + collection._id} className="link">
          <FontAwesomeIcon icon="edit" />
          Edit
        </Link>
      </span>
      <span
        onClick={() => {
          handleShare(collection._id, "create");
          handleToggleMenu(collection);
        }}
      >
        <FontAwesomeIcon icon="download" />
        Download Archive
      </span>
      <span
        onClick={() => {
          handleShare(collection._id, "download");
          handleToggleMenu(collection);
        }}
      >
        <FontAwesomeIcon icon="link" />
        Get Shareable URL
      </span>
      <span
        onClick={() => {
          handleDelete(collection._id);
          handleToggleMenu(collection);
        }}
      >
        <FontAwesomeIcon icon="trash-alt" />
        Delete
      </span>
    </div>
  );
}

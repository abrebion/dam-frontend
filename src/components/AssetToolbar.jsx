import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserContext from "../authentication/UserContext";

export default function AssetToolbar({ userSelection, selectAll, clearAll, shareSelection }) {
  const userContext = useContext(UserContext);
  const { currentUser } = userContext;
  return (
    <div className="asset-toolbar mb-4 text-muted" style={{ backgroundColor: "white" }}>
      <ul>
        <li onClick={selectAll}>
          <FontAwesomeIcon icon={["far", "plus-square"]} />
          <span>Select All</span>
        </li>
        <li onClick={clearAll}>
          <FontAwesomeIcon icon={["far", "minus-square"]} />
          <span>Clear Selection</span>
        </li>
        <li className="no-link">
          <FontAwesomeIcon icon="check-circle" />
          <span>{userSelection.length} Selected</span>
        </li>
      </ul>
      <ul className="flex-xl-fill justify-content-xl-end">
        <li onClick={userSelection.length ? () => shareSelection("create") : undefined} className={!userSelection.length ? "inactive-link" : undefined}>
          <FontAwesomeIcon icon="download" />
          <span>Download</span>
        </li>
        <li onClick={userSelection.length ? () => shareSelection("download") : undefined} className={!userSelection.length ? "inactive-link" : undefined}>
          <FontAwesomeIcon icon={["far", "file-archive"]} />
          <span>Get Shareable Link</span>
        </li>
        <li className={!userSelection.length ? "inactive-link" : undefined}>
          <FontAwesomeIcon icon="folder-plus" />
          <span>Add to Collection</span>
        </li>
      </ul>
      {currentUser && currentUser.role !== "user" && (
        <ul>
          <li className={!userSelection.length ? "inactive-link" : undefined}>
            <FontAwesomeIcon icon="edit" />
            <span>Bulk Edit</span>
          </li>
          <li className={!userSelection.length ? "inactive-link" : undefined}>
            <FontAwesomeIcon icon="trash-alt" />
            <span>Delete</span>
          </li>
        </ul>
      )}
    </div>
  );
}

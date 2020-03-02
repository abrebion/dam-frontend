import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserContext from "../authentication/UserContext";

export default function AssetToolbar({ userSelection, selectAll, clearAll }) {
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
        <li>
          <FontAwesomeIcon icon="check-circle" />
          <span>{userSelection.length} Selected</span>
        </li>
      </ul>
      <ul className="flex-xl-fill justify-content-xl-end">
        <li>
          <FontAwesomeIcon icon="download" />
          <span>Download</span>
        </li>
        <li>
          <FontAwesomeIcon icon={["far", "file-archive"]} />
          <span>Create Archive</span>
        </li>
        <li>
          <FontAwesomeIcon icon="folder-plus" />
          <span>Add to Collection</span>
        </li>
      </ul>
      {currentUser && currentUser.role !== "user" && (
        <ul>
          <li>
            <FontAwesomeIcon icon="edit" />
            <span>Bulk Edit</span>
          </li>
          <li>
            <FontAwesomeIcon icon="trash-alt" />
            <span>Delete</span>
          </li>
        </ul>
      )}
    </div>
  );
}

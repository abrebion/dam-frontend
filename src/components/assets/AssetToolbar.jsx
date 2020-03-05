import React, { useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserContext from "../../authentication/UserContext";
import api from "../../api/apiHandler";

export default withRouter(function AssetToolbar({
  userSelection,
  selectAll,
  clearAll,
  shareSelection,
  activeCollection,
  setActiveCollection,
  refreshActiveCollection,
  addToActiveCollection,
  removeFromActiveCollection,
  match
}) {
  const userContext = useContext(UserContext);
  const { currentUser } = userContext;

  // useEffect(() => {
  //   if (match.params.id && currentUser && currentUser.collections) {
  //     setActiveCollection(currentUser.collections.find(el => el._id === match.params.id));
  //   }
  // }, []);

  return (
    <React.Fragment>
      {activeCollection && (
        <div className="active-collection-toolbar mb-2 text-muted small">
          <ul>
            <li>
              You're editing:{" "}
              <strong>
                <em>{activeCollection.name}</em>
              </strong>
            </li>
          </ul>
          <ul>
            <li onClick={refreshActiveCollection}>
              <FontAwesomeIcon icon="sync-alt" />
              <span>Refresh Collection [{activeCollection.assets.length} files]</span>
            </li>
            <li>
              <FontAwesomeIcon icon="download" />
              <span>Download Archive</span>
            </li>
            <li>
              <FontAwesomeIcon icon={["far", "file-archive"]} />
              <span>Get Shareable Link</span>
            </li>
          </ul>
        </div>
      )}
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
        {activeCollection ? (
          <ul>
            <li className={!userSelection.length ? "inactive-link" : undefined} onClick={userSelection.length ? () => addToActiveCollection(userSelection) : undefined}>
              <FontAwesomeIcon icon="folder-plus" />
              <span>Add Selection to Collection</span>
            </li>
            <li className={!userSelection.length ? "inactive-link" : undefined} onClick={userSelection.length ? () => removeFromActiveCollection(userSelection) : undefined}>
              <FontAwesomeIcon icon="folder-minus" />
              <span>Remove Selection from Collection</span>
            </li>
          </ul>
        ) : (
          <React.Fragment>
            <ul className="flex-xl-fill justify-content-xl-end">
              <li onClick={userSelection.length ? () => shareSelection("create") : undefined} className={!userSelection.length ? "inactive-link" : undefined}>
                <FontAwesomeIcon icon="download" />
                <span>Download Archive</span>
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
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
});

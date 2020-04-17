import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserContext from "../../authentication/UserContext";
import { connect } from "react-redux";
import { addAllToSelection, removeAllFromSelection } from "../../redux/actions/selection";

const AssetToolbar = ({
  selection,
  assets,
  match,
  selectAll,
  clearAll,
  shareSelection,
  activeCollection,
  setActiveCollection,
  refreshActiveCollection,
  addToActiveCollection,
  removeFromActiveCollection,
}) => {
  const userContext = useContext(UserContext);
  const { currentUser } = userContext;

  // useEffect(() => {
  //   if (match.params.id && currentUser && currentUser.collections) {
  //     setActiveCollection(currentUser.collections.find(el => el._id === match.params.id));
  //   }
  // }, []);

  return (
    <React.Fragment>
      {activeCollection && match.params.id && (
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
          <li onClick={() => selectAll(assets)}>
            <FontAwesomeIcon icon={["far", "plus-square"]} />
            <span>Select All</span>
          </li>
          <li onClick={clearAll}>
            <FontAwesomeIcon icon={["far", "minus-square"]} />
            <span>Clear Selection</span>
          </li>
          <li className="no-link">
            <FontAwesomeIcon icon="check-circle" />
            <span>{selection.length} Selected</span>
          </li>
        </ul>
        {activeCollection && match.params.id ? (
          <ul>
            <li className={!selection.length ? "inactive-link" : undefined} onClick={selection.length ? () => addToActiveCollection(selection) : undefined}>
              <FontAwesomeIcon icon="folder-plus" />
              <span>Add Selection to Collection</span>
            </li>
            <li className={!selection.length ? "inactive-link" : undefined} onClick={selection.length ? () => removeFromActiveCollection(selection) : undefined}>
              <FontAwesomeIcon icon="folder-minus" />
              <span>Remove Selection from Collection</span>
            </li>
          </ul>
        ) : (
          <React.Fragment>
            <ul className="flex-xl-fill justify-content-xl-end">
              <li onClick={selection.length ? () => shareSelection("create") : undefined} className={!selection.length ? "inactive-link" : undefined}>
                <FontAwesomeIcon icon="download" />
                <span>Download Archive</span>
              </li>
              <li onClick={selection.length ? () => shareSelection("download") : undefined} className={!selection.length ? "inactive-link" : undefined}>
                <FontAwesomeIcon icon={["far", "file-archive"]} />
                <span>Get Shareable URL</span>
              </li>
              {/* <li className={!selection.length ? "inactive-link" : undefined}>
                <FontAwesomeIcon icon="folder-plus" />
                <span>Add to Collection</span>
              </li> */}
            </ul>
            {currentUser && currentUser.role !== "user" && (
              <ul>
                <li className={!selection.length ? "inactive-link" : undefined}>
                  <FontAwesomeIcon icon="edit" />
                  <span>Bulk Edit</span>
                </li>
                <li className={!selection.length ? "inactive-link" : undefined}>
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
};

const mapStateToProps = (state) => ({
  assets: state.search.results,
  selection: state.selection,
});

const mapDispatchToProps = (dispatch) => {
  return {
    selectAll: (assets) => {
      dispatch(addAllToSelection(assets));
    },
    clearAll: () => {
      dispatch(removeAllFromSelection());
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AssetToolbar));

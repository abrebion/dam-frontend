import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CollectionCardMenu from "./CollectionCardMenu";
import moment from "moment";

export default function CollectionCard({ collection, handleDelete, handleShare }) {
  const [toggleEditMenu, setToggleEditMenu] = useState(false);

  const handleToggleMenu = () => {
    setToggleEditMenu(!toggleEditMenu);
  };

  useEffect(() => {
    setToggleEditMenu(toggleEditMenu);
  }, []);

  return (
    <>
      <div className="col mb-4">
        <div className="card">
          <div className="card-menu-btn">
            <FontAwesomeIcon icon="ellipsis-v" onClick={handleToggleMenu} />
          </div>
          <div className="card-body">
            <div className="text-truncate small mb-3">{collection.name}</div>
            <div className="d-flex flex-column text-muted small">
              <div className="d-flex justify-content-between">
                <span>Files in Collection</span> <span>{collection.assets.length}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Created</span> <span>{moment(collection.createdAt).format("LL")}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Updated</span>
                <span>
                  {moment(collection.updatedAt)
                    .startOf("day")
                    .fromNow()}
                </span>
              </div>
            </div>
          </div>
        </div>
        {toggleEditMenu === true && <CollectionCardMenu collection={collection} handleToggleMenu={handleToggleMenu} handleDelete={handleDelete} handleShare={handleShare} />}
      </div>
    </>
  );
}

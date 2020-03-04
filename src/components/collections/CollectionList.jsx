import React from "react";
import CollectionCard from "./CollectionCard";

export default function CollectionList({ collections, handleDelete, handleShare }) {
  return (
    <div>
      {collections.length ? (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4">
          {collections.map((collection, i) => (
            <CollectionCard key={i} collection={collection} handleDelete={handleDelete} handleShare={handleShare} />
          ))}
        </div>
      ) : (
        <p>You don't have any collections at the moment.</p>
      )}
    </div>
  );
}

import React from "react";

export default function NoResults() {
  return (
    <div className="row">
      <div className="col">
        <small className="text-danger">
          Sorry, no results match your search.
          <br />
          Please, try another set of filters.
        </small>
      </div>
    </div>
  );
}

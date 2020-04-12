import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../authentication/UserContext";
import { connect } from "react-redux";
import { toogleUploader } from "../../redux/actions/assets";

const Navigation = ({ toggleUploadModal }) => {
  const userContext = useContext(UserContext);
  const { currentUser } = userContext;

  return (
    <div>
      <Link to="/dashboard">
        <button type="button" className="btn btn-outline-primary btn-sm">
          Search Assets
        </button>
      </Link>
      <Link to="/collections">
        <button type="button" className="btn btn-outline-primary btn-sm ml-2">
          My Collections
        </button>
      </Link>
      {currentUser.role !== "user" && (
        <button type="button" className="btn btn-primary btn-sm ml-2" onClick={toggleUploadModal}>
          Upload Asset
        </button>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  toggleUploadModal: () => dispatch(toogleUploader()),
});

export default connect(undefined, mapDispatchToProps)(Navigation);

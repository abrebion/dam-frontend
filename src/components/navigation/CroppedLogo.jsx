import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import croppedLogo from "../../assets/images/logo-cropped.svg";

const CustomLogo = styled.img`
  width: ${props => (props.width ? props.width : "")};
`;

export default function CroppedLogo(props) {
  return (
    <div>
      <Link to="/">
        <CustomLogo src={croppedLogo} alt="Orangina Suntory France - DAM" {...props} />
      </Link>
    </div>
  );
}

import { Typography, Link } from "@mui/material";
import React from "react";

const TypographyLink = (props) => {
  return (
    <Link
      onClick={props.onClick}
      underline="none"
      style={{ cursor: "pointer" }}
    >
      <Typography style={props.style} my={props.my}>
        {props.children}
      </Typography>
    </Link>
  );
};

export default TypographyLink;

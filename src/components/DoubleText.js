import { Typography } from "@mui/material";
import React from "react";

const DoubleTextComponent = (props) => {
  const { backText, frontText } = props;
  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "5vw",
          marginTop: props.marginTop || "3.5vw",
          marginBottom: props.marginBottom || "2vw",
        }}
      >
        <div style={{ position: "absolute", left: "50%" }}>
          <Typography
            style={{
              position: "relative",
              left: props.left || "-50%",
              fontFamily: props.backTextFontFamily || "Cookie",
              fontSize: props.backTextFontSize || "7vw",
              color: "#928C8C4D",
            }}
          >
            {backText}
          </Typography>
        </div>
        <div style={{ position: "absolute", left: "50%" }}>
          <Typography
            style={{
              borderBottom: props.underline === false || "4px solid black",
              position: "relative",
              left: props.left || "-50%",
              top: props.frontTextTopDistance || "4vw",
              fontFamily: props.frontTextFontFamily || "Playfair Display",
              fontSize: props.frontTextFontSize || "3.5vw",
              fontWeight: props.frontFontWeight,
              color: "#222"
            }}
          >
            {frontText}
          </Typography>
        </div>
      </div>
    </>
  );
};

export default DoubleTextComponent;

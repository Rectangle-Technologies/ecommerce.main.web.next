import React from "react";

const Desktop = (props) => {
  const show = typeof window !== "undefined" && window.innerWidth > 950;
  return (
    <div style={{ display: show ? "block" : "none", width: "100%" }}>
      {props.children}
    </div>
  );
};

export default Desktop;

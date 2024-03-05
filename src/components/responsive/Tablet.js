import React from "react";

const Tablet = (props) => {
    const show = window.innerWidth <= 950 && window.innerWidth > 500;
    return (<div style={{ display: show ? "block" : "none", width: "100%" }}>
        {props.children}
    </div>)
}

export default Tablet;
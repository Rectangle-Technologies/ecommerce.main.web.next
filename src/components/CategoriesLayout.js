import { Typography } from "@mui/material";
import React from "react";

const CategoriesLayout = (props) => {
    return (
        <>
            <div style={{ position: "relative", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <img style={{ aspectRatio: 0.67, width: "100%", objectFit: "cover", borderRadius: "5px" }} src={props.image} />
                <div style={{ position: "absolute", width: "100%", height: "64px", backgroundColor: "rgba(255, 255, 255, 0.8)", bottom: "0" }}>
                    <center>
                    <Typography style={{ fontFamily: "Kaushan Script", fontSize: "24px", color: "#EB31E2", marginTop: "1vw" }}>{props.title}</Typography>
                    </center>
                </div>
            </div>
        </>
    )
}

export default CategoriesLayout;
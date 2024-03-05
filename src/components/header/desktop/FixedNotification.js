import React from "react";
import { Typography } from "@mui/material";
import PhoneIcon from '@mui/icons-material/Phone';

const FixedNotificationDesktop = (props) => {
    return (
        <div style={{
            height: "40px",
            backgroundColor: "#EB31E2",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0px 10px 0px 10px"
        }}>
            <div style={{width: "150px"}} ></div>
            <div style={{
                display: "flex"
            }}>
                <Typography style={{ fontFamily: "Poppins", color: "white" }}>Upto &nbsp;</Typography>
                <Typography color="#330C3E" style={{ fontFamily: "Poppins" }}>50%&nbsp;</Typography>
                <Typography style={{ fontFamily: "Poppins", color: "white" }}>Sale on&nbsp;</Typography>
                <Typography color="#330C3E" style={{ fontFamily: "Poppins" }}>SALE ITEMS&nbsp;</Typography>
                <Typography style={{ fontFamily: "Poppins", color: "white" }}>Shop now</Typography>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }} >
                <PhoneIcon style={{ color: "white" }}/>
                <Typography style={{ fontFamily: "Poppins", color: "white" }}> +91 45678 91011</Typography>
            </div>
        </div>
    )
}

export default FixedNotificationDesktop;
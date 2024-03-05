import React from "react";
import { Typography } from "@mui/material";
import PhoneIcon from '@mui/icons-material/Phone';

const FixedNotificationMobile = (props) => {
    return (
        <div style={{
            height: "13vw",
            width: "100%",
            backgroundColor: "#EB31E2",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "0px"
        }}>
            {/* <div style={{width: "150px"}} ></div> */}
            <div style={{
                display: "flex",
                flexDirection: "row",
            }}>
                <Typography style={{ fontFamily: "Poppins", color: "white", fontSize: "3.8vw"  }}>Upto &nbsp;</Typography>
                <Typography color="#330C3E" style={{ fontFamily: "Poppins", fontSize: "3.8vw"  }}>50%&nbsp;</Typography>
                <Typography style={{ fontFamily: "Poppins", color: "white", fontSize: "3.8vw"  }}>Sale on&nbsp;</Typography>
                <Typography color="#330C3E" style={{ fontFamily: "Poppins", fontSize: "3.8vw"  }}>SALE ITEMS&nbsp;</Typography>
                <Typography style={{ fontFamily: "Poppins", color: "white", fontSize: "3.8vw"  }}>Shop now</Typography>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }} >
                <PhoneIcon style={{ color: "white", fontSize: "4.2vw" }}/>
                <Typography style={{ fontFamily: "Poppins", color: "white", fontSize: "3.8vw" }}> +91 45678 91011</Typography>
            </div>
        </div>
    )
}

export default FixedNotificationMobile;
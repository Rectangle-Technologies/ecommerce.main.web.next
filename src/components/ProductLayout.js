import { Avatar, Button, Fab, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/AddCircleTwoTone";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import React from "react";
import formatAmount from "../helpers/formatAmount";

const ProductLayout = (props) => {
    const newButton = props.new ? { backgroundColor: "white", color: "#EB31E2" } : {};

    return (
        <>
            <div style={{ position: "relative" }}>
                <img style={{ aspectRatio: 0.65, width: "100%", objectFit: "cover", borderRadius: "5px" }} src={props.imageUrl} />


                <div style={{ marginTop: "10px" }}>
                    <u>
                        <Typography style={{ fontSize: 14 }}>
                            {props.title}
                        </Typography>
                    </u>
                    <Typography style={{ fontSize: 14, fontWeight: "bold" }}>
                        {formatAmount(props.mrp)}
                    </Typography>
                </div>
            </div>
        </>
    );
}

export default ProductLayout;
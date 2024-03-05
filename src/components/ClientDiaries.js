import { Fab, Grid, Paper, Rating, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { BASE_URL_2 } from "../constants/urls";
import { get } from "../utils/apiHelper";
import ClientDiariesForm from "./ClientDiariesForm";
import DoubleTextComponent from "./DoubleText";

const ClientDiariesComponent = (props) => {
    const [feedbacks, setFeedback] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        get(`${BASE_URL_2}/diaries/latest`, props?.auth?.token)
            .then((response) => {
                setFeedback(response.data.diary);
            })
            .catch((err) => {
                enqueueSnackbar(err.message || err?.response?.data?.message, {
                    autoHideDuration: 3000,
                    variant: "error"
                })
            })
    }, [])

    return (
        <>
            <DoubleTextComponent frontTextTopDistance='0vw' backTextFontSize={window.innerWidth < 500 ? '8vw' : "8vw"} frontTextFontSize={window.innerWidth < 500 ? '4.5vw' : "3.2vw"} frontText="Client Diaries" backText="" />
            <Grid container spacing={3} style={{ padding: "0px 8vw", marginBottom: "4em" }}>
                {feedbacks.map((feedback, index) => {
                    return (<Grid item xs={12} md={4} key={index}>
                        <img style={{ width: "100%", aspectRatio: 1.75, objectFit: "cover", objectPosition: "top" }} src={feedback.imageUrl} />
                        <Typography style={{ fontFamily: "EB Garamond", fontSize: "16px", fontWeight: "700" }}>“ {feedback.message} “</Typography>
                        <Rating value={4.75} precision={0.25} />
                        <Typography style={{ fontFamily: "Poppins", fontStyle: "italic", color: "#330C3E", fontSize: "16px", fontWeight: "700" }}>- {feedback.name}</Typography>
                    </Grid>)
                })}
            </Grid>
            <ClientDiariesForm />
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, {})(ClientDiariesComponent);
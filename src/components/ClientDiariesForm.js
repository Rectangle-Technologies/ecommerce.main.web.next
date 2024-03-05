import React, { useState } from "react";
import { connect } from "react-redux";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { Button, Checkbox, Fab, FormControlLabel, Grid, ImageListItem, LinearProgress, Paper, Rating, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";
import DoubleTextComponent from "./DoubleText";
import AddIcon from "@mui/icons-material/AddCircleTwoTone";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { clientDairyFeedback } from "../redux/services/actions/clientDiariesActions";

const ClientDiariesForm = (props) => {
    const [images, setImges] = useState([]);
    const [progress, setProgress] = useState(0);
    const { enqueueSnackbar } = useSnackbar();

    const handleProductImageDelete = (index) => {
        const temp = images;
        temp.splice(index, 1);
        setImges([...temp]);
    };

    const ClientDiariesSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        message: Yup.string().required("Message is required"),
        rating: Yup.number().required("Rating is required")
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            message: "",
            rating: 0
        },
        validationSchema: ClientDiariesSchema,
        onSubmit: (values, actions) => {
            if (!images.length) {
                enqueueSnackbar("Atleast one image is required", {
                    autoHideDuration: 3000,
                    variant: "error"
                });
                actions.setSubmitting(false);
                return;
            }
            console.log("values", values);
            console.log("token", props.auth);
            props.clientDairyFeedback(values, props.auth.token, images, enqueueSnackbar, actions.setSubmitting, actions.resetForm);
            setImges([]);
        }
    })

    const {
        errors,
        values,
        touched,
        handleSubmit,
        isSubmitting,
        getFieldProps,
        setSubmitting,
    } = formik;

    return (
        <>
            <DoubleTextComponent frontTextTopDistance='0vw' backTextFontSize={window.innerWidth < 500 ? '8vw' : "8vw"} frontTextFontSize={window.innerWidth < 500 ? '4.5vw' : "3.2vw"} frontText="Add a review" backText="" />
            <Paper sx={{ padding: "0px 8vw", display: 'flex', flexDirection: 'column', boxShadow: "none", marginBottom: "5em" }}>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={0} style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>

                            <Grid item xs={12} md={6}>
                                <center>
                                    <Typography style={{ fontFamily: "Poppins", fontWeight: "700", fontSize: window.innerWidth < 500 ? '25px' : "40px", lineHeight: "60px", marginTop: "20px" }}>GIVE RATING</Typography>
                                    <Grid container spacing={3} style={{ padding: "20px" }}>

                                        <Grid item xs={12}>
                                            <Rating value={values.rating} precision={0.5} size="large" onChange={(e, newValue) => {
                                                formik.setFieldValue('rating', newValue);
                                            }} />
                                        </Grid>
                                        <Grid item xs={12} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                            <Typography style={{ fontFamily: "Poppins", paddingRight: "2em" }} >Add Images</Typography>
                                            <Fab size="small" color="primary" onClick={(e) => {
                                                document.getElementById("product_images").click();
                                            }}>
                                                <AddIcon />
                                            </Fab>
                                            <input
                                                type="file"
                                                hidden
                                                accept="image/*"
                                                id="product_images"
                                                onChange={(e) => {
                                                    setImges([...e.target.files]);
                                                }}
                                            />

                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            {images.map((item, index) => (
                                                <ImageListItem key={item.name}>
                                                    <div
                                                        style={{
                                                            position: "relative",
                                                            overflow: "hidden",
                                                            borderRadius: 8,
                                                        }}
                                                    >
                                                        <Fab
                                                            size="medium"
                                                            style={{
                                                                position: "absolute",
                                                                backgroundColor: "#f44336",
                                                                top: -8,
                                                                right: -8,
                                                                color: "#fff",
                                                            }}
                                                            aria-label="add"
                                                            onClick={(e) => {
                                                                handleProductImageDelete(index);
                                                            }}
                                                        >
                                                            <DeleteRoundedIcon />
                                                        </Fab>
                                                        <img
                                                            src={`${URL.createObjectURL(item)}`}
                                                            srcSet={`${URL.createObjectURL(item)}`}
                                                            alt="Products"
                                                            loading="lazy"
                                                            style={{
                                                                width: "100%",
                                                            }}
                                                        />
                                                    </div>
                                                </ImageListItem>
                                            ))}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="name"
                                                label="Name"
                                                name="name"
                                                type="text"
                                                variant="outlined"
                                                fullWidth
                                                {...getFieldProps("name")}
                                                error={Boolean(touched.name && errors.name)}
                                                helperText={touched.name && errors.name}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="message"
                                                label="Message"
                                                name="message"
                                                type="text"
                                                variant="outlined"
                                                fullWidth
                                                multiline={true}
                                                rows={4}
                                                {...getFieldProps("message")}
                                                error={Boolean(touched.message && errors.message)}
                                                helperText={touched.message && errors.message}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <LoadingButton
                                                variant="contained"
                                                fullWidth
                                                color="warning"
                                                onClick={handleSubmit}
                                                loading={isSubmitting}
                                            >
                                                Proceed
                                            </LoadingButton>
                                            {/* <Button
                                                variant="contained"
                                                fullWidth
                                                color="warning"
                                                onClick={handleSubmit}
                                            >Proceed</Button> */}
                                        </Grid>
                                    </Grid>
                                </center>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <img src="/contact.jpeg" style={{ width: "100%", objectFit: "cover", height: "100%" }} />
                            </Grid>
                        </Grid>
                        <LinearProgress variant="determinate" value={progress} style={{}} />
                    </Form>
                </FormikProvider>
            </Paper>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { clientDairyFeedback })(ClientDiariesForm);
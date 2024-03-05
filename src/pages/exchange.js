import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  LinearProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import DoubleText from "./../components/DoubleText";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import GoogleMap from "../components/GoogleMaps";
import { connect } from "react-redux";
import { addNewQuery } from "../redux/services/actions/exchangeActions";
import { useSnackbar } from "notistack";
import { isMobile } from "react-device-detect";
import Image from 'next/image'

const ExchangeComponent = (props) => {
  const [progress, setProgress] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  const Schema = Yup.object().shape({
    order_id: Yup.string().required("Order ID is required"),
    mobile_no: Yup.string()
      .required("Mobile no is required")
      .matches(/^[6-9]\d{9}$/, "Invalid mobile no"),
    email: Yup.string().required("Email is required").email("Invalid email"),
    message: Yup.string().required("Message is required"),
    marketing_checkbox: Yup.boolean(),
  });

  const formik = useFormik({
    initialValues: {
      order_id: "",
      email: "",
      mobile_no: "",
      message: "",
    },
    validationSchema: Schema,
    onSubmit: (values, actions) => {
      props.addNewQuery(
        values,
        props.auth.token,
        enqueueSnackbar,
        actions.setSubmitting,
        actions.resetForm
      );
    },
  });

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
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <DoubleText
            frontTextTopDistance="1vw"
            backTextFontSize={window.innerWidth < 500 ? "12vw" : "8vw"}
            frontTextFontSize={window.innerWidth < 500 ? "4vw" : "3.2vw"}
            frontText="RETURN REQUEST"
            underline={false}
            frontTextFontFamily="Poppins"
            backText=""
            marginTop="1vw"
          />
          <Paper
            sx={{
              padding: "0px 8vw",
              display: "flex",
              flexDirection: "column",
              boxShadow: "none",
              marginBottom: "2em",
            }}
          >
            <Grid
              container
              spacing={0}
              style={{
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                marginTop: "1em",
              }}
            >
              <Grid item xs={12} md={6}>
                <Image
                  alt="Contacts picture"
                  src="/contact.jpeg"
                  style={{ width: "100%", objectFit: "cover", height: "100%" }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <center>
                  <Typography
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: "700",
                      fontSize: window.innerWidth < 500 ? "25px" : "40px",
                      lineHeight: "60px",
                      marginTop: "20px",
                    }}
                  >
                    GET IN TOUCH
                  </Typography>
                  <Grid container spacing={3} style={{ padding: "20px" }}>
                    <Grid item xs={12}>
                      <TextField
                        id="order_id"
                        label="Order ID"
                        name="order_id"
                        type="text"
                        variant="outlined"
                        fullWidth
                        {...getFieldProps("order_id")}
                        error={Boolean(touched.order_id && errors.order_id)}
                        helperText={touched.order_id && errors.order_id}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="email"
                        label="Email"
                        name="email"
                        type="text"
                        variant="outlined"
                        fullWidth
                        {...getFieldProps("email")}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="mobile_no"
                        label="Mobile no"
                        name="mobile_no"
                        type="text"
                        variant="outlined"
                        fullWidth
                        {...getFieldProps("mobile_no")}
                        error={Boolean(touched.mobile_no && errors.mobile_no)}
                        helperText={touched.mobile_no && errors.mobile_no}
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
            </Grid>
            <LinearProgress variant="determinate" value={progress} style={{}} />
          </Paper>
          {/* <DoubleText frontTextTopDistance="5.5vw" backTextFontSize="8vw" frontTextFontSize="3.2vw" frontText="VISIT US" underline={true} frontTextFontFamily="Poppins" backText="Come and explore" /> */}
        </Form>
      </FormikProvider>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { addNewQuery })(ExchangeComponent);

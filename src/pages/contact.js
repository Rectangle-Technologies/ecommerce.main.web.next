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
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import GoogleMap from "../components/GoogleMaps";
import { connect } from "react-redux";
import { addNewQuery } from "../redux/services/actions/contactActions";
import { useSnackbar } from "notistack";
import { isMobile } from "react-device-detect";
import Image from 'next/image'

const ContactUs = (props) => {
  const [progress, setProgress] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  const ContactUpSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    mobile_no: Yup.string()
      .required("Mobile no is required")
      .matches(/^[6-9]\d{9}$/, "Invalid mobile no"),
    email: Yup.string().required("Email is required").email("Invalid email"),
    message: Yup.string().required("Message is required"),
    marketing_checkbox: Yup.boolean(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile_no: "",
      message: "",
      marketing_checkbox: true,
    },
    validationSchema: ContactUpSchema,
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
            frontTextTopDistance="0vw"
            backTextFontSize={window.innerWidth < 500 ? "12vw" : "8vw"}
            frontTextFontSize={window.innerWidth < 500 ? "4.5vw" : "3.2vw"}
            frontText="CONTACT US"
            underline={false}
            frontTextFontFamily="Poppins"
            backText=""
            marginTop="1.5vw"
          />
          <Grid
            container
            spacing={0}
            style={{
              padding: "0px 10vw",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid item xs={12} md={4}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  padding: "10px 0px 0px 0px",
                }}
              >
                <PhoneInTalkOutlinedIcon
                  style={{ fontSize: isMobile ? "30px" : "56px" }}
                />
                <Typography
                  style={{
                    fontSize: isMobile ? "14px" : "20px",
                    padding: isMobile ? "0px 0px 0px 10px" : "0px 20px",
                    fontFamily: "Poppins",
                    lineHeight: "30px",
                    letterSpacing: "2%",
                  }}
                >
                  +91 98765 43210
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  padding: "10px 0px 0px 0px",
                }}
              >
                <EmailOutlinedIcon
                  style={{ fontSize: isMobile ? "30px" : "56px" }}
                />
                <Typography
                  style={{
                    fontSize: isMobile ? "14px" : "20px",
                    padding: isMobile ? "0px 0px 0px 10px" : "0px 20px",
                    fontFamily: "Poppins",
                    lineHeight: "30px",
                    letterSpacing: "2%",
                  }}
                >
                  bloomByKhushboo{" "}
                  <Typography
                    style={{
                      fontSize: isMobile ? "14px" : "20px",
                      fontFamily: "Poppins",
                      lineHeight: "30px",
                      letterSpacing: "2%",
                    }}
                    color={"black"}
                  >
                    &nbsp;@gmailcom
                  </Typography>
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  padding: "10px 0px 0px 0px",
                }}
              >
                <LocationOnOutlinedIcon
                  style={{ fontSize: isMobile ? "30px" : "56px" }}
                />
                <Typography
                  style={{
                    fontSize: isMobile ? "14px" : "20px",
                    padding: isMobile ? "0px 0px 0px 10px" : "0px 20px",
                    fontFamily: "Poppins",
                    lineHeight: "30px",
                    letterSpacing: "2%",
                  }}
                >
                  F-21, Sacred Heart World, Opposite of Sacred Heart Town,
                  Wanowrei, Pune, Maharashtra
                </Typography>
              </div>
            </Grid>
          </Grid>
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
                marginTop: "5em",
              }}
            >
              <Grid item xs={12} md={6}>
                <Image
                  alt="Contact image"
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
                      <FormControlLabel
                        label="Email me with news and offers"
                        name="marketing_checkbox"
                        control={
                          <Checkbox
                            checked={values.marketing_checkbox}
                            {...getFieldProps("marketing_checkbox")}
                          />
                        }
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

export default connect(mapStateToProps, { addNewQuery })(ContactUs);

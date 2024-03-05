import { Button, Container, Grid, TextField } from "@mui/material";
import React from "react";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { post } from "./utils/apiHelper";
import { BASE_URL_1 } from "./constants/urls";
import { connect } from "react-redux";
import {
  addLoader,
  removeLoader,
} from "./redux/services/actions/loaderActions";
import Image from 'next/image';
import { useParams, useRouter } from "next/navigation";

const ResetPasswordEmail = (props) => {
  React.useEffect(() => {
    if (props.auth?.isAuthenticated) {
      navigate("/");
    }
  }, []);

  const { email } = useParams();
  const navigate = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const Schema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Schema,
    onSubmit: async ({ email }, action) => {
      props.addLoader();
      post(`${BASE_URL_1}/auth/reset_password`, null, { email })
        .then((res) => {
          enqueueSnackbar(res.data.message, {
            autoHideDuration: 3000,
            variant: "success",
          });
          props.removeLoader();
          navigate("/login", { replace: true });
        })
        .catch((err) => {
          props.removeLoader();
          enqueueSnackbar(
            err.message ||
              err.response?.data?.message ||
              "Something went wrong",
            {
              autoHideDuration: 3000,
              variant: "error",
            }
          );
        });
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
    <Container style={{ marginTop: "2rem", maxWidth: "400px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <center>
            <Image alt="Bloom Company logo" src="/logo.png" style={{ width: "60%" }} />
          </center>
        </Grid>
        <Grid item xs={12}>
          <div style={{ marginBottom: 20 }}>
            <TextField
              fullWidth
              id="email"
              name="email"
              variant="outlined"
              label="Email"
              placeholder="Email"
              type="email"
              value={values.email}
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapstatetoprops = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapstatetoprops, { addLoader, removeLoader })(
  ResetPasswordEmail
);

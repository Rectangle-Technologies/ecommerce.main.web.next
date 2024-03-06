import { Button, Container, Grid, TextField } from "@mui/material";
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
import { useParams, useRouter } from "next/navigation";
import Image from 'next/image'

const ResetPassword = (props) => {
  const { email } = useParams();
  const navigate = useRouter();
  const token = window.location.search.split("=")[1];
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    if (props.auth?.isAuthenticated) {
      navigate.push("/");
    }
  }, []);

  const Schema = Yup.object().shape({
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string().required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Schema,
    onSubmit: async ({ password, confirmPassword }, action) => {
      if (password !== confirmPassword) {
        enqueueSnackbar("Conifrm password is not equal", {
          autoHideDuration: 3000,
          variant: "error",
        });
      }
      if (password.length < 6) {
        enqueueSnackbar("Password length is less than 6", {
          autoHideDuration: 3000,
          variant: "error",
        });
      }
      props.addLoader();
      post(`${BASE_URL_1}/auth/reset_password/${email}`, null, {
        token,
        password,
      })
        .then((res) => {
          enqueueSnackbar(res.data.message, {
            autoHideDuration: 3000,
            variant: "success",
          });
          props.removeLoader();
          navigate.push("/login", { replace: true });
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
            <Image
              alt="Bloom Company's logo"
              src="/logo.png"
              width={100}
              height={100}
              style={{ width: "60%" }}
            />
          </center>
        </Grid>
        <Grid item xs={12}>
          <div style={{ marginBottom: 20 }}>
            <TextField
              fullWidth
              id="password"
              name="password"
              variant="outlined"
              label="Password"
              placeholder="Password"
              type="password"
              value={values.password}
              {...getFieldProps("password")}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div style={{ marginBottom: 20 }}>
            <TextField
              fullWidth
              id="confirm-password"
              name="confirmPassword"
              variant="outlined"
              label="Confirm Password"
              placeholder="Confirm Password"
              type="password"
              value={values.confirmPassword}
              {...getFieldProps("confirmPassword")}
              error={Boolean(touched.confirmPassword && errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
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
  ResetPassword
);

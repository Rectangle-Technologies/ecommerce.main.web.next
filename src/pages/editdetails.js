import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import textStyle from "../helpers/textStyle";
import { useState } from "react";
import { connect } from "react-redux";
import {
  addLoader,
  removeLoader,
} from "../redux/services/actions/loaderActions";
import { update } from "../redux/services/actions/authActions";
import { useEffect } from "react";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { BASE_URL_1 } from "../constants/urls";
import { useSnackbar } from "notistack";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

const EditDetails = (props) => {
  const navigate = useRouter();
  const [disabled, setDisabled] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const Schema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    contact: Yup.string().required("contact is required"),
    line1: Yup.string().required("Address is required"),
    city: Yup.string().required("city is required"),
    state: Yup.string().required("state is required"),
    pincode: Yup.string().required("pincode is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: props?.auth?.user?.email || "",
      password: props?.auth?.user?.password || "",
      firstName: props?.auth?.user?.name?.split(" ")[0] || "",
      lastName: props?.auth?.user?.name?.split(" ")[1] || "",
      contact: props?.auth?.user?.contact || "",
      line1: props?.auth?.user?.address?.line1 || "",
      city: props?.auth?.user?.address?.city || "",
      state: props?.auth?.user?.address?.state || "",
      pincode: props?.auth?.user?.address?.pincode || "",
    },
    validationSchema: Schema,
    onSubmit: async (values, action) => {
      props.addLoader();
      try {
        const res = await axios.put(
          `${BASE_URL_1}/user/update`,
          values,
          config
        );
        props.update(res.data.user);
        enqueueSnackbar("Details updated successfully", {
          variant: "success",
          autoHideDuration: 3000,
        });
        props.removeLoader();
      } catch (err) {
        props.removeLoader();
        if (err?.response?.data?.status === "PRODUCT_NOT_LAUNCHED") {
          setProduct(err.response.data.product);
          setLaunched(false);
        }
        enqueueSnackbar(
          err?.response?.data?.message || "Something went wrong",
          {
            variant: "error",
            autoHideDuration: 3000,
          }
        );
      }
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

  const config = {
    headers: {
      Authorization: `Bearer ${props.auth.token}`,
    },
  };
  const CustomButton = styled(Button)({
    textTransform: "none",
    backgroundColor: "#eb31e2",
    "&:hover": {
      backgroundColor: "#fc03cf",
    },
    fontSize: 16,
  });

  useEffect(() => {
    if (!props.auth.isAuthenticated) {
      navigate.push("/login", { state: { navigateUrl: "/editdetails" } });
      return;
    }
  }, []);

  return (
    <div>
      <Typography
        style={{
          ...textStyle,
          fontWeight: 700,
          fontSize: window.innerWidth > 500 ? 32 : 26,
          textAlign: "center",
        }}
        my={2}
      >
        YOUR DETAILS
      </Typography>
      <div style={{ width: "90%", maxWidth: "600px", margin: "auto" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <div style={{ marginBottom: 20 }}>
              <TextField
                fullWidth
                id="first_name"
                name="first_name"
                variant="outlined"
                label="First Name"
                placeholder="First Name"
                type="text"
                value={values.firstName}
                {...getFieldProps("firstName")}
                error={Boolean(touched.firstName && errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                disabled={disabled}
              />
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div style={{ marginBottom: 20 }}>
              <TextField
                fullWidth
                id="last_name"
                name="last_name"
                variant="outlined"
                label="Last Name"
                placeholder="Last Name"
                type="text"
                value={values.lastName}
                {...getFieldProps("lastName")}
                error={Boolean(touched.lastName && errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                disabled={disabled}
              />
            </div>
          </Grid>
        </Grid>
        <div style={{ marginBottom: 20 }}>
          <TextField
            fullWidth
            id="email"
            name="email"
            variant="outlined"
            label="Email"
            placeholder="Email"
            type="text"
            value={values.email}
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            disabled={disabled}
          />
        </div>
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
            disabled={disabled}
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <TextField
            fullWidth
            id="contact"
            name="contact"
            variant="outlined"
            label="Contact"
            placeholder="Contact"
            type="text"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+91-</InputAdornment>
              ),
            }}
            value={values.contact}
            {...getFieldProps("contact")}
            error={Boolean(touched.contact && errors.contact)}
            helperText={touched.contact && errors.contact}
            disabled={disabled}
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <TextField
            fullWidth
            id="address"
            name="address"
            variant="outlined"
            label="Address"
            placeholder="Address"
            type="text"
            value={values.line1}
            {...getFieldProps("line1")}
            error={Boolean(touched.line1 && errors.line1)}
            helperText={touched.line1 && errors.line1}
            disabled={disabled}
          />
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              id="city"
              name="city"
              variant="outlined"
              label="City"
              placeholder="City"
              type="text"
              value={values.city}
              {...getFieldProps("city")}
              error={Boolean(touched.city && errors.city)}
              helperText={touched.city && errors.city}
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              id="state"
              name="state"
              variant="outlined"
              label="State"
              placeholder="State"
              type="text"
              value={values.state}
              {...getFieldProps("state")}
              error={Boolean(touched.state && errors.state)}
              helperText={touched.state && errors.state}
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              id="pincode"
              name="pincode"
              variant="outlined"
              label="Pincode"
              placeholder="Pincode"
              type="text"
              value={values.pincode}
              {...getFieldProps("pincode")}
              error={Boolean(touched.pincode && errors.pincode)}
              helperText={touched.pincode && errors.pincode}
              disabled={disabled}
            />
          </Grid>
        </Grid>
      </div>
      <div
        style={{
          width: "90%",
          maxWidth: "600px",
          margin: "auto",
          marginBottom: "20px",
          marginTop: "20px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {disabled ? (
          <CustomButton
            variant="contained"
            size="small"
            onClick={() => setDisabled(false)}
          >
            Edit
          </CustomButton>
        ) : (
          <CustomButton variant="contained" size="small" onClick={handleSubmit}>
            Save
          </CustomButton>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLoader, removeLoader, update })(
  EditDetails
);

import { Grid, Link, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import formatAmount from "../helpers/formatAmount";
import textStyle from "../helpers/textStyle";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { BASE_URL_2 } from "../constants/urls";
import { useSnackbar } from "notistack";
import { connect } from "react-redux";
import {
  addLoader,
  removeLoader,
} from "../redux/services/actions/loaderActions";
import * as Yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";
import OrderConfirm from "../components/OrderConfirm";
import { usePathname, useRouter } from "next/navigation";
import Image from 'next/image';

const Checkout = (props) => {
  const [disabled, setDisabled] = useState(true);
  const location = usePathname();
  const navigate = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const CheckoutSchema = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    mobile_no: Yup.string()
      .required("Mobile no is required")
      .matches(/^[6-9]\d{9}$/, "Invalid mobile no"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    pincode: Yup.string().required("Pincode is required"),
  });

  useEffect(() => {
    if (!location.state || !props?.auth?.isAuthenticated) {
      navigate.push("/");
      return;
    }
  }, []);

  const checkoutHandler = async (values) => {
    setOpen(false);
    props.addLoader();
    try {
      const res = await axios.post(`${BASE_URL_2}/payment/createOrder`, {
        amount: location?.state?.finalAmount,
      });
      localStorage.setItem(
        "order",
        JSON.stringify({
          products: location?.state?.cart?.products,
          amount: location?.state?.finalAmount,
          instructions: location?.state?.instructions,
          userDetails: {
            name: values.first_name + " " + values.last_name,
            contact: values.mobile_no,
            address: {
              line1: values.address,
              city: values.city,
              state: values.state,
              pincode: values.pincode,
            },
          },
          voucherName: location?.state?.voucherName,
        })
      );
      const options = {
        key: res.data.data.key, // Enter the Key ID generated from the Dashboard
        amount: res.data.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: res.data.data.currency,
        name: "Bloom By Khushbu",
        description:
          "Please complete payment using any of the methods to place your order.",
        image: "", // https://bloomdev.s3.ap-south-1.amazonaws.com/logo.png
        order_id: res.data.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: async function (response) {
          const res = await axios.post(`${BASE_URL_2}/payment/verify`, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });
          navigate.push(
            `/orderstatus/${res.data.status}?paymentId=${res.data.paymentId}`
          );
        },
        prefill: {
          name: props?.auth?.user?.name,
          email: props?.auth?.user?.email,
          contact: props?.auth?.user?.contact,
        },
        theme: {
          color: "#eb31e2",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      props.removeLoader();
    } catch (err) {
      console.log(err);
      props.removeLoader();
      let message = "Something went wrong";
      if (err?.response?.data?.errors) {
        message = err?.response?.data?.errors[0].msg;
      } else if (err?.response?.data?.message) {
        message = err?.response?.data?.message;
      }
      enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      first_name: props?.auth?.user?.name.split(" ")[0] || "",
      last_name: props?.auth?.user?.name.split(" ")[1] || "",
      mobile_no: props?.auth?.user?.contact || "",
      address: props?.auth?.user?.address?.line1 || "",
      city: props?.auth?.user?.address?.city || "",
      state: props?.auth?.user?.address?.state || "",
      pincode: props?.auth?.user?.address?.pincode || "",
    },
    validationSchema: CheckoutSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      checkoutHandler(values);
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
          {location?.state?.cart?.products?.length > 0 && (
            <Grid container style={{ height: "100vh" }}>
              <Grid
                item
                xs={12}
                md={5}
                sx={{ backgroundColor: "#F8F5CC" }}
                p={4}
              >
                <center>
                  <Image alt="Bloom Company's Logo" src="./logo.png" style={{ width: "50%" }} />
                </center>
                <Typography
                  style={{
                    ...textStyle,
                    fontWeight: 600,
                    fontSize: 24,
                    color: "#330C3E",
                    textDecoration: "underline",
                  }}
                  mt={5}
                >
                  ORDER SUMMARY
                </Typography>
                {location.state.cart.products.map((p, key) => (
                  <Grid key={key} container mt={3}>
                    <Grid item xs={5} md={3} mx={2}>
                      <Image
                        alt="Product's image"
                        src={p.productId.imageUrls[0]}
                        style={{ width: "100%", aspectRatio: 0.7 }}
                      />
                    </Grid>
                    <Grid item xs={5} md={7}>
                      <Typography style={{ ...textStyle, fontWeight: 500 }}>
                        {p.productId.name}
                      </Typography>
                      <Typography
                        style={{ ...textStyle, fontWeight: 500 }}
                        my={1}
                      >
                        {formatAmount(p.productId.price)}
                      </Typography>
                      <Typography
                        style={{ ...textStyle, fontWeight: 500 }}
                        my={1}
                      >
                        Size: {p.size}
                      </Typography>
                      <Typography
                        style={{ ...textStyle, fontWeight: 500 }}
                        my={1}
                      >
                        Qty: {p.quantity}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
                <div style={{ padding: 15, marginTop: 20 }}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography style={{ ...textStyle, fontWeight: 500 }}>
                      SUB TOTAL
                    </Typography>
                    <Typography style={{ ...textStyle, fontWeight: 500 }}>
                      {formatAmount(location.state.total)}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 15,
                    }}
                  >
                    <Typography style={{ ...textStyle, fontWeight: 500 }}>
                      DISCOUNT (if any)
                    </Typography>
                    <Typography style={{ ...textStyle, fontWeight: 500 }}>
                      -{formatAmount(location.state.discount)}
                    </Typography>
                  </div>
                  <hr style={{ backgroundColor: "#000000" }} />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 15,
                    }}
                  >
                    <Typography style={{ ...textStyle, fontWeight: 500 }}>
                      TOTAL AMOUNT
                    </Typography>
                    <Typography style={{ ...textStyle, fontWeight: 500 }}>
                      {formatAmount(location.state.finalAmount)}
                    </Typography>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={7} p={4}>
                <Typography
                  style={{
                    ...textStyle,
                    fontFamily: "Playfair Display",
                    fontWeight: 500,
                    fontSize: 24,
                    textDecoration: "underline",
                  }}
                  my={3}
                >
                  Contact Information
                </Typography>
                <TextField
                  fullWidth
                  label="Mobile Number"
                  variant="outlined"
                  placeholder="Mobile Number"
                  id="mobile_no"
                  {...getFieldProps("mobile_no")}
                  error={Boolean(touched.mobile_no && errors.mobile_no)}
                  helperText={touched.mobile_no && errors.mobile_no}
                  disabled={disabled}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "20px 0px",
                  }}
                >
                  <Typography
                    style={{
                      ...textStyle,
                      fontFamily: "Playfair Display",
                      fontWeight: 500,
                      fontSize: 24,
                      textDecoration: "underline",
                    }}
                  >
                    Shipping Details
                  </Typography>
                  {disabled && (
                    <Link
                      style={{ display: "flex", cursor: "pointer" }}
                      onClick={() => setDisabled(false)}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <EditIcon fontSize="small" />
                        <Typography
                          style={{ ...textStyle, fontSize: 18 }}
                          mx={1}
                        >
                          Edit
                        </Typography>
                      </div>
                    </Link>
                  )}
                </div>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="first_name"
                      variant="outlined"
                      placeholder="First Name"
                      type="text"
                      id="first_name"
                      {...getFieldProps("first_name")}
                      error={Boolean(touched.first_name && errors.first_name)}
                      helperText={touched.first_name && errors.first_name}
                      disabled={disabled}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="last_name"
                      variant="outlined"
                      placeholder="Last Name"
                      id="last_name"
                      {...getFieldProps("last_name")}
                      error={Boolean(touched.last_name && errors.last_name)}
                      helperText={touched.last_name && errors.last_name}
                      disabled={disabled}
                    />
                  </Grid>
                </Grid>
                <div style={{ marginTop: 20 }}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    variant="outlined"
                    placeholder="Address"
                    id="address"
                    {...getFieldProps("address")}
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                    disabled={disabled}
                  />
                </div>
                <Grid container my={1} spacing={2}>
                  <Grid item xs={6} md={4}>
                    <TextField
                      fullWidth
                      label="City"
                      name="city"
                      variant="outlined"
                      placeholder="City"
                      id="city"
                      {...getFieldProps("city")}
                      error={Boolean(touched.city && errors.city)}
                      helperText={touched.city && errors.city}
                      disabled={disabled}
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <TextField
                      fullWidth
                      name="state"
                      label="State"
                      variant="outlined"
                      placeholder="State"
                      id="state"
                      {...getFieldProps("state")}
                      error={Boolean(touched.state && errors.state)}
                      helperText={touched.state && errors.state}
                      disabled={disabled}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      name="pincode"
                      label="Pincode"
                      variant="outlined"
                      placeholder="Pincode"
                      id="pincode"
                      {...getFieldProps("pincode")}
                      error={Boolean(touched.pincode && errors.pincode)}
                      helperText={touched.pincode && errors.pincode}
                      disabled={disabled}
                    />
                  </Grid>
                </Grid>
                <Grid container my={2}>
                  <Grid item xs={12} md={6} my={2}>
                    <Link
                      style={{ display: "flex", cursor: "pointer" }}
                      onClick={() => navigate.push("/cart")}
                    >
                      <KeyboardArrowLeftIcon />
                      <Typography style={{ ...textStyle, fontSize: 18 }} mx={1}>
                        Return to Cart
                      </Typography>
                    </Link>
                  </Grid>
                  <Grid item xs={12} md={6} my={2}>
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Link style={{ cursor: "pointer" }} onClick={handleOpen}>
                        <div
                          style={{
                            backgroundColor: "#FA861B",
                            padding: "10px 50px",
                            borderRadius: 30,
                          }}
                        >
                          <Typography
                            style={{
                              ...textStyle,
                              fontWeight: 500,
                              fontSize: 18,
                              color: "#F8F5CC",
                              textAlign: "center",
                            }}
                          >
                            Proceed
                          </Typography>
                        </div>
                      </Link>
                    </div>
                  </Grid>
                  <OrderConfirm
                    open={open}
                    setOpen={setOpen}
                    cart={location?.state?.cart}
                    instructions={location?.state?.instructions}
                    total={location?.state?.total}
                    discount={location?.state?.discount}
                    finalAmount={location?.state?.finalAmount}
                    voucherName={location?.state?.voucherName}
                    user={{
                      name: values.first_name + " " + values.last_name,
                      contact: values.mobile_no,
                      line1: values.address,
                      city: values.city,
                      state: values.state,
                      pincode: values.pincode,
                    }}
                    handleSubmit={handleSubmit}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
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

export default connect(mapStateToProps, { addLoader, removeLoader })(Checkout);

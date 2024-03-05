import { Box, Grid, Link as MaterialLink, Typography } from "@mui/material";
import React from "react";
import textStyle from "../helpers/textStyle";
import { connect } from "react-redux";
import {
  addLoader,
  removeLoader,
} from "../redux/services/actions/loaderActions";
import { useState } from "react";
import axios from "axios";
import { BASE_URL_1 } from "../constants/urls";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import formatAmount from "../helpers/formatAmount";
import capitalizeFirstLetter from "../helpers/capitaliseFirst";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const OrderDetails = (props) => {
  const [order, setOrder] = useState();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const config = {
    headers: {
      Authorization: `Bearer ${props.auth.token}`,
    },
  };
  const address =
    order?.user?.address?.line1 +
    ", " +
    order?.user?.address?.city +
    ", " +
    order?.user?.address?.state +
    " - " +
    order?.user?.address?.pincode;

  const fetchOrder = async () => {
    props.addLoader();
    try {
      const res = await axios.get(`${BASE_URL_1}/order/fetch/${id}`, config);
      setOrder(res.data.order);
      props.removeLoader();
    } catch (err) {
      props.removeLoader();
      if (err?.response?.data?.status === "PRODUCT_NOT_LAUNCHED") {
        setProduct(err.response.data.product);
        setLaunched(false);
      }
      enqueueSnackbar(err?.response?.data?.message || "Something went wrong", {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div
      style={{
        width: window.innerWidth > 600 ? "70%" : "90%",
        margin: "auto",
        marginTop: "20px",
      }}
    >
      <Grid container>
        <Grid item xs={12} md={6}>
          <Typography
            style={{ ...textStyle, fontSize: "18px", fontWeight: "bold" }}
            mt={2}
          >
            {order?.user?.name}
          </Typography>
          <Typography style={{ ...textStyle, fontSize: "18px" }}>
            {address}
          </Typography>
          <Typography style={{ ...textStyle, fontSize: "18px" }}>
            +91 - {order?.user?.contact}
          </Typography>
          <Typography
            style={{ ...textStyle, fontSize: "18px", textAlign: "left" }}
            my={3}
          >
            Total: {formatAmount(order?.amount)}
          </Typography>
          {order?.voucher && (
            <Typography
              style={{ ...textStyle, fontSize: "18px", textAlign: "left" }}
              my={3}
            >
              Voucher: {order?.voucher?.name}
            </Typography>
          )}
          <Typography
            style={{ ...textStyle, fontSize: "18px", textAlign: "left" }}
            my={3}
          >
            Placed On:{" "}
            {new Date(order?.createdAt).toLocaleString("en-IN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            style={{ ...textStyle, fontSize: "18px", textAlign: "left" }}
            my={3}
          >
            Order Id: {order?._id}
          </Typography>
          <Typography
            style={{ ...textStyle, fontSize: "18px", textAlign: "left" }}
            component="div"
            my={3}
          >
            Status:{" "}
            <Box display="inline" color="#eb31e2">
              {capitalizeFirstLetter(order?.status)}
            </Box>
          </Typography>
          {order?.status === "dispatched" && (
            <div>
              <Typography
                style={{ ...textStyle, fontSize: "18px", textAlign: "left" }}
                my={3}
              >
                Tracking Id: {order?.tracking_id}
              </Typography>
              <Typography
                style={{ ...textStyle, fontSize: "18px", textAlign: "left" }}
                component="div"
                my={3}
              >
                <MaterialLink style={{ color: "#eb31e2", cursor: "pointer" }}>
                  Click here
                </MaterialLink>{" "}
                to track your order
              </Typography>
            </div>
          )}
          {order?.instructions && (
            <Typography
              style={{ ...textStyle, fontSize: "18px", textAlign: "left" }}
              my={3}
            >
              Instructions: {order?.instructions}
            </Typography>
          )}
        </Grid>
      </Grid>
      <div
        style={{
          width: window.innerWidth > 600 ? "70%" : "100%",
          margin: "auto",
        }}
      >
        {order?.products?.map((p, idx) => (
          <Link key={idx} href={`/product/${p?.productId?._id}`}>
            <MaterialLink style={{ cursor: "pointer" }}>
              <Grid container spacing={1} my={2}>
                <Grid item xs={4} md={3}>
                  <Image
                    alt="Product's image"
                    src={p?.productId?.imageUrls[0]}
                    style={{
                      width: window.innerWidth > 600 ? "80%" : "100%",
                      aspectRatio: 0.65,
                    }}
                  />
                </Grid>
                <Grid item xs={8} md={9}>
                  <Typography
                    style={{
                      ...textStyle,
                      fontSize: window.innerWidth > 600 ? 20 : 16,
                    }}
                  >
                    {p?.productId?.name}
                  </Typography>
                  <Typography
                    style={{
                      ...textStyle,
                      fontSize: window.innerWidth > 600 ? 18 : 14,
                    }}
                    my={1}
                  >
                    {formatAmount(p?.productId?.price)}
                  </Typography>
                  <Typography
                    style={{
                      ...textStyle,
                      fontSize: window.innerWidth > 600 ? 18 : 14,
                    }}
                    my={1}
                  >
                    Size: {p?.size}
                  </Typography>
                  <Typography
                    style={{
                      ...textStyle,
                      fontSize: window.innerWidth > 600 ? 18 : 14,
                    }}
                    my={1}
                  >
                    Qty: {p?.quantity}
                  </Typography>
                </Grid>
              </Grid>
            </MaterialLink>
          </Link>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLoader, removeLoader })(
  OrderDetails
);

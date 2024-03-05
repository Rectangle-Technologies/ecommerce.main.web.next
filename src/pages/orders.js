import {
  Box,
  Grid,
  Link as MaterialLink,
  Pagination,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { BASE_URL_1 } from "../constants/urls";
import {
  addLoader,
  removeLoader,
} from "../redux/services/actions/loaderActions";
import textStyle from "../helpers/textStyle";
import { useSnackbar } from "notistack";
import formatAmount from "../helpers/formatAmount";
import capitalizeFirstLetter from "../helpers/capitaliseFirst";
import Image from "next/image";
import Link from "next/link";

const Orders = (props) => {
  const [orders, setOrders] = useState();
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const limit = 10;
  const navigate = useNavigate();
  const config = {
    headers: {
      Authorization: `Bearer ${props.auth.token}`,
    },
  };
  const { enqueueSnackbar } = useSnackbar();

  const fetchOrders = async () => {
    props.addLoader();
    try {
      const res = await axios.get(
        `${BASE_URL_1}/order/fetch?page=${page}&limit=${limit}`,
        config
      );
      setOrders(res.data.orders);
      console.log(res.data);
      setMaxPages(Math.ceil(res.data.count / limit));
      props.removeLoader();
    } catch (err) {
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

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    if (!props?.auth?.isAuthenticated) {
      navigate("/login", { state: { navigateUrl: "/wishlist" } });
      return;
    }
    fetchOrders();
  }, [page]);

  return (
    <>
      <Typography
        style={{
          ...textStyle,
          fontWeight: 700,
          fontSize: window.innerWidth > 500 ? 32 : 26,
          textAlign: "center",
        }}
        mt={2}
      >
        YOUR ORDERS
      </Typography>
      <div
        style={{
          width: window.innerWidth > 600 ? "50%" : "100%",
          margin: "auto",
          padding: "10px",
        }}
      >
        {orders && orders?.length > 0 ? (
          <div>
            {orders?.map((order, idx) => (
              <Link key={order._id} href={`/order/${order?._id}`}>
                <MaterialLink
                  style={{ cursor: "pointer" }}
                >
                  <div
                    style={{
                      padding: "10px",
                      border: "1px solid black",
                      margin: "20px 0px",
                    }}
                  >
                    <Typography style={textStyle} component="div">
                      Status:{" "}
                      <Box display="inline" color="#eb31e2">
                        {capitalizeFirstLetter(order?.status)}
                      </Box>{" "}
                    </Typography>
                    <Grid key={idx} container my={1}>
                      <Grid item xs={3} mr={1}>
                        <Image
                          alt="Product's image"
                          src={order?.products[0]?.productId?.imageUrls[0]}
                          style={{
                            width: window.innerWidth > 600 ? "80%" : "100%",
                            aspectRatio: 0.65,
                          }}
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <Typography
                          style={{ ...textStyle, textAlign: "right" }}
                        >
                          {new Date(order?.createdAt).toLocaleString("en-IN", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Typography>
                        <Typography
                          style={{
                            ...textStyle,
                            fontSize: window.innerWidth > 600 ? 20 : 16,
                          }}
                          my={1}
                        >
                          {order?.products[0]?.productId?.name}
                        </Typography>
                        <Typography
                          style={{
                            ...textStyle,
                            fontSize: window.innerWidth > 600 ? 20 : 16,
                          }}
                          my={1}
                        >
                          Total: {formatAmount(order?.amount)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </div>
                </MaterialLink>
              </Link>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "15px 0px",
              }}
            >
              <Pagination
                count={maxPages}
                page={page}
                onChange={handlePageChange}
              />
            </div>
          </div>
        ) : (
          <Typography
            stye={{ ...textStyle, fontSize: 24, textAlign: "center" }}
          >
            You have no orders
          </Typography>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLoader, removeLoader })(Orders);

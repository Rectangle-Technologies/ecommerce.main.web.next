import { Grid, Link as MaterialLink, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import textStyle from "../helpers/textStyle";
import { connect } from "react-redux";
import {
  addLoader,
  removeLoader,
} from "../redux/services/actions/loaderActions";
import { updateCart } from "../redux/services/actions/cartActions";
import axios from "axios";
import { BASE_URL_1 } from "../constants/urls";
import { useSnackbar } from "notistack";
import ProductsDesktop from "../components/cart/desktop/ProductsDesktop";
import formatAmount from "../helpers/formatAmount";
import { SocketContext } from "../components/Socket";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const OrderStatus = (props) => {
  const { status } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const paymentId = searchParams.get("paymentId");
  const data = JSON.parse(localStorage.getItem("order"));
  const [order, setOrder] = useState();
  const { socket } = React.useContext(SocketContext);
  const config = {
    headers: {
      Authorization: `Bearer ${props.auth.token}`,
    },
  };

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const createOrder = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL_1}/order/create`,
        { ...data, paymentId },
        config
      );
      setOrder(res.data.order);
      props.updateCart(0);
      localStorage.removeItem("order");
      props.removeLoader();
      socket.emit("orderCreated", { order: res.data.order });
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      props.removeLoader();
      localStorage.removeItem("order");
      setIsLoading(false);
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

  useEffect(() => {
    props.addLoader();
    if (!localStorage.getItem("order")) {
      navigate.push("/");
      setIsLoading(false);
      props.removeLoader();
      return;
    } else if (status === "verified") {
      createOrder();
    }
  }, []);

  return (
    <div
      style={{
        margin: 20,
        padding: window.innerWidth > 600 ? 20 : 0,
        width: "80%",
        margin: "auto",
      }}
    >
      {!isLoading &&
        (status === "verified" ? (
          order ? (
            <>
              <Typography
                style={{
                  ...textStyle,
                  fontSize: window.innerWidth > 600 ? 36 : 30,
                  fontWeight: 600,
                }}
                mt={5}
              >
                THANK YOU FOR YOUR ORDER :)
              </Typography>
              <Typography
                style={{
                  ...textStyle,
                  fontSize: window.innerWidth > 600 ? 22 : 16,
                }}
                my={2}
              >
                An email confirmation has been sent to{" "}
                {props?.auth?.user?.email}.
              </Typography>
              <div
                style={{
                  margin: "15px 0px",
                  padding: "20px",
                  border: "1px solid #928C8C",
                  borderRadius: "5px",
                  width: window.innerWidth > 600 ? "60%" : "100%",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={3}>
                    <Typography
                      style={{
                        ...textStyle,
                        fontWeight: 600,
                        fontSize: "18px",
                      }}
                    >
                      Order Total:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      style={{
                        ...textStyle,
                        fontWeight: 600,
                        fontSize: "18px",
                      }}
                    >
                      {formatAmount(order?.amount)}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2} my={3}>
                  <Grid item xs={12} md={3}>
                    <Typography
                      style={{
                        ...textStyle,
                        fontWeight: 600,
                        fontSize: "18px",
                      }}
                    >
                      Order Id:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      style={{
                        ...textStyle,
                        fontWeight: 600,
                        fontSize: "18px",
                      }}
                    >
                      {order?._id}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2} mt={3}>
                  <Grid item xs={12} md={3}>
                    <Typography
                      style={{
                        ...textStyle,
                        fontWeight: 600,
                        fontSize: "18px",
                      }}
                    >
                      Delivery To:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      style={{
                        ...textStyle,
                        fontWeight: 600,
                        fontSize: "18px",
                      }}
                    >
                      {order?.user?.name}
                    </Typography>
                    <Typography style={{ ...textStyle, fontSize: "18px" }}>
                      {order?.user?.address?.line1 +
                        ", " +
                        order?.user?.address?.city +
                        ", " +
                        order?.user?.address?.state +
                        " - " +
                        order?.user?.address?.pincode}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
              <div
                style={{
                  margin: "30px 0px",
                  padding: "20px",
                  border: "1px solid #928C8C",
                  borderRadius: "5px",
                  width: window.innerWidth > 600 ? "80%" : "100%",
                }}
              >
                {order?.products?.map((p, idx) => (
                  <Link key={idx} href={`/product/${p?.productId?._id}`}>
                    <MaterialLink style={{ cursor: "pointer" }}>
                      <Grid container spacing={1} my={2}>
                        <Grid item xs={4.5} md={2}>
                          <Image
                            alt="Product's image"
                            src={p?.productId?.imageUrls[0]}
                            style={{
                              width: window.innerWidth > 600 ? "90%" : "100%",
                              aspectRatio: 0.65,
                            }}
                          />
                        </Grid>
                        <Grid item xs={7.5} md={10}>
                          <Typography
                            style={{
                              ...textStyle,
                              fontSize: window.innerWidth > 600 ? 24 : 16,
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
            </>
          ) : (
            <>
              <Typography
                style={{
                  ...textStyle,
                  fontSize: window.innerWidth > 600 ? 36 : 30,
                  fontWeight: 600,
                }}
                mt={5}
              >
                SORRY, COULDN&apos;T PLACE THE ORDER :(
              </Typography>
              <Typography
                style={{
                  ...textStyle,
                  fontSize: window.innerWidth > 600 ? 26 : 20,
                }}
                my={2}
              >
                Please contact us to initiate refund. Payment Id: {paymentId}
              </Typography>
            </>
          )
        ) : (
          <>
            <Typography
              style={{
                ...textStyle,
                fontSize: window.innerWidth > 600 ? 36 : 30,
                fontWeight: 600,
              }}
              mt={5}
            >
              SORRY, COULDN&apos;T PLACE THE ORDER :(
            </Typography>
            <Typography
              style={{
                ...textStyle,
                fontSize: window.innerWidth > 600 ? 26 : 20,
              }}
              my={2}
            >
              Something went wrong with the payment. Please try again
            </Typography>
          </>
        ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addLoader,
  removeLoader,
  updateCart,
})(OrderStatus);

import { Grid, Typography, Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import textStyle from "../helpers/textStyle";
import { connect } from "react-redux";
import {
  addLoader,
  removeLoader,
} from "../redux/services/actions/loaderActions";
import axios from "axios";
import { BASE_URL_1 } from "../constants/urls";
import { useSnackbar } from "notistack";
import formatAmount from "../helpers/formatAmount";
import { useRouter } from "next/navigation";
import Image from 'next/image'

const Wishlist = (props) => {
  const [wishlist, setWishlist] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useRouter();
  const config = {
    headers: {
      Authorization: `Bearer ${props.auth.token}`,
    },
  };

  const fetchWishlist = async () => {
    props.addLoader();
    try {
      const res = await axios.get(`${BASE_URL_1}/wishlist/get`, config);
      setWishlist(res.data.wishlist);
      props.removeLoader();
    } catch (err) {
      props.removeLoader();
      console.log(err);
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

  const handleRemoveFromWishlist = async (id) => {
    props.addLoader();
    try {
      const res = await axios.post(
        `${BASE_URL_1}/wishlist/remove`,
        {
          productId: id,
        },
        config
      );
      setWishlist(res.data.wishlist);
      props.removeLoader();
    } catch (err) {
      props.removeLoader();
      console.log(err);
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
    if (!props?.auth?.isAuthenticated) {
      navigate.push("/login");
      return;
    }
    fetchWishlist();
  }, []);

  return (
    <div
      style={{
        marginTop: 20,
        width: window.innerWidth > 500 ? "60%" : "90%",
        margin: "auto",
        padding: 10,
      }}
    >
      <Typography
        style={{
          ...textStyle,
          fontWeight: 700,
          fontSize: window.innerWidth > 500 ? 32 : 26,
          textAlign: "center",
        }}
        my={2}
      >
        YOUR WISHLIST
      </Typography>
      {wishlist?.length > 0 ? (
        wishlist.map((product, idx) => (
          <Grid key={idx} container my={1}>
            <Grid item xs={3}>
              <Link
                style={{ cursor: "pointer" }}
                onClick={() => navigate.push(`/product/${product._id}`)}
              >
                <Image
                  src={product.imageUrls[0]}
                  alt={product.name}
                  style={{ width: "80%", aspectRatio: 0.7 }}
                />
              </Link>
            </Grid>
            <Grid item xs={8}>
              <Link
                style={{ cursor: "pointer" }}
                onClick={() => navigate.push(`/product/${product._id}`)}
              >
                <Typography
                  style={{
                    ...textStyle,
                    fontSize: window.innerWidth > 500 ? "25px" : "20px",
                    textAlign: "start",
                  }}
                  my={1}
                >
                  {product.name}
                </Typography>
                <Typography
                  style={{
                    ...textStyle,
                    fontSize: window.innerWidth > 500 ? "20px" : "16px",
                  }}
                  my={1}
                >
                  {formatAmount(product.price)}
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={1} sx={{ margin: "auto" }}>
              <Link
                style={{ cursor: "pointer" }}
                onClick={() => handleRemoveFromWishlist(product._id)}
              >
                <Typography
                  style={{
                    ...textStyle,
                    fontSize: window.innerWidth > 500 ? "25px" : "20px",
                    textAlign: "center",
                  }}
                  my={1}
                >
                  X
                </Typography>
              </Link>
            </Grid>
          </Grid>
        ))
      ) : (
        <Typography style={{ ...textStyle, textAlign: "center" }}>
          Your wishlist is empty
        </Typography>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLoader, removeLoader })(Wishlist);

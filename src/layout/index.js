import { Grid, Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addLoader, removeLoader } from "../redux/services/actions/loaderActions";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/header";
import axios from "axios";
import { BASE_URL_2 } from "../constants/urls";

const Layout = (props) => {
  const [categories, setCategories] = useState()

  const fetchCategories = async () => {
    props.addLoader()
    try {
      const res = await axios.get(`${BASE_URL_2}/products/category/getall`)
      setCategories(res.data.categories)
      props.removeLoader()
    } catch (err) {
      props.removeLoader()
      let message = 'Something went wrong'
      if (err?.response?.data?.errors) {
        message = err?.response?.data?.errors[0].msg
      } else if (err?.response?.data?.message) {
        message = err?.response?.data?.message
      }
      enqueueSnackbar(message, {
        variant: 'error',
        autoHideDuration: 3000
      })
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <>
      <Header categories={categories} />
      <Outlet />
      <Footer categories={categories} />
      <div style={{ position: "fixed", right: 0, top: "50%", width: Math.min(window.innerWidth, window.innerHeight) > 950 ? "8em" : "2.5em", transform: "translate(0%, -50%)" }} >
        <div style={{ position: "relative", top: "-50%" }}>
          <Grid container>
            <Grid item xs={12}>
              <Link href="https://www.facebook.com/Bloom-boutique-805278062837758/" rel="noopener" target="_blank">
                <img src="/fb.png" style={{ width: "100%", borderRadius: '5px' }} />
              </Link>
            </Grid>

            <Grid item xs={12}>
              <Link href="https://wa.me/918983355550" rel="noopener" target="_blank">
                <img src="/wa.png" style={{ width: "100%", borderRadius: '5px' }} />
              </Link>
            </Grid>

            <Grid item xs={12}>
              <Link href="https://www.youtube.com/channel/UCU4Pe-yOh1BrfeZGYhX062Q" rel="noopener" target="_blank">
                <img src="/yt.png" style={{ width: "100%", borderRadius: '5px' }} />
              </Link>
            </Grid>

            <Grid item xs={12}>
              <Link href="https://www.instagram.com/bloom_by_khushbu/" rel="noopener" target="_blank">
                <img src="/in.jpeg" style={{ width: "100%", borderRadius: '5px' }} />
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default connect(null, { addLoader, removeLoader })(Layout);

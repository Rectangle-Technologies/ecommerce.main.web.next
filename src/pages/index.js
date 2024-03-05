import { Grid, Link as MaterialLink } from "@mui/material";
import axios from "axios";
import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import CategoriesLayout from "../components/CategoriesLayout";
import DoubleTextComponent from "../components/DoubleText";
import ProductLayout from "../components/ProductLayout";
import { BASE_URL_2 } from "../constants/urls";
import {
  addLoader,
  removeLoader,
} from "../redux/services/actions/loaderActions";
import { useSnackbar } from "notistack";
import Link from "next/link";

const Landing = (props) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState();
  const { enqueueSnackbar } = useSnackbar();

  const fetchNewArrivals = async () => {
    props.addLoader();
    try {
      const res = await axios.get(`${BASE_URL_2}/products/latest`);
      setProducts(res.data.products);
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

  const fetchCategories = async () => {
    props.addLoader();
    try {
      const res = await axios.get(`${BASE_URL_2}/products/category/getall`);
      setCategories(res.data.categories);
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

  useEffect(() => {
    fetchNewArrivals();
    fetchCategories();
  }, []);
  return (
    <>
      {/* <Caraousel /> */}
      <DoubleTextComponent
        backTextFontSize={window.innerWidth < 500 ? "9.5vw" : "8vw"}
        frontTextFontSize={window.innerWidth < 500 ? "5vw" : "3.5vw"}
        frontTextTopDistance={window.innerWidth < 500 ? "0vw" : "0vw"}
        backText=""
        frontText="New Arrivals"
        marginTop="1.5vw"
      />
      <Grid
        container
        my={2}
        spacing={window.innerWidth > 600 ? 6 : 3}
        style={{ padding: "0px 7.5vw 0px 7.5vw" }}
      >
        {products?.map((p, idx) => (
          <Grid key={idx} item xs={6} md={3}>
            <Link href={`/product/${p._id}`}>
              <MaterialLink style={{ cursor: "pointer" }}>
                <ProductLayout
                  liked={true}
                  new={true}
                  title={p.name}
                  mrp={p.price}
                  imageUrl={p.imageUrls[0]}
                />
              </MaterialLink>
            </Link>
          </Grid>
        ))}
      </Grid>
      <DoubleTextComponent
        backTextFontSize={window.innerWidth < 500 ? "9.5vw" : "8vw"}
        frontTextFontSize={window.innerWidth < 500 ? "5vw" : "3.5vw"}
        frontTextTopDistance={window.innerWidth < 500 ? "0vw" : "0vw"}
        backText=""
        frontText="Categories"
        marginTop="1.5vw"
      />
      <Grid
        container
        my={2}
        spacing={3}
        style={{ padding: "0px 7.5vw 0px 7.5vw", marginBottom: "50px" }}
      >
        {categories?.map((category, idx) => (
          <Grid item xs={6} md={3} key={idx}>
            <Link href={`/category/${category?._id}`}>
              <MaterialLink style={{ cursor: "pointer" }}>
                <CategoriesLayout
                  image={category?.imageUrl}
                  title={category?.title}
                />
              </MaterialLink>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default connect(null, { addLoader, removeLoader })(Landing);

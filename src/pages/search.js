import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import {
  addLoader,
  removeLoader,
} from "../redux/services/actions/loaderActions";
import axios from "axios";
import { BASE_URL_2 } from "../constants/urls";
import SearchDesktop from "../components/search/desktop/SearchDesktop";
import SearchMobile from "../components/search/mobile/SearchMobile";
import Desktop from "../components/responsive/Desktop";
import Tablet from "../components/responsive/Tablet";
import Mobile from "../components/responsive/Mobile";

const Search = (props) => {
  const [name, setName] = useState("");
  const [products, setProducts] = useState();
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sizes, setSizes] = useState([]);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const limit = 12;

  const fetchProducts = async () => {
    props.addLoader();
    try {
      const res = await axios.post(
        `${BASE_URL_2}/products/fetchByFilter?page=${page}&limit=${limit}&empty=required`,
        {
          priceRange: { min: priceRange[0], max: priceRange[1] },
          sizes,
          name: name,
        }
      );
      setProducts(res.data.products);
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

  useEffect(() => {
    if (isFirstTime) {
      setIsFirstTime(false);
    } else {
      fetchProducts();
    }
  }, [page]);

  return (
    <>
      <Desktop>
        <SearchDesktop
          products={products}
          setProducts={setProducts}
          name={name}
          setName={setName}
          page={page}
          setPage={setPage}
          maxPages={maxPages}
          setMaxPages={setMaxPages}
          limit={limit}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          sizes={sizes}
          setSizes={setSizes}
          fetchProducts={fetchProducts}
        />
      </Desktop>
      <Tablet>
        <SearchDesktop
          products={products}
          setProducts={setProducts}
          name={name}
          setName={setName}
          page={page}
          setPage={setPage}
          maxPages={maxPages}
          setMaxPages={setMaxPages}
          limit={limit}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          sizes={sizes}
          setSizes={setSizes}
          fetchProducts={fetchProducts}
        />
      </Tablet>
      <Mobile>
        <SearchMobile
          products={products}
          setProducts={setProducts}
          name={name}
          setName={setName}
          page={page}
          setPage={setPage}
          maxPages={maxPages}
          setMaxPages={setMaxPages}
          limit={limit}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          sizes={sizes}
          setSizes={setSizes}
          fetchProducts={fetchProducts}
        />
      </Mobile>
    </>
  );
};

export default connect(null, { addLoader, removeLoader })(Search);

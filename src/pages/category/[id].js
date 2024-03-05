import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import CategoryDesktop from "../components/category/desktop/CategoryDesktop";
import { connect } from "react-redux";
import {
  addLoader,
  removeLoader,
} from "../redux/services/actions/loaderActions";
import axios from "axios";
import { BASE_URL_2 } from "../constants/urls";
import CategoryMobile from "../components/category/mobile/CategoryMobile";
import Desktop from "../components/responsive/Desktop";
import Tablet from "../components/responsive/Tablet";
import Mobile from "../components/responsive/Mobile";
import { useParams } from "next/navigation";

const Category = (props) => {
  const [category, setCategory] = useState();
  const [products, setProducts] = useState();
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sizes, setSizes] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const limit = 12;
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  const fetchCategory = async () => {
    props.addLoader();
    try {
      let res = await axios.get(`${BASE_URL_2}/products/category/${id}`);
      setCategory(res.data.category);
      res = await axios.post(
        `${BASE_URL_2}/products/fetchByFilter?page=${page}&limit=${limit}`,
        {
          categoryId: id,
          priceRange: { min: priceRange[0], max: priceRange[1] },
          sizes,
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
    fetchCategory();
  }, [id, page]);

  return (
    <>
      <Desktop>
        <CategoryDesktop
          category={category}
          products={products}
          setProducts={setProducts}
          page={page}
          setPage={setPage}
          maxPages={maxPages}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          sizes={sizes}
          setSizes={setSizes}
          setMaxPages={setMaxPages}
          limit={limit}
        />
      </Desktop>
      <Tablet>
        <CategoryDesktop
          category={category}
          products={products}
          setProducts={setProducts}
          page={page}
          setPage={setPage}
          maxPages={maxPages}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          sizes={sizes}
          setSizes={setSizes}
          setMaxPages={setMaxPages}
          limit={limit}
        />
      </Tablet>
      <Mobile>
        <CategoryMobile
          category={category}
          products={products}
          setProducts={setProducts}
          page={page}
          setPage={setPage}
          maxPages={maxPages}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          sizes={sizes}
          setSizes={setSizes}
          setMaxPages={setMaxPages}
          limit={limit}
        />
      </Mobile>
    </>
  );
};

export default connect(null, { addLoader, removeLoader })(Category);

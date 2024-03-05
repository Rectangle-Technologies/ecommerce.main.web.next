import {
  Box,
  Container,
  Grid,
  Link as MaterialLink,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import textStyle from "../helpers/textStyle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DoubleTextComponent from "../components/DoubleText";
import ProductLayout from "../components/ProductLayout";
import { isMobile } from "react-device-detect";
import { useSnackbar } from "notistack";
import { connect } from "react-redux";
import {
  addLoader,
  removeLoader,
} from "../redux/services/actions/loaderActions";
import { updateCart } from "../redux/services/actions/cartActions";
import axios from "axios";
import { BASE_URL_1, BASE_URL_2 } from "../constants/urls";
import formatAmount from "../helpers/formatAmount";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

const ProductDetail = (props) => {
  const savedProduct = JSON.parse(localStorage.getItem("product"));
  const [product, setProduct] = useState();
  const [newArrivals, setNewArrivals] = useState();
  const [quantity, setQuantity] = useState(
    savedProduct ? savedProduct.quantity : 1
  );
  const [size, setSize] = useState(savedProduct ? savedProduct.size : null);
  const [showMessage, setShowMessage] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const navigate = useRouter();
  const [launched, setLaunched] = useState(true);

  const config = {
    headers: {
      Authorization: `Bearer ${props.auth.token}`,
    },
  };

  const fetchProduct = async () => {
    props.addLoader();
    try {
      const res = await axios.get(`${BASE_URL_2}/products/fetchDetails/${id}`);
      setProduct(res.data.product);
      props.removeLoader();
    } catch (err) {
      props.removeLoader();
      if (err?.response?.data?.status === "PRODUCT_NOT_LAUNCHED") {
        setProduct(err.response.data.product);
        setLaunched(false);
      }
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

  const fetchNewArrivals = async () => {
    props.addLoader();
    try {
      const res = await axios.get(`${BASE_URL_2}/products/latest`);
      setNewArrivals(res.data.products.slice(0, 4));
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

  const handleAddToCart = async () => {
    if (!size) {
      enqueueSnackbar("Please select size", {
        variant: "error",
        autoHideDuration: 3000,
      });
      return;
    }
    if (!props.auth.isAuthenticated) {
      localStorage.setItem(
        "product",
        JSON.stringify({
          productId: id,
          quantity,
          size,
        })
      );
      navigate.push("/login", {
        state: { navigateUrl: `/product/${id}` },
      });
      return;
    }
    props.addLoader();
    try {
      const res = await axios.post(
        `${BASE_URL_1}/cart/add`,
        {
          productId: id,
          quantity,
          size,
        },
        config
      );
      props.updateCart(res.data.cartTotal);
      props.removeLoader();
      if (JSON.parse(localStorage.getItem("product"))) {
        localStorage.removeItem("product");
      }
      enqueueSnackbar("Product added to cart", {
        variant: "success",
        autoHideDuration: 3000,
      });
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

  const handleAddToWishlist = async () => {
    props.addLoader();
    try {
      await axios.post(
        `${BASE_URL_1}/wishlist/add`,
        {
          productId: id,
        },
        config
      );
      props.removeLoader();
      enqueueSnackbar("Added to wishlist", {
        variant: "success",
        autoHideDuration: 3000,
      });
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

  const updateQuantity = (action) => {
    if (action === "+") {
      setQuantity(quantity + 1);
    } else {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    }
  };

  const handleSizeChange = (size, product) => {
    if (product.type === "ORDER" || size.stock > 0) {
      setSize(size.title);
    }
    if (product.type === "STOCK" && size.stock > 0 && size.stock < 4) {
      setShowMessage(true);
    } else if (product.type === "ORDER" || size.stock >= 4) {
      setShowMessage(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchNewArrivals();
    if (props.auth.isAuthenticated && savedProduct) {
      handleAddToCart();
    }
  }, [id]);

  return (
    <>
      {!launched ? (
        <center>
          <Typography style={{ ...textStyle, fontSize: 20 }}>
            Product not launched yet
          </Typography>
          <Typography style={{ ...textStyle, fontSize: 20 }}>
            Come back later at {new Date(product.launch_time).toDateString()}{" "}
          </Typography>{" "}
        </center>
      ) : (
        <>
          {product && (
            <Container maxWidth="lg">
              <Grid container my={5} p={window.innerWidth < 500 ? 0 : 3}>
                <Grid item xs={12} md={5} my={2}>
                  <center>
                    <div
                      id="carouselExampleControls"
                      className="carousel slide"
                      data-ride="carousel"
                      style={{
                        width: window.innerWidth < 500 ? "100%" : "80%",
                      }}
                    >
                      <div className="carousel-inner">
                        {product.imageUrls.map((url, index) => {
                          return (
                            <div
                              className={
                                "carousel-item" + (index === 0 ? " active" : "")
                              }
                              key={index}
                            >
                              <Image
                                className="d-block w-100"
                                key={index}
                                src={url}
                                alt={product.name}
                              />
                            </div>
                          );
                        })}
                      </div>
                      <a
                        className="carousel-control-prev"
                        href="#carouselExampleControls"
                        role="button"
                        data-slide="prev"
                      >
                        <span
                          className="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="sr-only">Previous</span>
                      </a>
                      <a
                        className="carousel-control-next"
                        href="#carouselExampleControls"
                        role="button"
                        data-slide="next"
                      >
                        <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="sr-only">Next</span>
                      </a>
                    </div>
                  </center>
                </Grid>
                <Grid item xs={12} md={5}>
                  <Typography
                    style={{ ...textStyle, fontWeight: 500, fontSize: 24 }}
                    my={1}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    style={{
                      ...textStyle,
                      fontFamily: "Roboto",
                      color: "#928C8C",
                    }}
                    my={1}
                  >
                    Product by Bloom By Khushboo
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 60,
                    }}
                  >
                    <Typography
                      style={{ ...textStyle, fontWeight: 600, fontSize: 30 }}
                    >
                      {formatAmount(product.price)}
                    </Typography>
                    {product.mrp !== product.price && (
                      <Typography
                        style={{
                          ...textStyle,
                          fontSize: 20,
                          color: "#928C8C",
                          textDecoration: "line-through",
                        }}
                        ml={2}
                      >
                        {formatAmount(product.mrp)}
                      </Typography>
                    )}
                  </div>
                  <Typography
                    style={{ ...textStyle, fontFamily: "Roboto" }}
                    my={2}
                  >
                    Select size:
                  </Typography>
                  <div>
                    <Box style={{ display: "flex", flexDirection: "row" }}>
                      {product.sizes.map((s, key) => (
                        <MaterialLink
                          key={key}
                          style={{
                            cursor:
                              product.type === "ORDER" || s.stock > 0
                                ? "pointer"
                                : "default",
                          }}
                          onClick={() => handleSizeChange(s, product)}
                        >
                          <div
                            style={{
                              border:
                                product.type === "ORDER" || s.stock > 0
                                  ? s.title === size
                                    ? "1px solid #eb31e2"
                                    : "1px solid #222222"
                                  : "1px solid #d2d4d6",
                              borderRadius: "50%",
                              width: 40,
                              height: 40,
                              padding: "6px",
                              margin: "0px 20px 0px 0px",
                            }}
                          >
                            <Typography
                              style={{
                                ...textStyle,
                                fontFamily: "Roboto",
                                textAlign: "center",
                                color:
                                  product.type === "ORDER" || s.stock > 0
                                    ? s.title === size
                                      ? "#eb31e2"
                                      : "#222222"
                                    : "#d2d4d6",
                                textDecoration:
                                  product.type === "ORDER" || s.stock > 0
                                    ? "none"
                                    : "line-through",
                              }}
                            >
                              {s.title}
                            </Typography>
                          </div>
                        </MaterialLink>
                      ))}
                    </Box>
                    {showMessage && (
                      <Typography my={1} style={{ ...textStyle, color: "red" }}>
                        Only few left!
                      </Typography>
                    )}
                  </div>
                  <Box style={{ display: "flex" }} my={5}>
                    <MaterialLink
                      style={{ cursor: "pointer" }}
                      onClick={() => updateQuantity("-")}
                    >
                      <div
                        style={{
                          border: "1px solid #222222",
                          width: 40,
                          height: 40,
                          padding: "6px",
                        }}
                      >
                        <Typography
                          style={{
                            ...textStyle,
                            fontFamily: "Roboto",
                            textAlign: "center",
                          }}
                        >
                          -
                        </Typography>
                      </div>
                    </MaterialLink>
                    <div
                      style={{
                        border: "1px solid #222222",
                        width: 40,
                        height: 40,
                        padding: "6px",
                      }}
                    >
                      <Typography
                        style={{
                          ...textStyle,
                          fontFamily: "Roboto",
                          textAlign: "center",
                        }}
                      >
                        {quantity}
                      </Typography>
                    </div>
                    <MaterialLink
                      style={{ cursor: "pointer" }}
                      onClick={() => updateQuantity("+")}
                    >
                      <div
                        style={{
                          border: "1px solid #222222",
                          width: 40,
                          height: 40,
                          padding: "6px",
                        }}
                      >
                        <Typography
                          style={{
                            ...textStyle,
                            fontFamily: "Roboto",
                            textAlign: "center",
                          }}
                        >
                          +
                        </Typography>
                      </div>
                    </MaterialLink>
                    <MaterialLink
                      style={{ cursor: "pointer", width: "90%" }}
                      onClick={handleAddToWishlist}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0px 0px 0px 30px",
                          border: "1px solid #222222",
                          padding: "7px",
                          borderRadius: "30px",
                          backgroundColor: "#F8F5CC",
                        }}
                      >
                        <FavoriteIcon
                          style={{ color: "#fc03f8", margin: "0px 5px" }}
                        />
                        <Typography
                          style={{
                            ...textStyle,
                            fontSize: 14,
                            fontWeight: 500,
                            color: "#330C3E",
                            textAlign: "center",
                          }}
                          ml={1}
                        >
                          Add to Wishlist
                        </Typography>
                      </div>
                    </MaterialLink>
                  </Box>
                  <MaterialLink
                    style={{ cursor: "pointer" }}
                    onClick={handleAddToCart}
                  >
                    <div
                      style={{
                        border: "1px solid #222222",
                        width: "100%",
                        padding: "5px",
                        borderRadius: "30px",
                        backgroundColor: "#F8F5CC",
                      }}
                    >
                      <Typography
                        style={{
                          ...textStyle,
                          color: "#330C3E",
                          fontWeight: 500,
                          textAlign: "center",
                        }}
                      >
                        Add to Cart
                      </Typography>
                    </div>
                  </MaterialLink>
                </Grid>
              </Grid>
              <div style={{ margin: "20px" }}>
                <Typography
                  style={{
                    ...textStyle,
                    fontFamily: "Playfair Display",
                    textDecoration: "underline",
                    fontSize: isMobile ? 25 : 36,
                    fontWeight: 500,
                  }}
                >
                  Product Description
                </Typography>
                <Typography
                  style={{ ...textStyle, fontWeight: 300, fontSize: 18 }}
                  my={1}
                >
                  {product.description}
                </Typography>
                {product.features.length > 0 && (
                  <Typography
                    style={{ ...textStyle, fontWeight: 300, fontSize: 18 }}
                    my={1}
                  >
                    <ul style={{ listStyleType: "disc" }}>
                      {product.features.map((f, key) => (
                        <li key={key}>
                          {f.key}: {f.value}
                        </li>
                      ))}
                    </ul>
                  </Typography>
                )}
              </div>
              {product?.recommendations?.length > 0 && (
                <div style={{ margin: window.innerWidth > 500 ? 20 : 0 }}>
                  <DoubleTextComponent
                    backText=""
                    frontText="Recommendations"
                    left="-60%"
                    frontTextTopDistance="0vw"
                    marginTop="1.5vw"
                  />
                  <Grid
                    container
                    spacing={window.innerWidth > 500 ? 3 : 1.5}
                    style={{ padding: "0px 7.5vw 0px 7.5vw" }}
                  >
                    {product.recommendations?.map((recommendation, index) => {
                      return (
                        <Grid item xs={6} md={3} key={index}>
                          <ProductLayout
                            imageUrl={recommendation.imageUrl}
                            liked={true}
                            new={true}
                            title={recommendation.name}
                            mrp={recommendation._id.price}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </div>
              )}
              <div style={{ margin: window.innerWidth > 500 ? 20 : 0 }}>
                <DoubleTextComponent
                  backText=""
                  frontText="New Arrivals"
                  left="-60%"
                  frontTextTopDistance="0vw"
                  marginTop="1.5vw"
                  marginBottom="3vw"
                />
                <Grid
                  container
                  spacing={window.innerWidth > 500 ? 3 : 1.5}
                  style={{ padding: "0px 7.5vw 0px 7.5vw" }}
                >
                  {newArrivals?.map((p, idx) => (
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
              </div>
              <div style={{ margin: 20 }}>
                <Typography
                  style={{
                    ...textStyle,
                    fontFamily: "Roboto",
                    fontWeight: 500,
                    fontSize: 30,
                    textAlign: "center",
                  }}
                >
                  Return Policy
                </Typography>
                <Typography style={textStyle} my={1}>
                  Bloombykhushbu.co.in follows a friendly policy to ensure your
                  purchases are free of stress. We are always with you, before
                  and after your purchase. As an additional measure, please read
                  through the following terms & conditions prior to making a
                  purchase.
                </Typography>
                <Typography style={textStyle} component="div" my={1}>
                  <Box display="inline" style={{ fontWeight: 600 }}>
                    Return:{" "}
                  </Box>
                  We humbly don&apos;t take returns on items sold once.
                </Typography>
                <Typography style={textStyle} component="div" my={1}>
                  <Box display="inline" style={{ fontWeight: 600 }}>
                    Damaged/Wrong Delivery:{" "}
                  </Box>
                  If it&apos;s a damaged/defective product, incorrect item sent,
                  such cases are to be informed us within 24 hours of delivery.
                  we will replace the product with the next fastest possible
                  courier facility. However, when a product is shipped from our
                  warehouse it goes under 3 layers of quality check and we
                  record the process for your reference as well. Still, if there
                  is an issue with the product we would resolve it for you. Only
                  products which are unused, unworn, unwashed, undamaged, with
                  all its labels and tags completely intact, in original
                  packaging and eligible for exchange. Opening Video of the
                  parcel for the first time is mandatory in both the scenerios
                  otherwise we will not be able to proceed with the exchange.
                </Typography>
                <Typography
                  style={{ ...textStyle, fontSize: 25, fontWeight: 700 }}
                  my={2}
                >
                  Can I cancel my order?
                </Typography>
                <Typography style={textStyle} my={1}>
                  Prepaid orders are not eligible for cancellation.
                </Typography>
                <Typography style={textStyle} my={1}>
                  You can cancel your Cash on Delivery order within 24 hours of
                  order. Please call us on 8983355550 or write to us at
                  bloombykhushbu1984@gmail.com to request a cancellation.
                </Typography>
                <Typography
                  style={{ ...textStyle, fontSize: 25, fontWeight: 700 }}
                  my={2}
                >
                  When my exchange is not accepted?
                </Typography>
                <Typography style={textStyle} my={1}>
                  We endeavour to ensure that every transaction at our website
                  is seamless. We take great care in delivering our products and
                  adhere to the highest quality standards.
                </Typography>
                <Typography style={textStyle} my={1}>
                  <ul style={{ listStyleType: "disc" }}>
                    <li>
                      Exchange/Return not accepted if Customer does not like the
                      material or colour of the dress, we suggest that the
                      customer should read the product description & have a look
                      at all the pictures before ordering.
                    </li>
                    <li>
                      Our products are made and handled by human hands involving
                      various processes.There is bound to be variations in
                      colour, finish and overall look. The colours you see on
                      our website will depend on the accuracy of your monitor
                      for which subtle variations must be acknowledged.
                    </li>
                    <li>
                      10-12% Colour difference depends on the screen resolution
                      of the device used by the client and camera lights, please
                      don&apos;t expect an exchange or return for the same.
                    </li>
                    <li>
                      We have made every effort to display the colours of our
                      products that appear on Laglits.com as accurately as
                      possible. However, as computer monitors, tablets and
                      mobile devices vary, we cannot guarantee that your
                      monitor&apos;s display of a colour will be completely
                      accurate.
                    </li>
                    <li>
                      Exchange/Return not accepted if the product is washed and
                      worn.
                    </li>
                    <li>
                      Purchase made from SALE section are not eligible for any
                      kind of return or exchange. All the sale, discounted,
                      brought with a coupon and gift voucher purchases are non
                      returnable, non refundable & non exchangeable.
                    </li>
                  </ul>
                </Typography>
              </div>
            </Container>
          )}
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addLoader,
  removeLoader,
  updateCart,
})(ProductDetail);

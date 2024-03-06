import "@/styles/globals.css";
import { usePathname } from "next/navigation";
import { SnackbarProvider } from "notistack";
import { Component } from "react";
import { connect, Provider } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import { CircularProgress } from "@mui/material";
import Socket from "@/components/Socket";
import { removeLoader } from "@/redux/services/actions/loaderActions";
import store from "@/redux/store";
import Header from "@/components/header";
import Footer from "@/components/footer/Footer";
import { Grid, Link as MaterialLink } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BASE_URL_2 } from "@/constants/urls";
import axios from "axios";
import { addLoader } from "@/redux/services/actions/loaderActions";

class ReduxSetup extends Component {
  render() {
    return (
      <Provider store={store}>
        <SnackbarProvider
          preventDuplicate
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          maxSnack={3}
        >
          {this.props.children}
        </SnackbarProvider>
      </Provider>
    );
  }
}

const ScrollToTop = (props) => {
  const location = usePathname();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>;
};

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
  };
};

function App({ Component, pageProps }) {
  const [categories, setCategories] = useState();
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
    fetchCategories();
  }, []);
  return (
    <ReduxSetup>
      <Socket>
        <ScrollToTop>
          <Header categories={categories} />
          <Component {...pageProps} />
          <Footer categories={categories} />
          <div
            style={{
              position: "fixed",
              right: 0,
              top: "50%",
              width:
                typeof window !== "undefined" &&
                Math.min(window.innerWidth, window.innerHeight) > 950
                  ? "8em"
                  : "2.5em",
              transform: "translate(0%, -50%)",
            }}
          >
            <div style={{ position: "relative", top: "-50%" }}>
              <Grid container>
                <Grid item xs={12}>
                  <Link
                    href="https://www.facebook.com/Bloom-boutique-805278062837758/"
                    rel="noopener"
                    target="_blank"
                  >
                    <MaterialLink>
                      <Image
                        alt="Facebook icon"
                        src="/fb.png"
                        style={{ width: "100%", borderRadius: "5px" }}
                      />
                    </MaterialLink>
                  </Link>
                </Grid>

                <Grid item xs={12}>
                  <Link
                    href="https://wa.me/918983355550"
                    rel="noopener"
                    target="_blank"
                  >
                    <MaterialLink>
                      <Image
                        alt="Whatsapp icon"
                        src="/wa.png"
                        style={{ width: "100%", borderRadius: "5px" }}
                      />
                    </MaterialLink>
                  </Link>
                </Grid>

                <Grid item xs={12}>
                  <Link
                    href="https://www.youtube.com/channel/UCU4Pe-yOh1BrfeZGYhX062Q"
                    rel="noopener"
                    target="_blank"
                  >
                    <MaterialLink>
                      <Image
                        alt="Youtube icon"
                        src="/yt.png"
                        style={{ width: "100%", borderRadius: "5px" }}
                      />
                    </MaterialLink>
                  </Link>
                </Grid>

                <Grid item xs={12}>
                  <Link
                    href="https://www.instagram.com/bloom_by_khushbu/"
                    rel="noopener"
                    target="_blank"
                  >
                    <MaterialLink>
                      <Image
                        alt="India"
                        src="/in.jpeg"
                        style={{ width: "100%", borderRadius: "5px" }}
                      />
                    </MaterialLink>
                  </Link>
                </Grid>
              </Grid>
            </div>
          </div>
        </ScrollToTop>
      </Socket>
    </ReduxSetup>
  );
}


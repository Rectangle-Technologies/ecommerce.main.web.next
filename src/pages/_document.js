import Footer from "@/components/footer/Footer";
import Header from "@/components/header";
import { Html, Head, Main, NextScript } from "next/document";
import { Grid, Link } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
export default function Document() {
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
    <Html lang="en">
      <Head />
      <body>
        <Header categories={categories} />
        <Main />
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
                  <Image
                    alt="Facebook icon"
                    src="/fb.png"
                    style={{ width: "100%", borderRadius: "5px" }}
                  />
                </Link>
              </Grid>

              <Grid item xs={12}>
                <Link
                  href="https://wa.me/918983355550"
                  rel="noopener"
                  target="_blank"
                >
                  <Image
                    alt="Whatsapp icon"
                    src="/wa.png"
                    style={{ width: "100%", borderRadius: "5px" }}
                  />
                </Link>
              </Grid>

              <Grid item xs={12}>
                <Link
                  href="https://www.youtube.com/channel/UCU4Pe-yOh1BrfeZGYhX062Q"
                  rel="noopener"
                  target="_blank"
                >
                  <Image
                    alt="Youtube icon"
                    src="/yt.png"
                    style={{ width: "100%", borderRadius: "5px" }}
                  />
                </Link>
              </Grid>

              <Grid item xs={12}>
                <Link
                  href="https://www.instagram.com/bloom_by_khushbu/"
                  rel="noopener"
                  target="_blank"
                >
                  <Image
                    alt="India"
                    src="/in.jpeg"
                    style={{ width: "100%", borderRadius: "5px" }}
                  />
                </Link>
              </Grid>
            </Grid>
          </div>
        </div>
        <NextScript />
      </body>
    </Html>
  );
}

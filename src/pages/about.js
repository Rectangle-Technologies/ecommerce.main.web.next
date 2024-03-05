import { Grid, Link as MaterialLink, Typography } from "@mui/material";
import React from "react";
import DoubleTextComponent from "../components/DoubleText";
import "./about.css";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import InventoryIcon from "@mui/icons-material/Inventory";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import { BrowserView, MobileView } from "react-device-detect";
import InstagramIcon from "@mui/icons-material/Instagram";
import Image from "next/image";
import styles from "@/styles/About.module.css";
import Link from 'next/link'

const AboutPage = () => {
  return (
    <>
      {/* ABOUT PAGE BANNER */}
      <BrowserView>
        <div
          style={{ position: "relative" }}
          className={styles.about_page_banner_img}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "rgb(0,0,0,0.35)",
            }}
          ></div>
          <div style={{ position: "absolute", left: "50%", bottom: "0" }}>
            <Typography
              style={{
                position: "relative",
                left: "-50%",
                color: "white",
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: "5vw",
              }}
            >
              #Bloom_by_Khushboo
            </Typography>
          </div>
        </div>
      </BrowserView>

      <MobileView>
        <div
          style={{ position: "relative", width: "100%" }}
          className={styles.about_page_banner_img}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "rgb(0,0,0,0.35)",
            }}
          ></div>
          <div style={{ position: "absolute", left: "50%", bottom: "0" }}>
            <Typography
              style={{
                position: "relative",
                left: "-50%",
                color: "white",
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: "5vw",
              }}
            >
              #Bloom_by_Khushboo
            </Typography>
          </div>
        </div>
      </MobileView>

      <Grid
        container
        spacing={5}
        style={{ padding: "8vw 8vw 0 8vw", marginBottom: "100px" }}
      >
        <Grid item xs={12} md={5}>
          <center>
            <Image
              alt="Pictures from Bloom's Instagram page"
              src="/about.png"
              style={{ maxWidth: "100%" }}
            />
          </center>
        </Grid>
        <Grid item xs={12} md={7} style={{ marginBottom: "50px" }}>
          <i>
            <Typography
              style={{
                color: "#330C3E",
                fontSize: "36px",
                fontWeight: "600",
                lineHeight: "36px",
              }}
            >
              Founded By
            </Typography>
          </i>
          <hr
            style={{
              width: "50px",
              borderBottom: "5px solid #330C3E",
              margin: "0px",
            }}
          />
          <hr
            style={{
              width: "25px",
              borderBottom: "5px solid #330C3E",
              margin: "5px 0px",
            }}
          />
          <Typography
            style={{
              fontFamily: "Poppins",
              marginTop: "25px",
              fontSize: "16px",
            }}
          >
            Bloom Boutique is one of the most loved ethnic brand in India. It is
            a name that is recognized worldwide today, but the scenario was
            different 13 years back. Started in Bellary, Karnataka in a small
            room, Roshni Tulsian (CEO) had a dream, a passion to be
            self-dependent, self-sufficient, to follow her passion and to live
            her life on her own terms. A journey that had started in a room was
            now making space in the metro city. She just loved serving her
            customers. She loved it when ladies flaunted trying new dresses, and
            accepted the way they looked. Soon she was designing for models and
            fashion shows.
          </Typography>
          <Typography
            style={{
              fontFamily: "Roboto",
              marginTop: "25px",
              fontSize: "20px",
              lineHeight: "24px",
            }}
          >
            “The boutique stocks not only an exciting range of women&apos;s wear
            but also accessories, jewellery and bags.”
          </Typography>
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "25px" }}
          >
            <div
              style={{
                borderBottom: "5px solid #330C3E",
                width: "15px",
                marginRight: "10px",
              }}
            ></div>
            <Typography
              style={{
                fontFamily: "Kaushan Script",
                fontSize: "25px",
                lineHeight: "27px",
              }}
            >
              Khushbo
            </Typography>
          </div>
        </Grid>
      </Grid>

      <div
        style={{ position: "relative" }}
        className={styles.about_page_feature_img}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgb(0,0,0,0.5)",
            position: "absolute",
          }}
        ></div>
        <div
          style={{
            width: "100%",
            position: "relative",
            padding: "0px 10vw 0px 10vw",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={6} md={3} pb={2}>
              <center>
                <LocalShippingIcon
                  style={{ color: "#F8F5CC", fontSize: "55px" }}
                />
                <Typography
                  color="#F8F5CC"
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "600",
                    fontSize: "22px",
                  }}
                >
                  Worldwide Delivery
                </Typography>
                <Typography color="#F8F5CC">
                  On-Time Delivery with Nominal Charges
                </Typography>
              </center>
            </Grid>
            <Grid item xs={6} md={3} pb={2}>
              <center>
                <SupportAgentIcon
                  style={{ color: "#F8F5CC", fontSize: "55px" }}
                />
                <Typography
                  color="#F8F5CC"
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "600",
                    fontSize: "22px",
                  }}
                >
                  Worldwide Delivery
                </Typography>
                <Typography color="#F8F5CC">
                  On-Time Delivery with Nominal Charges
                </Typography>
              </center>
            </Grid>
            <Grid item md={3} xs={6} pb={2}>
              <center>
                <InventoryIcon style={{ color: "#F8F5CC", fontSize: "55px" }} />
                <Typography
                  color="#F8F5CC"
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "600",
                    fontSize: "22px",
                  }}
                >
                  Worldwide Delivery
                </Typography>
                <Typography color="#F8F5CC">
                  On-Time Delivery with Nominal Charges
                </Typography>
              </center>
            </Grid>
            <Grid item md={3} xs={6} pb={2}>
              <center>
                <DesignServicesIcon
                  style={{ color: "#F8F5CC", fontSize: "55px" }}
                />
                <Typography
                  color="#F8F5CC"
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "600",
                    fontSize: "22px",
                  }}
                >
                  Worldwide Delivery
                </Typography>
                <Typography color="#F8F5CC">
                  On-Time Delivery with Nominal Charges
                </Typography>
              </center>
            </Grid>
          </Grid>
        </div>
      </div>
      <DoubleTextComponent
        frontText="FOLLOW US ON"
        backText=""
        frontTextFontFamily="Poppins"
        backTextFontSize="10vw"
        frontTextFontSize={
          window.innerWidth >= 900
            ? "3vw"
            : window.innerWidth >= 500
            ? "5vw"
            : "6vw"
        }
        frontTextTopDistance="7vw"
        underline={false}
        frontFontWeight="700"
        left="-50%"
        marginTop="0vw"
      />
      <Grid
        container
        spacing={0}
        style={{
          padding: "0px 10vw",
          marginBottom: "50px",
          marginTop: "120px",
        }}
      >
        <Grid
          item
          xs={6}
          md={3}
          className={styles.about_insta_img}
          style={{ position: "relative" }}
        >
          <Image
            alt="Pictures from Bloom's Instagram page"
            src="/insta1.jpeg"
          />
          <Link
            href="https://www.instagram.com/bloom_by_khushbu/"
            target="_blank"
          >
            <MaterialLink style={{ textDecoration: "none", cursor: "pointer" }}>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  aspectRatio: "1",
                  backgroundColor: "rgb(235, 49, 226,.5)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <InstagramIcon style={{ fontSize: "50px", color: "white" }} />
                <Typography
                  style={{
                    color: "white",
                    fontFamily: "Poppins",
                    fontWeight: "600",
                    fontSize: "25px",
                    lineHeight: "37px",
                    letterSpacing: "6%",
                  }}
                >
                  Follow Us
                </Typography>
              </div>
            </MaterialLink>
          </Link>
        </Grid>
        <Grid item xs={6} md={3} className={styles.about_insta_img}>
          <Image
            alt="Pictures from Bloom's Instagram page"
            src="/insta2.jpeg"
          />
        </Grid>
        <Grid item xs={6} md={3} className={styles.about_insta_img}>
          <Image
            alt="Pictures from Bloom's Instagram page"
            src="/insta3.jpeg"
          />
        </Grid>
        <Grid item xs={6} md={3} className={styles.about_insta_img}>
          <Image
            alt="Pictures from Bloom's Instagram page"
            src="/insta4.jpeg"
          />
        </Grid>
        <Grid item xs={6} md={3} className={styles.about_insta_img}>
          <Image
            alt="Pictures from Bloom's Instagram page"
            src="/insta5.jpeg"
          />
        </Grid>
        <Grid item xs={6} md={3} className={styles.about_insta_img}>
          <Image
            alt="Pictures from Bloom's Instagram page"
            src="/insta6.jpeg"
          />
        </Grid>
        <Grid item xs={6} md={3} className={styles.about_insta_img}>
          <Image
            alt="Pictures from Bloom's Instagram page"
            src="/insta7.jpeg"
          />
        </Grid>
        <Grid item xs={6} md={3} className={styles.about_insta_img}>
          <Image
            alt="Pictures from Bloom's Instagram page"
            src="/insta8.jpeg"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default AboutPage;

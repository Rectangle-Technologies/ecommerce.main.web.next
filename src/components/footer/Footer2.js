import { Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import textStyle from "../../helpers/textStyle";
import TypographyLink from "../TypographyLink";

const Footer2 = (props) => {
  const navigate = useNavigate()
  return (
    <Grid item xs={12} md={5.5} px={2}>
      <Grid container >
        <Grid item xs={4} my={1}>
          <Typography
            style={{
              ...textStyle,
              fontWeight: 600,
              fontSize: 18,
              textDecoration: "underline",
              color: "#330C3E",
            }}
            my={1}
          >
            Quick Links
          </Typography>
          <TypographyLink style={textStyle} my={1} onClick={() => navigate('/orders')}>
            My Orders
          </TypographyLink>
          <TypographyLink style={textStyle} my={1} onClick={() => navigate('/cart')}>
            View Cart
          </TypographyLink>
          <TypographyLink style={textStyle} my={1} onClick={() => navigate('/about')}>
            About Us
          </TypographyLink>
          <TypographyLink style={textStyle} my={1} onClick={() => navigate('/contact')}>
            Contact Us
          </TypographyLink>
          <TypographyLink style={textStyle} my={1} onClick={() => navigate('/exchange')}>
            Return Request
          </TypographyLink>
          <TypographyLink style={textStyle} my={1} onClick={() => navigate('/collab')}>
            Collaborate With Us
          </TypographyLink>
        </Grid>
        <Grid item xs={4} my={1}>
          <Typography
            style={{
              ...textStyle,
              fontWeight: 600,
              fontSize: 18,
              textDecoration: "underline",
              color: "#330C3E",
            }}
            my={1}
          >
            Categories
          </Typography>
          {props?.categories?.map((c, idx) => (
            <TypographyLink key={idx} style={textStyle} my={1} onClick={() => navigate(`/category/${c._id}`)}>
              {c.title}
            </TypographyLink>
          ))}
        </Grid>
        <Grid item xs={4} my={1}>
          <Typography
            style={{
              ...textStyle,
              fontWeight: 600,
              fontSize: 18,
              textDecoration: "underline",
              color: "#330C3E",
            }}
            my={1}
          >
            Policies
          </Typography>
          <TypographyLink style={textStyle} my={1} onClick={() => navigate(`/privacy`)}>
            Privacy Policy
          </TypographyLink>
          <TypographyLink style={textStyle} my={1} onClick={() => navigate(`/return`)}>
            Return Policy
          </TypographyLink>
          <TypographyLink style={textStyle} my={1} onClick={() => navigate(`/shipping`)}>
            Shipping Policy
          </TypographyLink>
          <TypographyLink style={textStyle} my={1} onClick={() => navigate(`/termsofservices`)}>
            Terms Of Services
          </TypographyLink>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Footer2;

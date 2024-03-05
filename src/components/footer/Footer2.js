import { Grid, Typography } from "@mui/material";
import React from "react";
import textStyle from "../../helpers/textStyle";
import TypographyLink from "../TypographyLink";
import { useRouter } from "next/navigation";

const Footer2 = (props) => {
  const navigate = useRouter()
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
          <TypographyLink style={textStyle} my={1} onClick={() => navigate.push('/orders')}>
            My Orders
          </TypographyLink>
          <TypographyLink style={textStyle} my={1} onClick={() => navigate.push('/cart')}>
            View Cart
          </TypographyLink>
          <TypographyLink style={textStyle} my={1} onClick={() => navigate.push('/about')}>
            About Us
          </TypographyLink>
          <TypographyLink style={textStyle} my={1} onClick={() => navigate.push('/contact')}>
            Contact Us
          </TypographyLink>
          <TypographyLink style={textStyle} my={1} onClick={() => navigate.push('/exchange')}>
            Return Request
          </TypographyLink>
          <TypographyLink style={textStyle} my={1} onClick={() => navigate.push('/collab')}>
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
            <TypographyLink key={idx} style={textStyle} my={1} onClick={() => navigate.push(`/category/${c._id}`)}>
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
          <TypographyLink style={textStyle} my={1} onClick={() => navigate.push(`/privacy`)}>
            Privacy Policy
          </TypographyLink>
          <TypographyLink style={textStyle} my={1} onClick={() => navigate.push(`/return`)}>
            Return Policy
          </TypographyLink>
          <TypographyLink style={textStyle} my={1} onClick={() => navigate.push(`/shipping`)}>
            Shipping Policy
          </TypographyLink>
          <TypographyLink style={textStyle} my={1} onClick={() => navigate.push(`/termsofservices`)}>
            Terms Of Services
          </TypographyLink>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Footer2;

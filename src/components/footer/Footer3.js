import { Grid } from "@mui/material";
import React from "react";
import Collapsable from "./Collapsable";

const Footer3 = (props) => {
  const list1 = [
    {
      name: "My Orders",
      url: '/orders'
    },
    {
      name: "View Cart",
      url: '/cart'
    },
    {
      name: "About Us",
      url: '/about'
    },
    {
      name: "Contact Us",
      url: '/contact'
    },
    {
      name: "Return Request",
      url: '/exchange'
    },
    {
      name: "Collaborate With Us",
      url: '/collab'
    },
  ];
  const list2 = props?.categories?.map((category, idx) => {
    return {
      name: category.title,
      url: `/category/${category._id}`
    }
  });
  const list3 = [
    {
      name: "Privacy Policy",
      url: 'privacy'
    },
    {
      name: "Return Policy",
      url: 'return'
    },
    {
      name: "Shipping Policy",
      url: 'shipping'
    },
    {
      name: "Terms Of Services",
      url: 'termsofservices'
    },
  ];
  return (
    <Grid item xs={12} md={5} mx={2}>
      <Collapsable title="Quick Links" list={list1} />
      <Collapsable title="Categories" list={list2} />
      <Collapsable title="Policies" list={list3} />
    </Grid>
  );
};

export default Footer3;

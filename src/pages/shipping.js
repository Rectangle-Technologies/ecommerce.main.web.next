import { Typography } from "@mui/material";
import React from "react";
import textStyle from "../helpers/textStyle";

const ShippingPolicy = () => {
  return (
    <div style={{ width: "90%", margin: "auto", marginTop: "20px" }}>
      <Typography style={{ ...textStyle, fontSize: 36, fontWeight: 700 }}>
        SHIPPING POLICY
      </Typography>
      <Typography style={textStyle} my={1}>
        We at Bloom By Khushbu, understand the importance of delivering your
        products in the finest condition and on time. Therefore, we have
        partnered with some of the most reputed courier partners in this country
        to seamlessly deliver your products in the best possible duration.
      </Typography>
      <Typography
        style={{ ...textStyle, fontSize: 25, fontWeight: 700 }}
        my={2}
      >
        DELIVERY
      </Typography>
      <Typography style={{ ...textStyle, fontWeight: 700 }} my={2}>
        A) How does the delivery process work?
      </Typography>
      <Typography style={textStyle} my={1}>
        <ul style={{ listStyleType: "disc" }}>
          <li>
            Once you have placed an order on our website, our system starts
            processing your order almost immediately.
          </li>
          <li>
            Next, your item is passed through a quality check before handing
            over to the courier partner.
          </li>
          <li>
            Your item is packed securely and handed over to our trusted delivery
            partners.
          </li>
          <li>Then, your item is shipped to your location.</li>
          <li>
            Kindly verify that your address falls on a location that is served
            by the delivery partner.
          </li>
          <li>
            If the shipment is returned to us by the delivery partner, we will
            contact you to get a new address to deliver the shipment. If the
            order amount is below ₹1000/-, extra shipping charges will be
            charged.
          </li>
        </ul>
      </Typography>
      <Typography style={{ ...textStyle, fontWeight: 700 }} my={2}>
        B) What is the estimated delivery time?
      </Typography>
      <Typography style={textStyle} my={1}>
        We religiously aim to ship the products within 3-5 working days, however
        with the current COVID situation few order shipments might take longer
        than usual. Since few of the products are made-to-order, in few cases
        there might be some delays due to dependencies at various levels.
        Furthermore, We diligently ship orders throughout the week except Sunday
        and Monday.
      </Typography>
      <Typography style={textStyle} my={1}>
        Please note-During festivals, adverse weather conditions or political
        crisis, your shipment may get further delayed due to dependency on
        courier companies. We ensure you that we will try our best to have
        product delivered to you in the best time and we truly appreciate your
        patience.
      </Typography>
      <Typography style={{ ...textStyle, fontWeight: 700 }} my={2}>
        C) Can I track my order?
      </Typography>
      <Typography style={textStyle} my={1}>
        Yes, you sure can! Once your order is shipped, you will receive an email
        from Bloom By Khushbu with the tracking ID of the respective courier
        partner. You can simply click TRACK ORDER and enter your order number or
        full AWB to check where your order has reached or how long will it take
        to get delivered.
      </Typography>
      <Typography
        style={{ ...textStyle, fontSize: 25, fontWeight: 700 }}
        my={2}
      >
        DOMESTIC SHIPPING
      </Typography>
      <Typography style={{ ...textStyle, fontWeight: 700 }} my={2}>
        A) Do you provide shipping all over the India?
      </Typography>
      <Typography style={textStyle} my={1}>
        Yes.
      </Typography>
      <Typography style={{ ...textStyle, fontWeight: 700 }} my={2}>
        B) Which locations do you ship your products?
      </Typography>
      <Typography style={textStyle} my={1}>
        Bloom By Khushbu ships throughout India so you can receive your order in
        any corner of the country within the confines of your home.
      </Typography>
      <Typography style={{ ...textStyle, fontWeight: 700 }} my={2}>
        C) What are the different shipping options you provide?
      </Typography>
      <Typography style={textStyle} my={1}>
        We provide standard shipping which you can choose from the checkout page
        while placing your order.
      </Typography>
      <Typography style={{ ...textStyle, fontWeight: 700 }} my={2}>
        D) Are there any shipping charges?
      </Typography>
      <Typography style={textStyle} my={1}>
        If the final order amount is below ₹695, there will be an additional
        shipping charges of ₹80.
      </Typography>
      <Typography style={{ ...textStyle, fontWeight: 700 }} my={2}>
        E) Do you provide Cash on Delivery method?
      </Typography>
      <Typography style={textStyle} my={1}>
        No, we do not provide Cash on Delivery method.
      </Typography>
      <Typography style={{ ...textStyle, fontWeight: 700 }} my={2}>
        F) How are orders packaged?
      </Typography>
      <Typography style={textStyle} my={1}>
        We go an extra mile to make sure you receive your order in top-notch
        condition. Each item is wrapped in sturdy packaging so that it stays
        free from any physical damage. So far, Bloom By Khushbu has received
        minimal complaints about damaged items due to packaging.
      </Typography>
      <Typography style={{ ...textStyle, fontWeight: 700 }} my={2}>
        G) Can I modify the shipping address of my order after it has been
        placed?
      </Typography>
      <Typography style={textStyle} my={1}>
        No. Incase, your product is already shipped and you wish to change the
        address, we will have to reship your order again to a different address
        which will charge you INR 150.
      </Typography>
    </div>
  );
};

export default ShippingPolicy;

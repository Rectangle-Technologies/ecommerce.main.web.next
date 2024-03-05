import { Box, Typography } from "@mui/material";
import React from "react";
import textStyle from "../helpers/textStyle";

const ReturnPolicy = () => {
  return (
    <div style={{ width: "90%", margin: "auto", marginTop: "20px" }}>
      <Typography style={{ ...textStyle, fontSize: 36, fontWeight: 700 }}>
        RETURN POLICY
      </Typography>
      <Typography style={textStyle} my={1}>
        Bloombykhushbu.co.in follows a friendly policy to ensure your purchases
        are free of stress. We are always with you, before and after your
        purchase. As an additional measure, please read through the following
        terms & conditions prior to making a purchase.
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
        If it&apos;s a damaged/defective product, incorrect item sent, such
        cases are to be informed us within 24 hours of delivery. We will replace
        the product with the next fastest possible courier facility. However,
        when a product is shipped from our warehouse it goes under 3 layers of
        quality check and we record the process for your reference as well.
        Still, if there is an issue with the product we would resolve it for
        you. Only products which are unused, unworn, unwashed, undamaged, with
        all its labels and tags completely intact, in original packaging and
        eligible for exchange. 360<span>&deg;</span> Opening Video of the parcel
        for the first time is mandatory in both the scenerios otherwise we will
        not be able to proceed with the exchange.
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
        You can cancel your Cash on Delivery order within 24 hours of order.
        Please call us on 8983355550 or write to us at
        bloombykhushbu1984@gmail.com to request a cancellation.
      </Typography>
      <Typography
        style={{ ...textStyle, fontSize: 25, fontWeight: 700 }}
        my={2}
      >
        When my exchange is not accepted?
      </Typography>
      <Typography style={textStyle} my={1}>
        We endeavour to ensure that every transaction at our website is
        seamless. We take great care in delivering our products and adhere to
        the highest quality standards.
      </Typography>
      <Typography style={textStyle} my={1}>
        <ul style={{ listStyleType: "disc" }}>
          <li>
            Exchange/Return not accepted if Customer does not like the material
            or colour of the dress, we suggest that the customer should read the
            product description & have a look at all the pictures before
            ordering.
          </li>
          <li>
            Our products are made and handled by human hands involving various
            processes.There is bound to be variations in colour, finish and
            overall look. The colours you see on our website will depend on the
            accuracy of your monitor for which subtle variations must be
            acknowledged.
          </li>
          <li>
            10-12% Colour difference depends on the screen resolution of the
            device used by the client and camera lights, please don&apos;t
            expect an exchange or return for the same.
          </li>
          <li>
            We have made every effort to display the colours of our products
            that appear on Laglits.com as accurately as possible. However, as
            computer monitors, tablets and mobile devices vary, we cannot
            guarantee that your monitor&apos;s display of a colour will be
            completely accurate.
          </li>
          <li>
            Exchange/Return not accepted if the product is washed and worn.
          </li>
          <li>
            Purchase made from SALE section are not eligible for any kind of
            return or exchange. All the sale, discounted, brought with a coupon
            and gift voucher purchases are non returnable, non refundable & non
            exchangeable.
          </li>
        </ul>
      </Typography>
    </div>
  );
};

export default ReturnPolicy;

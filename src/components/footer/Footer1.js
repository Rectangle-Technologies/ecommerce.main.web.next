import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import textStyle from "../../helpers/textStyle";

const Footer1 = () => {
  const desc1 =
    "STORE TIMINGS:";
  const desc2 =
    "MON-SAT- 11 AM TO 7 PM (IST)";
  const contact = "+91 - 8983355550 / 9975663656";
  const email = "bloombykhushbu1984@gmail.com";
  const address =
    "F-21, Sacred World Mall, Wanewadi, Jagtap Chock, Pune - 411040";
  return (
    <Grid item xs={12} md={3.5} my={1} px={2} mr={2}>
      <Typography style={{ ...textStyle, textAlign: 'justify', fontWeight: 600 }} my={1}>
        {desc1}
      </Typography>
      <Typography style={{ ...textStyle, textAlign: 'justify' }} my={1}>
        {desc2}
      </Typography>
      <Typography style={{ ...textStyle, fontFamily: "Roboto" }} mt={3} mb={1}>
        <Typography fontWeight="600" display="inline" color="#330C3E">
          Call us at:{" "}
        </Typography>{" "}
        {contact}
      </Typography>
      <Typography style={{ ...textStyle, fontFamily: "Roboto" }} my={1}>
        <Typography fontWeight="600" display="inline" color="#330C3E">
          Email:{" "}
        </Typography>{" "}
        {email}
      </Typography>
      <Typography style={{ ...textStyle, fontFamily: "Roboto", textAlign: 'justify' }} my={1}>
        <Typography fontWeight="600" display="inline" color="#330C3E">
          Address:{" "}
        </Typography>{" "}
        {address}
      </Typography>
    </Grid>
  );
};

export default Footer1;

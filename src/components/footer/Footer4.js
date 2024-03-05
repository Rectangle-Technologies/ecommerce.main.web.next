import {
  Box,
  Grid,
  Typography,
  IconButton,
  TextField,
  Button,
  Link,
} from "@mui/material";
import React from "react";
import textStyle from "../../helpers/textStyle";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { styled } from "@mui/material/styles";
import { connect } from "react-redux";
import { addLoader, removeLoader } from "../../redux/services/actions/loaderActions";
import axios from "axios";
import { BASE_URL_1 } from "../../constants/urls";
import { useState } from "react";
import { useSnackbar } from "notistack";

const Footer4 = (props) => {
  const [email, setEmail] = useState('')
  const { enqueueSnackbar } = useSnackbar()
  const CustomButton = styled(Button)({
    textTransform: "none",
    backgroundColor: "#eb31e2",
    "&:hover": {
      backgroundColor: "#fc03cf",
    },
  });

  const handleSubscribe = async () => {
    props.addLoader()
    try {
      const res = await axios.post(`${BASE_URL_1}/subscriber/add`, { email })
      enqueueSnackbar(res.data.message, {
        variant: 'success',
        autoHideDuration: 3000
      })
      setEmail('')
      props.removeLoader()
    } catch (err) {
      console.log(err)
      props.removeLoader()
      let message = 'Something went wrong'
      if (err?.response?.data?.errors) {
        message = err?.response?.data?.errors[0].msg
      } else if (err?.response?.data?.message) {
        message = err?.response?.data?.message
      }
      enqueueSnackbar(message, {
        variant: 'error',
        autoHideDuration: 3000
      })
    }
  }

  return (
    <Grid item xs={12} md={2.5} my={1} px={2}>
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
        Follow us on:
      </Typography>
      <Box style={{ display: "flex", flexDirection: "row" }}>
        <Link href='https://www.facebook.com/Bloom-boutique-805278062837758/' rel="noopener" target="_blank">
          <IconButton color="primary">
            <FacebookIcon />
          </IconButton>
        </Link>
        <Link href='https://www.instagram.com/bloom_by_khushbu/' rel="noopener" target="_blank">
          <IconButton color="secondary">
            <InstagramIcon />
          </IconButton>
        </Link>
        <Link href='https://www.youtube.com/channel/UCU4Pe-yOh1BrfeZGYhX062Q' rel="noopener" target="_blank">
          <IconButton color="error">
            <YouTubeIcon />
          </IconButton>
        </Link>
      </Box>
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
        Stay Connected:
      </Typography>
      <Typography style={{ ...textStyle, textAlign: 'justify' }} my={1}>
        Be the first to know about promotions and what's new at Bloom By
        Khushboo.
      </Typography>
      <TextField
        id="email"
        label="Email"
        placeholder="Enter your email"
        size="small"
        sx={{ my: 1, mr: 1 }}
        onChange={(e) => setEmail(e.target.value)}
        name='email'
        value={email}
      />
      <CustomButton variant="contained" sx={{ my: 1 }} onClick={handleSubscribe}>
        Subscribe
      </CustomButton>
    </Grid>
  );
};

export default connect(null, { addLoader, removeLoader })(Footer4);

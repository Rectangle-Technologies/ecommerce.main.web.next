import React, { useEffect, useState } from "react";
import { BrowserView, MobileOnlyView, TabletView } from "react-device-detect";
import { useSnackbar } from "notistack";
import { connect } from "react-redux";
import {
  addLoader,
  removeLoader,
} from "../redux/services/actions/loaderActions";
import axios from "axios";
import CartDesktop from "../components/cart/desktop/CartDesktop";
import CartMobile from "../components/cart/mobile/CartMobile";
import { BASE_URL_1 } from "../constants/urls";
import Desktop from "../components/responsive/Desktop";
import Tablet from "../components/responsive/Tablet";
import Mobile from "../components/responsive/Mobile";
import { useRouter } from "next/navigation";

const Cart = (props) => {
  const [instructions, setInstructions] = useState();
  const [voucher, setVoucher] = useState();
  const [cart, setCart] = useState();
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useRouter();
  const config = {
    headers: {
      Authorization: `Bearer ${props.auth.token}`,
    },
  };

  const fetchCart = async () => {
    props.addLoader();
    try {
      const res = await axios.get(`${BASE_URL_1}/cart/get`, config);
      setCart(res.data.cart);
      setTotal(res.data.cart.total);
      setFinalAmount(res.data.cart.total);
      if (res.data.cart.total > 0 && res.data.cart.total <= 695) {
        setShipping(80);
      }
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
    if (!props?.auth?.isAuthenticated) {
      navigate.push("/login", {
        state: { navigateUrl: `/cart` },
      });
      return;
    }
    fetchCart();
  }, []);

  return (
    <>
      <Desktop>
        {cart && (
          <CartDesktop
            cart={cart}
            instructions={instructions}
            setInstructions={setInstructions}
            voucher={voucher}
            setVoucher={setVoucher}
            total={total}
            discount={discount}
            setDiscount={setDiscount}
            finalAmount={finalAmount}
            setCart={setCart}
            setTotal={setTotal}
            setFinalAmount={setFinalAmount}
            shipping={shipping}
            setShipping={setShipping}
          />
        )}
      </Desktop>
      <Mobile>
        {cart && (
          <CartMobile
            cart={cart}
            instructions={instructions}
            setInstructions={setInstructions}
            voucher={voucher}
            setVoucher={setVoucher}
            total={total}
            discount={discount}
            setDiscount={setDiscount}
            finalAmount={finalAmount}
            setCart={setCart}
            setTotal={setTotal}
            setFinalAmount={setFinalAmount}
            shipping={shipping}
            setShipping={setShipping}
          />
        )}
      </Mobile>
      <Tablet>
        {cart && (
          <CartDesktop
            cart={cart}
            instructions={instructions}
            setInstructions={setInstructions}
            voucher={voucher}
            setVoucher={setVoucher}
            total={total}
            discount={discount}
            setDiscount={setDiscount}
            finalAmount={finalAmount}
            setCart={setCart}
            setTotal={setTotal}
            setFinalAmount={setFinalAmount}
            shipping={shipping}
            setShipping={setShipping}
          />
        )}
      </Tablet>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLoader, removeLoader })(Cart);

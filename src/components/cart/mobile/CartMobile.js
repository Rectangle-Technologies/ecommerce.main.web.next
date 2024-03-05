import { Button, Link, TextField, Typography } from '@mui/material'
import React from 'react'
import textStyle from '../../../helpers/textStyle'
import ProductsMobile from './ProductsMobile'
import { useNavigate } from 'react-router-dom';
import { styled } from "@mui/material/styles";
import { useSnackbar } from 'notistack';
import { connect } from 'react-redux'
import { addLoader, removeLoader } from '../../../redux/services/actions/loaderActions';
import axios from 'axios';
import { BASE_URL_1 } from '../../../constants/urls';

const CartMobile = (props) => {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    const config = {
        headers: {
            Authorization: `Bearer ${props.auth.token}`
        }
    }
    const CustomButton = styled(Button)({
        textTransform: "none",
        backgroundColor: "#eb31e2",
        "&:hover": {
            backgroundColor: "#fc03cf",
        },
    });

    const handleProceedToCheckout = () => {
        if (props.cart.products.length <= 0) {
            enqueueSnackbar('Cart is empty', {
                variant: 'error',
                autoHideDuration: 3000
            })
            return
        }
        navigate('/checkout', {
            state: {
                cart: props.cart,
                instructions: props.instructions,
                total: props.total,
                discount: props.discount,
                finalAmount: props.finalAmount,
                voucherName: props.voucher
            }
        })
    }

    const calculateDiscount = async () => {
        props.addLoader()
        try {
            const res = await axios.post(`${BASE_URL_1}/voucher/calculate`, {
                name: props.voucher, orderAmount: props.total
            }, config)
            props.setDiscount(res.data.discount)
            props.setFinalAmount(props.total - res.data.discount)
            if (props.total - res.data.discount) {
                props.setShipping(80)
            }
            props.removeLoader()
            enqueueSnackbar('Discount applied', {
                variant: 'success',
                autoHideDuration: 3000
            })
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
        <div style={{ margin: 20 }}>
            <Typography style={{ ...textStyle, fontWeight: 700, fontSize: 24, textAlign: 'center' }} my={2}>YOUR CART</Typography>
            <div style={{ marginTop: 20, border: '1px solid #928C8C', width: '100%', margin: 'auto' }}>
                {props.cart.products.length
                    ? props.cart.products.map((p, key) => (
                        <ProductsMobile
                            key={key}
                            product={p}
                            setCart={props.setCart}
                            setTotal={props.setTotal}
                            setFinalAmount={props.setFinalAmount}
                            discount={props.discount}
                            setShipping={props.setShipping}
                        />
                    ))
                    : <Typography style={{ ...textStyle, fontWeight: 600, fontSize: 20, textAlign: 'center' }} my={2}>Your cart is empty</Typography>}
            </div>
            <div style={{ marginTop: 10, width: '100%', margin: 'auto' }}>
                <Typography style={{ ...textStyle, fontWeight: 600, fontSize: 20 }} my={2}>ORDER SUMMARY</Typography>
                <div style={{ backgroundColor: '#E6E6E6', padding: 15 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography style={{ ...textStyle, fontWeight: 500 }}>SUB TOTAL</Typography>
                        <Typography style={{ ...textStyle, fontWeight: 500 }}>Rs. {props.total}</Typography>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 15 }}>
                        <Typography style={{ ...textStyle, fontWeight: 500 }}>DISCOUNT (if any)</Typography>
                        <Typography style={{ ...textStyle, fontWeight: 500 }}>-Rs. {props.discount}</Typography>
                    </div>
                    <hr style={{ backgroundColor: '#000000' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 15 }}>
                        <Typography style={{ ...textStyle, fontWeight: 500 }}>TOTAL AMOUNT</Typography>
                        <Typography style={{ ...textStyle, fontWeight: 500 }}>Rs. {props.finalAmount}</Typography>
                    </div>
                </div>
                <Typography style={{ ...textStyle, fontWeight: 600 }} my={2}>Additional Instructions</Typography>
                <TextField
                    variant='outlined'
                    fullWidth
                    placeholder='Instructions for the seller'
                    multiline
                    rows={4}
                    label='Instructions'
                    value={props.instructions}
                    onChange={(e) => props.setInstructions(e.target.value)}
                />
                <Typography style={{ ...textStyle, fontWeight: 600, fontSize: 20 }} my={2}>Apply Voucher</Typography>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <TextField
                        variant='outlined'
                        placeholder='Voucher Code'
                        multiline
                        label='Voucher'
                        value={props.voucher}
                        onChange={(e) => props.setVoucher(e.target.value)}
                        fullWidth
                    />
                    <CustomButton variant="contained" size='small' sx={{ ml: 2 }} onClick={calculateDiscount}>
                        Apply
                    </CustomButton>
                </div>
                <center>
                    <Link
                        style={{ cursor: 'pointer' }}
                        onClick={handleProceedToCheckout}>
                        <div style={{ backgroundColor: '#FA861B', border: '1px solid #330C3E', width: '80%', padding: 10, marginTop: 15 }}>
                            <Typography style={{ ...textStyle, fontWeight: 500, color: '#F8F5CC', textAlign: 'center' }}>Proceed to Checkout</Typography>
                        </div>
                    </Link>
                    <Link style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                        <div style={{ backgroundColor: '#F8F5CC', border: '1px solid #330C3E', width: '80%', padding: 10, marginTop: 15 }}>
                            <Typography style={{ ...textStyle, fontWeight: 500, color: '#330C3E', textAlign: 'center' }}>Continue Shopping</Typography>
                        </div>
                    </Link>
                </center>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { addLoader, removeLoader })(CartMobile)

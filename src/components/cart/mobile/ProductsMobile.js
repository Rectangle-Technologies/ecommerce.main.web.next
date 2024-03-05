import { Button, Grid, Link, Typography } from '@mui/material'
import React, { useState } from 'react'
import textStyle from '../../../helpers/textStyle'
import { useSnackbar } from 'notistack'
import { connect } from 'react-redux'
import { addLoader, removeLoader } from '../../../redux/services/actions/loaderActions'
import { updateCart } from '../../../redux/services/actions/cartActions'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import formatAmount from '../../../helpers/formatAmount'
import { BASE_URL_1 } from '../../../constants/urls'

const ProductsMobile = (props) => {
    const [quantity, setQuantity] = useState(props.product.quantity || 1)
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()
    const config = {
        headers: {
            Authorization: `Bearer ${props.auth.token}`
        }
    }

    const updateQuantity = async (action) => {
        props.addLoader()
        try {
            if (action == '+') {
                const res = await axios.post(`${BASE_URL_1}/cart/add`, {
                    productId: props.product.productId._id,
                    size: props.product.size,
                    quantity: 1
                }, config)
                props.setCart(res.data.cart)
                props.setTotal(res.data.cart.total)
                props.setFinalAmount(res.data.cart.total - props.discount)
                if (res.data.cart.total - props.discount <= 695) {
                    props.setShipping(80)
                }
                if (res.data.cart.total - props.discount === 0) {
                    props.setShipping(0)
                }
                props?.updateCart(res.data.cartTotal)
                setQuantity(quantity + 1)
                props.removeLoader()
            } else if (action == '-') {
                const res = await axios.post(`${BASE_URL_1}/cart/delete/${props?.product?.productId._id}`, {
                    size: props?.product?.size
                }, config)
                props.setCart(res.data.cart)
                props.setTotal(res.data.cart.total)
                props.setFinalAmount(res.data.cart.total - props.discount)
                if (res.data.cart.total - props.discount <= 695) {
                    props.setShipping(80)
                }
                if (res.data.cart.total - props.discount === 0) {
                    props.setShipping(0)
                }
                if (quantity > 1) {
                    setQuantity(quantity - 1)
                }
                props?.updateCart(res.data.cartTotal)
                props.removeLoader()
            }
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
        <Grid container my={2}>
            <Grid item xs={5} mx={1}>
                <Link style={{ cursor: 'pointer' }} onClick={() => navigate(`/product/${props?.product?.productId._id}`)}>
                    <img src={props?.product?.productId?.imageUrls[0]}
                        style={{ width: '100%', aspectRatio: 0.65 }}
                    />
                </Link>
            </Grid>
            <Grid item xs={6}>
                <Link style={{ cursor: 'pointer' }} onClick={() => navigate(`/product/${props.product.productId._id}`)}>
                    <Typography style={{ ...textStyle, fontWeight: 500, textAlign: 'left' }} mx={1}>{props?.product?.productId?.name}</Typography>
                </Link>
                <Typography style={{ ...textStyle, fontWeight: 500 }} m={1}>{formatAmount(props?.product?.productId?.price)}</Typography>
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: 10 }}>
                    <Link style={{ cursor: 'pointer' }} onClick={() => updateQuantity('-')}>
                        <div
                            style={{
                                border: "1px solid #222222",
                                width: 25,
                                height: 25,
                                fontSize: 14
                            }}
                        >
                            <Typography
                                style={{
                                    ...textStyle,
                                    fontFamily: "Roboto",
                                    textAlign: "center",
                                }}
                            >
                                -
                            </Typography>
                        </div>
                    </Link>
                    <div
                        style={{
                            border: "1px solid #222222",
                            width: 25,
                            height: 25,
                            fontSize: 14
                        }}
                    >
                        <Typography
                            style={{
                                ...textStyle,
                                fontFamily: "Roboto",
                                textAlign: "center",
                            }}
                        >
                            {quantity}
                        </Typography>
                    </div>
                    <Link style={{ cursor: 'pointer' }} onClick={() => updateQuantity('+')}>
                        <div
                            style={{
                                border: "1px solid #222222",
                                width: 25,
                                height: 25,
                                fontSize: 14
                            }}
                        >
                            <Typography
                                style={{
                                    ...textStyle,
                                    fontFamily: "Roboto",
                                    textAlign: "center",
                                }}
                            >
                                +
                            </Typography>
                        </div>
                    </Link>
                </div>
                <Typography style={{ ...textStyle, fontWeight: 500 }} m={1}>Size: {props?.product?.size}</Typography>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { addLoader, removeLoader, updateCart })(ProductsMobile)

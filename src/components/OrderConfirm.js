import { Box, Grid, Link, Modal, Typography } from '@mui/material'
import React from 'react'
import formatAmount from '../helpers/formatAmount';
import textStyle from '../helpers/textStyle';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const OrderConfirm = (props) => {
    const handleClose = () => props.setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        height: '90%',
        maxWidth: 500,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        overflowY: 'scroll'
    };

    return (
        <div>
            <Modal
                open={props.open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography style={{ ...textStyle, fontWeight: 600, fontSize: 20, color: '#330C3E' }}>Order Summary</Typography>
                    {props.cart.products.map((p, key) => (
                        <Grid key={key} container mt={3}>
                            <Grid item xs={5} md={3} mx={2}>
                                <img
                                    src={p.productId.imageUrls[0]}
                                    style={{ width: '100%', aspectRatio: 0.7 }}
                                />
                            </Grid>
                            <Grid item xs={5} md={7}>
                                <Typography style={{ ...textStyle, fontWeight: 500 }}>{p.productId.name}</Typography>
                                <Typography style={{ ...textStyle, fontWeight: 500 }} my={1}>{formatAmount(p.productId.price)}</Typography>
                                <Typography style={{ ...textStyle, fontWeight: 500 }} my={1}>Size: {p.size}</Typography>
                                <Typography style={{ ...textStyle, fontWeight: 500 }} my={1}>Qty: {p.quantity}</Typography>
                            </Grid>
                        </Grid>
                    ))}
                    <div style={{ padding: 15, marginTop: 20 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography style={{ ...textStyle, fontWeight: 500 }}>SUB TOTAL</Typography>
                            <Typography style={{ ...textStyle, fontWeight: 500 }}>{formatAmount(props.total)}</Typography>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 15 }}>
                            <Typography style={{ ...textStyle, fontWeight: 500 }}>DISCOUNT (if any)</Typography>
                            <Typography style={{ ...textStyle, fontWeight: 500 }}>-{formatAmount(props.discount)}</Typography>
                        </div>
                        <hr style={{ backgroundColor: '#000000' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 15 }}>
                            <Typography style={{ ...textStyle, fontWeight: 500 }}>TOTAL AMOUNT</Typography>
                            <Typography style={{ ...textStyle, fontWeight: 500 }}>{formatAmount(props.finalAmount)}</Typography>
                        </div>
                    </div>
                    <Typography style={{ ...textStyle, fontWeight: 600, fontSize: 20, color: '#330C3E' }} mb={2}>Shipping Details</Typography>
                    <Typography style={{ ...textStyle, fontWeight: 500 }} mb={1}><span style={{ fontWeight: 600 }}>Name: </span>{props.user.name}</Typography>
                    <Typography style={{ ...textStyle, fontWeight: 500 }} mb={1}><span style={{ fontWeight: 600 }}>Contact: </span>{props.user.contact}</Typography>
                    <Typography style={{ ...textStyle, fontWeight: 500 }} mb={1}><span style={{ fontWeight: 600 }}>Address: </span>{props?.user?.line1 + ', ' + props?.user?.city + ', ' + props?.user?.state + ' - ' + props?.user?.pincode}</Typography>
                    <Grid container my={2}>
                        <Grid item xs={12} md={6} my={2}>
                            <Link
                                style={{ display: 'flex', cursor: 'pointer' }}
                                onClick={() => props.setOpen(false)}
                            >
                                <KeyboardArrowLeftIcon />
                                <Typography style={{ ...textStyle, fontSize: 18 }} mx={1}>Cancel</Typography>
                            </Link>
                        </Grid>
                        <Grid item xs={12} md={6} my={2}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Link style={{ cursor: 'pointer' }} onClick={props.handleSubmit}>
                                    <div style={{ backgroundColor: '#FA861B', padding: '10px 30px', borderRadius: 30 }}>
                                        <Typography style={{ ...textStyle, fontWeight: 500, fontSize: 14, color: '#F8F5CC', textAlign: 'center' }}>
                                            Proceed
                                        </Typography>
                                    </div>
                                </Link>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div >
    )
}

export default OrderConfirm

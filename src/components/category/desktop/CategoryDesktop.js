import { Button, Grid, Link, Pagination, Typography } from '@mui/material'
import React, { useState } from 'react'
import SortIcon from '@mui/icons-material/Sort';
import textStyle from '../../../helpers/textStyle';
import PriceMenu from './PriceMenu';
import SizeMenu from './SizeMenu';
import { styled } from "@mui/material/styles";
import ProductLayout from '../../ProductLayout';
import { addLoader, removeLoader } from '../../../redux/services/actions/loaderActions';
import { connect } from 'react-redux';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { BASE_URL_2 } from '../../../constants/urls';
import { useNavigate } from 'react-router-dom';

const CategoryDesktop = (props) => {
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()
    const CustomButton = styled(Button)({
        textTransform: "none",
        backgroundColor: "#eb31e2",
        "&:hover": {
            backgroundColor: "#fc03cf",
        },
    });

    const handleFilter = async () => {
        props.addLoader()
        try {
            const res = await axios.post(`${BASE_URL_2}/products/fetchByFilter?page=${props?.page}&limit=${props?.limit}`, {
                categoryId: props?.category?._id,
                priceRange: { min: props?.priceRange[0], max: props?.priceRange[1] },
                sizes: props?.sizes
            })
            props.setProducts(res.data.products)
            props?.setMaxPages(Math.ceil(res.data.count / props?.limit))
            props.removeLoader()
        } catch (err) {
            props.removeLoader()
            console.log(err)
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

    const handlePageChange = (event, value) => {
        props?.setPage(value)
    }

    return (
        <div style={{ margin: 'auto', width: '80%' }}>
            <div>
                <Typography mt={4} style={{
                    ...textStyle,
                    fontFamily: 'Playfair Display',
                    fontStyle: 'SemiBold',
                    letterSpacing: '0.3rem',
                    textAlign: 'center',
                    fontWeight: 500,
                    fontSize: window.innerWidth > 500 ? '40px' : '25px',
                    lineHeight: '53px',
                }}>
                    {props?.category?.title?.toUpperCase()}
                </Typography>
                <div style={{ borderTop: '2px solid black', width: window.innerWidth > 500 ? '130px' : '80px', margin: 'auto', marginTop: 2, marginBottom: 50 }}></div>
            </div>
            <hr style={{ backgroundColor: '#000000' }} />
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <SortIcon fontSize='small' />
                <Typography style={{ ...textStyle, fontWeight: 500, fontSize: 20, fontStyle: 'medium' }} ml={1}>Refined By:</Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', margin: 15 }}>
                <PriceMenu value={props?.priceRange} setValue={props?.setPriceRange} />
                <SizeMenu sizes={props?.sizes} setSizes={props?.setSizes} />
                <CustomButton variant='contained' sx={{ mx: 1 }} onClick={handleFilter}>Apply</CustomButton>
            </div>
            <div style={{ margin: window.innerWidth > 500 ? 20 : 0 }}>
                <Grid container spacing={window.innerWidth > 500 ? 3 : 1.5} style={{ padding: "0px 5vw 0px 5vw" }}>
                    {props?.products?.map((p, idx) => (
                        <Grid key={idx} item xs={6} md={3}>
                            <Link style={{ cursor: 'pointer' }} onClick={() => navigate(`/product/${p?._id}`)}>
                                <ProductLayout
                                    liked={true}
                                    new={true}
                                    title={p?.name}
                                    mrp={p?.price}
                                    imageUrl={p?.imageUrls[0]}
                                />
                            </Link>
                        </Grid>
                    ))}
                </Grid>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '15px 0px' }}>
                    <Pagination count={props?.maxPages} page={props?.page} onChange={handlePageChange} />
                </div>
            </div>
        </div>
    )
}

export default connect(null, { addLoader, removeLoader })(CategoryDesktop)

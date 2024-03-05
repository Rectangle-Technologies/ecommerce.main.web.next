import { Button, Grid, Pagination, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import SortIcon from '@mui/icons-material/Sort';
import textStyle from '../../../helpers/textStyle';
import PriceMenu from '../../category/desktop/PriceMenu';
import SizeMenu from '../../category/desktop/SizeMenu';
import { styled } from "@mui/material/styles";
import ProductLayout from '../../ProductLayout';
import { addLoader, removeLoader } from '../../../redux/services/actions/loaderActions';
import { connect } from 'react-redux';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { BASE_URL_2 } from '../../../constants/urls';

const SearchDesktop = (props) => {
    const { enqueueSnackbar } = useSnackbar()
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
                priceRange: { min: props?.priceRange[0], max: props?.priceRange[1] },
                sizes: props?.sizes,
                name: props.name
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
    const handleSubmit = async () => {
        props.addLoader()
        try {
            const res = await axios.post(`${BASE_URL_2}/products/fetchByFilter?page=${props?.page}&limit=${props?.limit}`, {
                priceRange: { min: props?.priceRange[0], max: props?.priceRange[1] },
                sizes: props?.sizes,
                name: props?.name
            })
            props?.setProducts(res.data.products)
            props?.setMaxPages(Math.ceil(res.data.count / props?.limit))
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
    const handlePageChange = (event, value) => {
        props?.setPage(value)
    }

    return (
        <div style={{ margin: 'auto', width: '80%' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '20px' }}>
                <div style={{ margin: '0px 10px' }}>
                    <TextField
                        label='Search'
                        variant='outlined'
                        id='search'
                        name='search'
                        placeholder='Search'
                        value={props?.name}
                        onChange={e => props?.setName(e.target.value)}
                    />
                </div>
                <CustomButton variant='contained' onClick={handleSubmit}>Go</CustomButton>
            </div>
            {props?.products
                ?
                props?.products?.length > 0
                    ?
                    <>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: 20 }}>
                            <SortIcon fontSize='small' />
                            <Typography style={{ ...textStyle, fontWeight: 500, fontSize: 20, fontStyle: 'medium' }} ml={1}>Refined By:</Typography>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', margin: 15 }}>
                            <PriceMenu value={props?.priceRange} setValue={props?.setPriceRange} />
                            <SizeMenu sizes={props?.sizes} setSizes={props?.setSizes} />
                            <CustomButton variant='contained' sx={{ mx: 1 }} onClick={handleFilter}>Apply</CustomButton>
                        </div>
                        <div style={{ margin: 20 }}>
                            <Grid container spacing={6} style={{ padding: "0px 5vw 0px 5vw" }}>
                                {props?.products?.map((p, idx) => (
                                    <Grid key={idx} item xs={6} lg={3}>
                                        <ProductLayout
                                            liked={true}
                                            new={true}
                                            title={p?.name}
                                            mrp={p?.price}
                                            imageUrl={p?.imageUrls[0]}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                            <div style={{ display: 'flex', justifyContent: 'center', margin: '15px 0px' }}>
                                <Pagination count={props?.maxPages} page={props?.page} onChange={handlePageChange} />
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <Typography style={{ ...textStyle, textAlign: 'center', fontSize: '20px', margin: '15px 0px' }}>No products matches your search!</Typography>
                    </>
                :
                <>
                    <Typography style={{ ...textStyle, textAlign: 'center', fontSize: '20px', margin: '15px 0px' }}>Type to search products!</Typography>
                </>
            }

        </div>
    )
}

export default connect(null, { addLoader, removeLoader })(SearchDesktop)

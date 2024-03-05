import { Box, Container, Grid, Link, Typography } from '@mui/material'
import React from 'react'
import Footer1 from './Footer1'
import Footer2 from './Footer2'
import Footer4 from './Footer4'
import textStyle from '../../helpers/textStyle'

const FooterDesktop = (props) => {
    return (
        <Box style={{ backgroundColor: "#e5e5e5" }} width="100%">
            <Container maxWidth="lg" sx={{ p: 4 }}>
                <Grid container>
                    <Grid item xs={12} md={3} my={1}>
                        <img
                            src="/logo.png"
                            style={{ width: '70%' }}
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Footer1 />
                    <Footer2 categories={props?.categories} />
                    <Footer4 />
                </Grid>
                <Grid container>
                    <Grid item xs={12} md={3}>
                        <center>
                            <img
                                src="/payment.png"
                                alt="Payment Icons"
                                style={{ width: '100%', maxWidth: '300px' }}
                            />
                        </center>
                    </Grid>
                    <Grid item xs={12} md={9} my={2} style={{ textAlign: 'right' }}>
                        <Typography my={1} style={textStyle}>Developed by <Link style={{ ...textStyle, textDecoration: 'underline', cursor: 'pointer' }} href='https://rectangletechnologies.com/' target='_blank'>Rectangle Technologies</Link></Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default FooterDesktop

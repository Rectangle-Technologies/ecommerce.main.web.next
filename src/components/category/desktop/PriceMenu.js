import { Box, Link, Menu, MenuItem, Slider, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import formatAmount from '../../../helpers/formatAmount';
import textStyle from '../../../helpers/textStyle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function valuetext(value) {
    return formatAmount(value);
}

const PriceMenu = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const marks = [
        {
            value: 0,
            label: formatAmount('0')
        },
        {
            value: 5000,
            label: formatAmount('5000')
        }
    ]

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleChange = (event, newValue) => {
        props.setValue(newValue);
    };
    return (
        <>
            <Link style={{ cursor: 'pointer', marginRight: 10 }} onClick={handleClick}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '15px 15px',
                        border: '1px solid black',
                        minWidth: 180,
                        borderRadius: 5
                    }}>
                    <Typography style={{ ...textStyle, fontWeight: 500 }}>Price</Typography>
                    <ArrowDropDownIcon />
                </div>
            </Link>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        padding: 20,
                        marginTop: 10
                    }
                }}
            >
                <MenuItem style={{ backgroundColor: 'white', cursor: 'default' }} disableRipple>
                    <Box sx={{ width: 300 }}>
                        <Slider
                            getAriaLabel={() => 'Price range'}
                            value={props.value}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                            min={0}
                            max={5000}
                            marks={marks}
                            color='secondary'
                        />
                    </Box>
                </MenuItem>
                <MenuItem style={{ backgroundColor: 'white', cursor: 'default' }} disableRipple>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, margin: 'auto' }}>
                        <div style={{ border: '1px solid black', padding: '0px 15px', margin: '0px 15px' }}>
                            <Typography style={{ ...textStyle, textAlign: 'center' }}>{props.value[0]}</Typography>
                        </div>
                        <Typography style={textStyle}>to</Typography>
                        <div style={{ border: '1px solid black', padding: '0px 15px', margin: '0px 15px' }}>
                            <Typography style={{ ...textStyle, textAlign: 'center' }}>{props.value[1]}</Typography>
                        </div>
                    </div>
                </MenuItem>
            </Menu>
        </>
    )
}

export default PriceMenu

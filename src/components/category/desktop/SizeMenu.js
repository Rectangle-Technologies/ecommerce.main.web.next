import { Box, Chip, FormControl, Grid, InputLabel, Link, Menu, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material'
import React from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react';
import textStyle from '../../../helpers/textStyle';
import { useTheme } from '@mui/material/styles';

const SizeMenu = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    // const sizes = [
    //     { title: '36' },
    //     { title: '38' },
    //     { title: '40' },
    //     { title: '42' },
    //     { title: '44' },
    //     { title: '46' },
    // ]
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleSelectSize = size => {
        const idx1 = props.sizes.findIndex(s => s === size.title)
        if (idx1 === -1) {
            const updatedSizes = props.sizes
            updatedSizes.push(size.title)
            props.setSizes(updatedSizes)
        }
    }
    const handleDeleteSize = size => {
        const updatedSizes = props.sizes.filter(s => s !== size)
        props.setSizes(updatedSizes)
    }

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const sizes = [
        '36',
        '38',
        '40',
        '42',
        '44',
        '46',
    ];
    function getStyles(name, personName, theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }
    const theme = useTheme();


    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        props.setSizes(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <>
            {/* <Link style={{ cursor: 'pointer', margin: '0px 10px' }} onClick={handleClick}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 15px',
                        border: '1px solid black',
                        minWidth: 180,
                        borderRadius: 10
                    }}>
                    <Typography style={{ ...textStyle, fontSize: 18, fontWeight: 500 }}>Size</Typography>
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
                    <div style={{ width: 200 }}>
                        <Grid container>
                            {sizes.map((s, idx) => (
                                <Grid key={idx} item xs={3} m={1}>
                                    <Link style={{ cursor: 'pointer', }} onClick={() => handleSelectSize(s)}>
                                        <div style={{
                                            border: '1px solid black',
                                            padding: '0px 10px',
                                            margin: 'auto'
                                        }}>
                                            <Typography style={{ ...textStyle, textAlign: 'center' }}>{s.title}</Typography>
                                        </div>
                                    </Link>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                </MenuItem>
                <MenuItem style={{ backgroundColor: 'white', cursor: 'default' }} disableRipple>
                    <div style={{ display: 'flex' }}>
                        {props.sizes.map((s, idx) => {
                            console.log(idx)
                            return <Link style={{ cursor: 'pointer' }} onClick={() => handleDeleteSize(s)}>
                                <div style={{
                                    border: '1px solid black',
                                    padding: '0px 10px',
                                    margin: 10
                                }}
                                    key={idx}>
                                    <Typography style={{ ...textStyle, textAlign: 'center' }}>{s} X</Typography>
                                </div>
                            </Link>
                        })}
                    </div>
                </MenuItem>
            </Menu> */}
            <FormControl sx={{ m: 1, width: 200 }}>
                <InputLabel id="demo-multiple-chip-label" sx={{ ...textStyle, fontWeight: 500 }}>Size</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={props.sizes}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Size" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                    inputProps={{
                        sx: {
                            border: '1px solid black',
                        },
                    }}
                >
                    {sizes.map((size) => (
                        <MenuItem
                            key={size}
                            value={size}
                            style={getStyles(size, props.sizes, theme)}
                        >
                            {size}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    )
}

export default SizeMenu

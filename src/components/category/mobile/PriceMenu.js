import { Box, Slider, Typography } from '@mui/material'
import React from 'react'
import formatAmount from '../../../helpers/formatAmount';
import textStyle from '../../../helpers/textStyle';

function valuetext(value) {
    return formatAmount(value);
}

const PriceMenu = (props) => {
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
    const handleChange = (event, newValue) => {
        props.setValue(newValue);
    };
    return (
        <Box sx={{ width: '90%' }}>
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: 'auto', width: '80%', marginBottom: 20 }}>
                <div style={{ border: '1px solid black', padding: '0px 5px', margin: '0px 5px' }}>
                    <Typography style={{ ...textStyle, textAlign: 'center' }}>{props.value[0]}</Typography>
                </div>
                <Typography style={textStyle}>to</Typography>
                <div style={{ border: '1px solid black', padding: '0px 5px', margin: '0px 5px' }}>
                    <Typography style={{ ...textStyle, textAlign: 'center' }}>{props.value[1]}</Typography>
                </div>
            </div>
        </Box>
    )
}

export default PriceMenu

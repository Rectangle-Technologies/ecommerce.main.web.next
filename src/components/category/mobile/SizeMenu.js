import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material/styles';

const SizeMenu = (props) => {
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        props.setSizes(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const sizes = [
        '36',
        '38',
        '40',
        '42',
        '44',
        '46',
    ];
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
    function getStyles(name, personName, theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }
    const theme = useTheme();
    return (
        <FormControl sx={{ mx: 1, width: '100%', my: 3 }}>
            <InputLabel id="demo-multiple-chip-label">Size</InputLabel>
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
    )
}

export default SizeMenu

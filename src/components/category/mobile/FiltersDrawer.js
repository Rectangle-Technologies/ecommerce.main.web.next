import { Link, Box, List, ListItem, Divider, Button, Drawer } from '@mui/material'
import React, { useState } from 'react'
import PriceMenu from './PriceMenu'
import SizeMenu from './SizeMenu'
import SortIcon from '@mui/icons-material/Sort';
import { styled } from "@mui/material/styles";

const FiltersDrawer = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const CustomButton = styled(Button)({
    textTransform: "none",
    backgroundColor: "#eb31e2",
    "&:hover": {
      backgroundColor: "#fc03cf",
    },
  });

  const toggleDrawer = () => {
    setIsOpen(!isOpen)
  }

  const list = () => (
    <Box
      sx={{ width: '65vw', margin: 2 }}
      role="presentation"
      onKeyDown={toggleDrawer}
    >
      <List>
        <ListItem>
          <PriceMenu value={props?.priceRange} setValue={props?.setPriceRange} />
        </ListItem>
        <Divider />
        <ListItem>
          <SizeMenu sizes={props?.sizes} setSizes={props?.setSizes} />
        </ListItem>
        <ListItem>
          <CustomButton variant='contained' onClick={() => props?.handleFilter(setIsOpen)}>Apply</CustomButton>
        </ListItem>
      </List>
    </Box >
  )
  return (
    <div>
      <Link style={{ cursor: 'pointer' }} onClick={toggleDrawer}>
        <SortIcon fontSize='small' />
      </Link>
      <Drawer
        anchor='left'
        open={isOpen}
        onClose={toggleDrawer}
      >
        {list()}
      </Drawer>
    </div>
  )
}

export default FiltersDrawer

import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Badge, Button, Menu, MenuItem, Typography } from "@mui/material";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { connect } from "react-redux";
import { logout } from "../../../redux/services/actions/authActions";
import { styled } from "@mui/material/styles";

const NavbarMobile = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [anchorElProfile, setAnchorElProfile] = useState(null);
    const openProfile = Boolean(anchorElProfile);
    const navigate = useNavigate()
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: 2,
            top: -20,
            backgroundColor: "#eb31e2"
        },
    }));

    const handleProfileClick = (event) => {
        setAnchorElProfile(event.currentTarget);
    };
    const handleProfileClose = () => {
        setAnchorElProfile(null);
    };

    const CustomButton = styled(Button)({
        textTransform: "none",
        backgroundColor: "#eb31e2",
        "&:hover": {
            backgroundColor: "#fc03cf",
        },
        fontSize: 16
    });

    return (
        <div style={{
            borderBottom: "1px solid black",
            height: "60px",
            padding: "10px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        }}>

            {/* toggle menu */}
            <div style={{ width: '20%' }}>
                <MenuIcon onClick={() => { setIsOpen(!isOpen) }} style={{ marginLeft: "10px" }} />
            </div>

            {/* logo section */}
            <Link to="/" style={{ textDecoration: "none", width: '30%' }} onClick={() => { setIsOpen(false) }}>
                <img src="/logo.png" style={{ maxHeight: "100%", width: '80%' }} />
            </Link>

            {/* important links */}
            {isOpen &&
                <>
                    <Typography onClick={() => { setIsOpen(false) }} style={{ fontSize: 24 }}><CloseIcon style={{ zIndex: 2147483647, border: "1px solid black", padding: "5px", borderRadius: "5px", marginRight: "15px", position: "absolute", backgroundColor: "white", top: 15, right: "20vw" }} fontSize="large" /></Typography>
                    <div style={{ zIndex: 2147483646, transition: "ease-in-out 1s", transitionDelay: "1s", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", backgroundColor: "white", position: "absolute", top: 0, left: 0, width: "80vw", height: "100vh" }} >
                        <Link to="/" style={{ textDecoration: "none" }} onClick={() => { setIsOpen(false) }}>
                            <Typography className="navbar_mobile_item navbar_mobile_item_selected" style={{ fontSize: 18 }}>New-in</Typography>
                        </Link>
                        {props?.categories?.map((category, idx) => {
                            const url = `/category/${category._id}`
                            return <Link key={idx} to={url} style={{ textDecoration: "none" }} onClick={() => { setIsOpen(false) }}>
                                <Typography className="navbar_mobile_item" style={{ fontSize: 18 }} >{category?.title}</Typography>
                            </Link>
                        })}
                        <Link to="/diaries" style={{ textDecoration: "none" }} onClick={() => { setIsOpen(false) }}>
                            <Typography className="navbar_mobile_item" style={{ fontSize: 18 }} >Client Diaries</Typography>
                        </Link>
                        <Link to="/about" style={{ textDecoration: "none" }} onClick={() => { setIsOpen(false) }}>
                            <Typography className="navbar_mobile_item" style={{ fontSize: 18 }} >About Us</Typography>
                        </Link>
                        <Link to="/contact" style={{ textDecoration: "none" }} onClick={() => { setIsOpen(false) }}>
                            <Typography className="navbar_mobile_item" style={{ fontSize: 18 }} >Contact us</Typography>
                        </Link>
                        {/* <div style={{ width: "100vw", borderBottom: "4px solid #EB31E2" }} ></div> */}
                        {/* <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <SearchIcon style={{ padding: "0px 7.5px 0px 7.5px", fontSize: 30 }} />
                            <Typography className="navbar_mobile_item" style={{ fontSize: 24 }} >
                                Search
                            </Typography>
                        </div>

                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <FavoriteBorderIcon style={{ padding: "0px 7.5px 0px 7.5px", fontSize: 30 }} />
                            <Typography className="navbar_mobile_item" style={{ fontSize: 24 }} >
                                Wishlist
                            </Typography>
                        </div>

                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <ShoppingCartOutlinedIcon style={{ padding: "0px 7.5px 0px 7.5px", fontSize: 30 }} />
                            <Typography className="navbar_mobile_item" style={{ fontSize: 24 }} >
                                Cart
                            </Typography>
                        </div>

                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <PersonOutlineOutlinedIcon style={{ padding: "0px 7.5px 0px 7.5px", fontSize: 30 }} />
                            <Typography className="navbar_mobile_item" style={{ fontSize: 24 }} >
                                Profile
                            </Typography>
                        </div> */}
                    </div></>}

            {/* important icons */}
            <div style={{ padding: "0px", width: '30%' }}>
                <SearchIcon style={{ padding: "0px 2px 0px 2px", fontSize: 25 }} onClick={(e) => {
                    navigate('/search')
                    setIsOpen(false)
                }} />
                <FavoriteBorderIcon style={{ padding: "0px 2px 0px 2px", fontSize: 25 }} onClick={() => {
                    navigate('/wishlist')
                    setIsOpen(false)
                }} />
                <StyledBadge badgeContent={props?.auth?.user?.cartTotal} color='primary'>
                    <ShoppingCartOutlinedIcon style={{ padding: "0px 2px 0px 2px", fontSize: 25, margin: '-20px 0px' }} onClick={() => {
                        navigate('/cart')
                        setIsOpen(false)
                    }} />
                </StyledBadge>
                <PersonOutlineOutlinedIcon style={{ padding: "0px 2px 0px 2px", fontSize: 25 }} onClick={(e) => {
                    handleProfileClick(e)
                    setIsOpen(false)
                }} />
                {props?.auth?.isAuthenticated
                    ?
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorElProfile}
                        open={openProfile}
                        onClose={handleProfileClose}
                    >
                        <MenuItem onClick={() => {
                            handleProfileClose()
                            navigate(`/editdetails`)
                        }}>
                            Profile
                        </MenuItem>
                        <MenuItem onClick={() => {
                            handleProfileClose()
                            navigate(`/orders`)
                        }}>
                            Orders
                        </MenuItem>
                        <MenuItem onClick={() => {
                            props.logout()
                            navigate(`/login`)
                        }}>
                            Logout
                        </MenuItem>
                    </Menu>
                    :
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorElProfile}
                        open={openProfile}
                        onClose={handleProfileClose}
                    >
                        <MenuItem onClick={() => {
                            handleProfileClose()
                            navigate(`/login`)
                        }}>
                            Login
                        </MenuItem>
                    </Menu>
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { logout })(NavbarMobile);
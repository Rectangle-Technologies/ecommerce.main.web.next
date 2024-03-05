import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Badge, Menu, MenuItem, Typography } from "@mui/material";
import "./navbar.css";
import { connect } from "react-redux";
import { logout } from "../../../redux/services/actions/authActions";
import { styled } from "@mui/material/styles";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const NavbarDesktop = (props) => {
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const openProfile = Boolean(anchorElProfile);
  const navigate = useRouter();
  const url = usePathname();
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: 10,
      top: -25,
      backgroundColor: "#eb31e2",
    },
  }));

  const handleProfileClick = (event) => {
    setAnchorElProfile(event.currentTarget);
  };
  const handleProfileClose = () => {
    setAnchorElProfile(null);
  };

  return (
    <div
      style={{
        borderBottom: "1px solid black",
        height: "80px",
        padding: "10px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* logo section */}
      <Link
        href="/"
        style={{ textDecoration: "none", width: "20%", marginLeft: 10 }}
      >
        <Image
          alt="Bloom Company's logo"
          src="/logo.png"
          style={{ width: "60%" }}
        />
      </Link>
      {/* important links */}
      <div style={{ display: "flex", flexDirection: "column", width: "45%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link href="/" style={{ textDecoration: "none" }}>
            <Typography
              className={
                url === "/" ? "navbar_item navbar_item_selected" : "navbar_item"
              }
              style={{ fontSize: 18 }}
            >
              New-in
            </Typography>
          </Link>
          {props?.categories?.map((category, index) => {
            return (
              <Link
                key={category._id}
                href={`/category/${category._id}`}
                style={{ textDecoration: "none" }}
              >
                <Typography
                  className={
                    url === `/category/${category._id}`
                      ? "navbar_item navbar_item_selected"
                      : "navbar_item"
                  }
                  style={{ fontSize: 18 }}
                >
                  {category.title}
                </Typography>
              </Link>
            );
          })}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "6px",
          }}
        >
          <Link href="/diaries" style={{ textDecoration: "none" }}>
            <Typography
              className={
                url === "/diaries"
                  ? "navbar_item navbar_item_selected"
                  : "navbar_item"
              }
              style={{ fontSize: 18 }}
            >
              Client Diaries
            </Typography>
          </Link>
          <Link href="/about" style={{ textDecoration: "none" }}>
            <Typography
              className={
                url === "/about"
                  ? "navbar_item navbar_item_selected"
                  : "navbar_item"
              }
              style={{ fontSize: 18 }}
            >
              About us
            </Typography>
          </Link>
          <Link href="/contact" style={{ textDecoration: "none" }}>
            <Typography
              className={
                url === "/contact"
                  ? "navbar_item navbar_item_selected"
                  : "navbar_item"
              }
              style={{ fontSize: 18 }}
            >
              Contact us
            </Typography>
          </Link>
        </div>
      </div>
      {/* important icons */}
      <div style={{ padding: "10px", width: "15%" }}>
        <Link
          href="/search"
          style={{ textDecoration: "none", cursor: "pointer", color: "black" }}
        >
          <SearchIcon
            style={{ padding: "0px 7.5px 0px 7.5px", fontSize: 40 }}
          />
        </Link>
        <Link
          href="/wishlist"
          style={{ textDecoration: "none", cursor: "pointer", color: "black" }}
        >
          <FavoriteBorderIcon
            style={{ padding: "0px 7.5px 0px 7.5px", fontSize: 40 }}
          />
        </Link>
        <Link
          href="/cart"
          style={{ textDecoration: "none", cursor: "pointer", color: "black" }}
        >
          <StyledBadge
            badgeContent={props?.auth?.user?.cartTotal}
            color="primary"
          >
            <ShoppingCartOutlinedIcon
              style={{
                padding: "0px 7.5px 0px 7.5px",
                fontSize: 40,
                margin: "-34px 0px",
              }}
            />
          </StyledBadge>
        </Link>
        <Link
          href="#"
          style={{ textDecoration: "none", cursor: "pointer", color: "black" }}
          onClick={handleProfileClick}
        >
          <PersonOutlineOutlinedIcon
            style={{ padding: "0px 7.5px 0px 7.5px", fontSize: 40 }}
          />
        </Link>
        {props?.auth?.isAuthenticated ? (
          <Menu
            id="basic-menu"
            anchorEl={anchorElProfile}
            open={openProfile}
            onClose={handleProfileClose}
          >
            <MenuItem
              onClick={() => {
                handleProfileClose();
                navigate.push(`/editdetails`);
              }}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleProfileClose();
                navigate.push(`/orders`);
              }}
            >
              Orders
            </MenuItem>
            <MenuItem
              onClick={() => {
                props.logout();
                navigate.push(`/login`);
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        ) : (
          <Menu
            id="basic-menu"
            anchorEl={anchorElProfile}
            open={openProfile}
            onClose={handleProfileClose}
          >
            <MenuItem
              onClick={() => {
                handleProfileClose();
                navigate.push(`/login`);
              }}
            >
              Login
            </MenuItem>
          </Menu>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { logout })(NavbarDesktop);

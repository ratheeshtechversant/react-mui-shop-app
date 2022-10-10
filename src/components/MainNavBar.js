import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
  Avatar,
  Tooltip,
  Snackbar,
  Alert,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import AppleIcon from "@mui/icons-material/Apple";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  SearchIconWrapper,
  Search,
  StyledInputBase,
} from "./product/SearchComponent";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { destroyUser } from "../features/user/userSlice";

const MainNavBar = () => {
  const cart_count = useSelector((state) => state.cart.cart.carts);
  const dispatch = useDispatch();

  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : "";
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();
  const settings = ["Profile", "Account", "Dashboard", signOut];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function signOut() {
    fetch("http://127.0.0.1:3000/users/sign_out", {
      method: "DELETE",
      headers: {
        Authorization: user.authorization,
      },
    })
      .then((response) => response.json())
      .then(
        !Cookies.remove("user")
          ? setOpen(true)
          : window.alert("sign-out faild"),
        dispatch(clearCart()),
        dispatch(destroyUser())
      );
    navigate("/");
  }

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }

  function LogIn() {
    navigate("/login");
  }

  const log_in = (
    <Button variant="text" color="secondary" onClick={LogIn}>
      Login
    </Button>
  );
  const sign_up = (
    <Button
      variant="text"
      color="secondary"
      onClick={() => navigate("/signup")}
    >
      Sign-up
    </Button>
  );
  const sign_up_fotm = (
    <Button
      variant="text"
      color="secondary"
      onClick={() => navigate("/signupform")}
    >
      Sign-up
    </Button>
  );
  const sign_out = (
    <Tooltip title="Logout" placement="bottom">
      <Button variant="text" color="secondary" onClick={signOut}>
        <LogoutIcon />
      </Button>
    </Tooltip>
  );
  const cart = (
    <Button
      variant="contained"
      color="secondary"
      endIcon={
        <Badge
          badgeContent={cart_count ? cart_count.length : 0}
          color="primary"
        >
          <ShoppingCartIcon />
        </Badge>
      }
      onClick={() => navigate("/mycart")}
    >
      Cart
    </Button>
  );

  const user_mail = (
    <>
      {" "}
      <Tooltip title={user.email} placement="bottom-start" leaveDelay={500}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar src={user.image_url} alt="user" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem disabled>
          <Button variant="text" color="secondary">
            {user.email}
          </Button>
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu}>
          <Button
            variant="text"
            color="secondary"
            onClick={() => navigate("/profile")}
          >
            Profile
          </Button>
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu}>
          <Button
            variant="text"
            color="secondary"
            onClick={() => navigate("/orderdetails")}
          >
            Orders
          </Button>
        </MenuItem>
        {/* <MenuItem onClick={handleCloseUserMenu}>{cart}</MenuItem> */}
        <MenuItem onClick={handleCloseUserMenu}>{sign_out}</MenuItem>
      </Menu>
    </>
  );

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#b1ed8c", minWidth: "1045px" }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="secondary"
            aria-label="logo"
            onClick={() => navigate("/")}
          >
            <AppleIcon />
          </IconButton>
          <Typography variant="h6" color="secondary" sx={{ flexGrow: 1 }}>
            FRESH-MART
          </Typography>
          <Stack direction="row" spacing={2}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon color="secondary" />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>

            <Button
              variant="text"
              color="secondary"
              onClick={() => navigate("/")}
            >
              Home
            </Button>
            <Button
              variant="text"
              color="secondary"
              onClick={() => navigate("/products")}
            >
              Products
            </Button>
            {!user ? (
              <>
                {sign_up_fotm}
                {log_in}
              </>
            ) : (
              <>
                {cart}
                {user_mail}
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Log-out Success!
        </Alert>
      </Snackbar>
    </>
  );
};

export default MainNavBar;

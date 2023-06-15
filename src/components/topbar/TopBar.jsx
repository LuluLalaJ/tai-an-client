import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { NavLink as RouterLink } from "react-router-dom";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../../redux/userSlice";

export default function TopBar() {
  const pages = ["Teachers", "Gallery"];
  const { isSignedIn } = useSelector( store => store.user)
  const dispatch = useDispatch()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {isSignedIn
            ? <HomeIcon onClick={()=>console.log("click")}/>
            : <HomeIcon component={RouterLink} to={"/"} />}

          </IconButton>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={null}
                sx={{ my: 2, color: "white", display: "block" }}
                component={RouterLink}
                to={`${page.toLowerCase()}`}
              >
                {page}
              </Button>
            ))}
          </Box>

          {isSignedIn ? (
            <Button color="inherit" onClick={() => dispatch(signOutUser())}>
              Sign out
            </Button>
          ) : (
            <>
              <Button component={RouterLink} to={"/signin"} color="inherit">
                Sign In
              </Button>
              <Button component={RouterLink} to={"/signup"} color="inherit">
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

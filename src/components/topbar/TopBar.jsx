import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../../redux/userSlice";
import { toggleDrawer } from "../../redux/drawerSlice";


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
            aria-label="menu"
            color="inherit"
            sx={{ mr: 2 }}
            component={RouterLink}
            to={"/"}
          >
            <HomeIcon/>
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
            <>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="dashboard"
                sx={{
                  mr: 2,
                }}
              >
                <PersonIcon onClick={() => dispatch(toggleDrawer(true))} />
              </IconButton>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="signout"
              >
                <ExitToAppIcon onClick={() => dispatch(signOutUser())} />
              </IconButton>
            </>
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

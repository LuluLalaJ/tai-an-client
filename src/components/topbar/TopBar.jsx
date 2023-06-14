import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { Link as RouterLink } from "react-router-dom";

export default function TopBar() {
  const pages = ["About", "Teachers", "Gallery"];

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
            component={RouterLink}
            to={"/home"}
          >
            <HomeIcon />
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

          <Button component={RouterLink} to={"/signin"} color="inherit">
            Sign In
          </Button>
          <Button component={RouterLink} to={"/signup"} color="inherit">
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

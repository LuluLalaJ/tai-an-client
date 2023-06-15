import React from 'react'
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { useDispatch } from "react-redux";
import { toggleDrawer } from "../../redux/drawerSlice";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";



const SideBarList = () => {
    const dispatch = useDispatch();
      const { role } = useSelector((store) => store.user);

return (
  <Box
    sx={{ width: 250 }}
    role="presentation"
    onClick={() => dispatch(toggleDrawer(false))}
    onKeyDown={() => dispatch(toggleDrawer(false))}
  >
    <List>
      <ListItem disablePadding>
        <ListItemButton component={RouterLink} to={"/profile"}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton component={RouterLink} to={"/schedule"}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Schedule" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton component={RouterLink} to={"/lessons"}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Lessons" />
        </ListItemButton>
      </ListItem>
    </List>

    <Divider />

    <List>
      {role === "teacher" && (
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to={"/students"}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Students" />
          </ListItemButton>
        </ListItem>
      )}

      {role === "student" && (
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to={"/checkout"}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Buy Credits" />
          </ListItemButton>
        </ListItem>
      )}
    </List>
  </Box>
);
};

export default SideBarList

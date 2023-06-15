import React from 'react'
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useDispatch } from "react-redux";
import { toggleDrawer } from "../../redux/drawerSlice";
import { Link as RouterLink } from "react-router-dom";




const SideBarList = () => {
    const dispatch = useDispatch();
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
        <ListItemButton>
          <ListItemIcon component={RouterLink} to={"/lessons"}>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Lessons" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton component={RouterLink} to={"/students"}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Students" />
        </ListItemButton>
      </ListItem>
    </List>
    <Divider />
    <List>
      <ListItem disablePadding>
        <ListItemButton component={RouterLink} to={"/checkout"}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Buy Credits" />
        </ListItemButton>
      </ListItem>
    </List>
  </Box>
);
};

export default SideBarList

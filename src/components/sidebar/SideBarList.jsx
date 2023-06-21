import React from 'react'
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Groups2Icon from '@mui/icons-material/Groups2';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import ClassIcon from "@mui/icons-material/Class";
import PaidIcon from "@mui/icons-material/Paid";
import { useDispatch, useSelector } from "react-redux";
import { toggleDrawer } from "../../redux/drawerSlice";
import { Link as RouterLink } from "react-router-dom";



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
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton component={RouterLink} to={"/schedule"}>
          <ListItemIcon>
            <CalendarMonthIcon />
          </ListItemIcon>
          <ListItemText primary="Schedule" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton component={RouterLink} to={"/lessons"}>
          <ListItemIcon>
            <ClassIcon />
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
              <Groups2Icon />
            </ListItemIcon>
            <ListItemText primary="Students" />
          </ListItemButton>
        </ListItem>
      )}

      {role === "student" && (
        <>
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to={"/product"}>
              <ListItemIcon>
                <PaidIcon />
              </ListItemIcon>
              <ListItemText primary="Buy Credits" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to={"/membership"}>
              <ListItemIcon>
                <PaidIcon />
              </ListItemIcon>
              <ListItemText primary="Add Membership" />
            </ListItemButton>
          </ListItem>
        </>
      )}
    </List>
  </Box>
);
};

export default SideBarList

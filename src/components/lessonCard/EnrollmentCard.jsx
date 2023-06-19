import React from 'react'
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ImageIcon from "@mui/icons-material/Image";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";


export const EnrollmentCard = ({enrollment}) => {
    console.log(enrollment)
  return (
    <>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Photos" secondary="Jan 9, 2014" />
      </ListItem>
    </>
  );
}

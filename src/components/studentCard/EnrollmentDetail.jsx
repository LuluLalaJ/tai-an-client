import { Button, Divider, Typography } from '@mui/material'
import React from 'react'
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

const EnrollmentDetail = ({enrollment}) => {
    const {
      comment,
      id,
      lesson_id,
      status,
      lesson: { start, end, title },
    } = enrollment;

    console.log(enrollment)


  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AssignmentIndIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`Lesson: ${title}`}
          secondary={`Status: ${status}`}
        />
      </ListItem>
      <ListItem>
        <ListItemText primary={`Start: ${start.slice(0, -3)}`} />
        <ListItemText primary={`End: ${end.slice(0, -3)}`} />
      </ListItem>
      <TextField></TextField>
      <Button>Edit Comment</Button>
      <Divider />

    </>
  );
}

export default EnrollmentDetail

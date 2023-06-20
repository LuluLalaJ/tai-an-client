import { Button, Divider, Typography, Box, Container } from '@mui/material'
import React from 'react'
import TextField from "@mui/material/TextField";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import {
  cancelEnrollment,
  changeEnrollmentStatus,
} from "../../redux/enrollmentSlice";
import ButtonGroup from "@mui/material/ButtonGroup";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

const EnrollmentDetail = ({enrollment}) => {
    const dispatch = useDispatch();

    const {
      comment,
      id,
      lesson_id,
      status,
      lesson: { start, end, title },
    } = enrollment;

    // console.log(enrollment)

    // MAKE SURE NO PAST ENROLLMENT CAN'T BE DELETED
    const handleDeleteEnrollment = () => {
      if (
        window.confirm(
          `Are you sure you want to unenroll the student?`
        )
      ) {
        //NEED TO RENDER IN THE FRONT AS WELL
        dispatch(cancelEnrollment([lesson_id, id]));
      }
    };

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
        {/* NEED TO RENDER IN THE FRONT */}
        {status === "waitlisted" && (
          <IconButton
            aria-label="register"
            onClick={() =>
              dispatch(
                changeEnrollmentStatus([
                  lesson_id,
                  id,
                  { status: "registered" },
                ])
              )
            }
          >
            <PersonAddIcon />
          </IconButton>
        )}
        {status === "registered" && (
          <IconButton
            aria-label="waitlist"
            onClick={() =>
              dispatch(
                changeEnrollmentStatus([
                  lesson_id,
                  id,
                  { status: "waitlisted" },
                ])
              )
            }
          >
            <PersonRemoveIcon />
          </IconButton>
        )}
      </ListItem>
      <ListItem>
        <ListItemText primary={`Start: ${start.slice(0, -3)}`} />
        <ListItemText primary={`End: ${end.slice(0, -3)}`} />
      </ListItem>
      <TextField></TextField>
      <Box>
        <Button variant="outlined">Edit Comment</Button>

        <Button
          variant="outlined"
          color="error"
          onClick={handleDeleteEnrollment}
        >
          Cancel Enrollment
        </Button>
      </Box>

      <Divider />
    </>
  );
}

export default EnrollmentDetail

import React from 'react'
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import { Button } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useDispatch } from 'react-redux';
import { cancelEnrollment, changeEnrollmentStatus } from '../../redux/enrollmentSlice';


export const EnrollmentCard = ({enrollment}) => {
    console.log(enrollment)
    const dispatch = useDispatch()
    const {student:{first_name, last_name, avatar}, status, id, lesson_id} = enrollment


    const handleDeleteEnrollment = () => {
         if (
           window.confirm(
             `Are you sure you want to unenroll ${first_name} ${last_name}`
           )
         ) {
           dispatch(cancelEnrollment([lesson_id, id]));
         }
    }

  return (
    <>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar alt={`${first_name} ${last_name}`} src={avatar}></Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`${first_name} ${last_name}`}
          secondary={status}
        />
        <IconButton aria-label="delete" onClick={handleDeleteEnrollment}>
          <DeleteForeverIcon />
        </IconButton>
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
    </>
  );
}

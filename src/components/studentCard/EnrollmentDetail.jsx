import { Button, Divider, Box } from '@mui/material'
import React from 'react'
import TextField from "@mui/material/TextField";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { green } from '@mui/material/colors';
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelEnrollment,
  changeEnrollmentStatus,
} from "../../redux/enrollmentSlice";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { Formik } from 'formik';
import { TOMORROW } from "../../constants";


const EnrollmentDetail = ({enrollment}) => {
    const dispatch = useDispatch();
    const {user} = useSelector(store=>store.user)
    const {
      comment,
      id,
      lesson_id,
      status,
      lesson: { start, end, title, is_full},
    } = enrollment;

    const isFutureEvent = new Date(start) > TOMORROW;

     const handleFormSubmit = (values) => {
       dispatch(changeEnrollmentStatus([lesson_id, id, values, user.id]));
     };

    const handleDeleteEnrollment = () => {
      if (
        window.confirm(
          `Are you sure you want to unenroll the student?`
        )
      ) {
        dispatch(cancelEnrollment([lesson_id, id]));
      }
    };

  const full = is_full ? "full" : "not full"
  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: isFutureEvent && green[500]}}>
            <AssignmentIndIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`Lesson: ${title}`}
          secondary={`Lesson is ${full} | Status: ${status}`}
        />
        {status === "waitlisted" && (
          <IconButton
            aria-label="register"
            disabled={!isFutureEvent || is_full}
            onClick={() =>
              dispatch(
                changeEnrollmentStatus([
                  lesson_id,
                  id,
                  { status: "registered" },
                  user.id,
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
            disabled={!isFutureEvent}
            onClick={() =>
              dispatch(
                changeEnrollmentStatus([
                  lesson_id,
                  id,
                  { status: "waitlisted" },
                  user.id,
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
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{ comment }}
        enableReinitialize="true"
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box>
              <TextField
                fullWidth
                variant="outlined"
                type="comment"
                label="Comments"
                onChange={handleChange}
                value={values.comment}
                name="comment"
              />

              <Button variant="outlined" type="submit">
                Edit Comments
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      <Button
        variant="outlined"
        color="error"
        disabled={!isFutureEvent}
        onClick={handleDeleteEnrollment}
      >
        Cancel Enrollment
      </Button>

      <Divider />
    </>
  );
}

export default EnrollmentDetail

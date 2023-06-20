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
import { Formik } from 'formik';

const EnrollmentDetail = ({enrollment}) => {
    const dispatch = useDispatch();

    const {
      comment,
      id,
      lesson_id,
      status,
      lesson: { start, end, title },
    } = enrollment;

     const handleFormSubmit = (values) => {
       console.log("submit", values);
       dispatch(changeEnrollmentStatus([lesson_id, id, values]));
     };
    // console.log(enrollment)

    // MAKE SURE NO PAST ENROLLMENT CAN'T BE DELETED or CHANGED!
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
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{comment}}
        enableReinitialize="true"
      >
        {({
          values,
          handleChange,
          handleSubmit,
        }) => (
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
          onClick={handleDeleteEnrollment}
        >
          Cancel Enrollment
        </Button>

      <Divider />
    </>
  );
}

export default EnrollmentDetail

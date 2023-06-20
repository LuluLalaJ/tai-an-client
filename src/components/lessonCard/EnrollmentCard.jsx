import React from 'react'
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import { Badge, Button } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useDispatch, useSelector } from 'react-redux';
import { cancelEnrollment, changeEnrollmentStatus } from '../../redux/enrollmentSlice';
import FeedbackModal from './FeedbackModal';
import CommentIcon from "@mui/icons-material/Comment";
import { green } from '@mui/material/colors';


export const EnrollmentCard = ({enrollment, canEdit}) => {
    console.log(enrollment)
    const dispatch = useDispatch()
    const {student:{first_name, last_name, avatar, id: student_id}, comment, status, id, lesson_id} = enrollment
    const {user, role} = useSelector(store => store.user)

    const isStudentUser = role === "student" && user.id === student_id

    const handleDeleteEnrollment = () => {
         if (
           window.confirm(
             `Are you sure you want to unenroll ${first_name} ${last_name}`
           )
         ) {
           dispatch(cancelEnrollment([lesson_id, id]));
         }
    }

    const handleDeleteEnrollmentStudent = () => {
      if (
        window.confirm(
          `Are you sure you want to unenroll from the lesson?`
        )
      ) {
        dispatch(cancelEnrollment([lesson_id, id]));
      }
    };

  return (
    <>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Badge color="secondary" variant="dot" invisible={!isStudentUser}>
            <Avatar alt={`${first_name} ${last_name}`} src={avatar}></Avatar>
          </Badge>
        </ListItemAvatar>
        <ListItemText
          primary={`${first_name} ${last_name[0]}`}
          secondary={status}
        />

        {canEdit && (
          <>
            <FeedbackModal
              comment={comment}
              lessonId={lesson_id}
              enrollmentId={id}
            />
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
            <IconButton aria-label="delete" onClick={handleDeleteEnrollment}>
              <DeleteForeverIcon />
            </IconButton>
          </>
        )}

        {isStudentUser && (
          <IconButton aria-label="delete" onClick={handleDeleteEnrollmentStudent}>
            <DeleteForeverIcon />
          </IconButton>
        )}
      </ListItem>
      {isStudentUser && (
        <ListItem>
          <ListItemAvatar>
            <CommentIcon />
          </ListItemAvatar>
          <ListItemText>{comment}</ListItemText>
        </ListItem>
      )}
    </>
  );
}

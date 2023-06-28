import { useEffect } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import { Badge } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useDispatch, useSelector } from 'react-redux';
import {
  cancelEnrollment,
  changeEnrollmentStatus,
  resetChangeEnrollError,
} from "../../redux/enrollmentSlice";
import FeedbackModal from './FeedbackModal';
import CommentIcon from "@mui/icons-material/Comment";


export const EnrollmentCard = ({enrollment, isFull, canEdit, isFutureEvent}) => {
    const dispatch = useDispatch()
    const {student:{first_name, last_name, avatar, id: student_id}, comment, status, id, lesson_id} = enrollment
    const {user, role} = useSelector(store => store.user)
    const {changeEnrollError} = useSelector(store => store.enrollment)

    const isStudentUser = role === "student" && user.id === student_id

    const handleDeleteEnrollment = () => {
         if (
           window.confirm(
             `Are you sure you want to unenroll ${first_name} ${last_name}`
           )
         ) {
           dispatch(cancelEnrollment([lesson_id, id, role]));
         }
    }

    const handleDeleteEnrollmentStudent = () => {
      if (
        window.confirm(
          `Are you sure you want to unenroll from the lesson?`
        )
      ) {
        dispatch(cancelEnrollment([lesson_id, id, role]));
      }
    };

    console.log(changeEnrollError)

    // useEffect(() => {
    //   if (changeEnrollError) {
    //     if (changeEnrollError.error === "Insufficient credit") {
    //       dispatch(resetChangeEnrollError());
    //       alert("Insufficient credit to register; please purchase more!");
    //     }
    //   }
    // }, [changeEnrollError]);

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
                disabled={!isFutureEvent || isFull}
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
                disabled={!isFutureEvent}
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
            <IconButton
              aria-label="delete"
              disabled={!isFutureEvent}
              onClick={handleDeleteEnrollment}
            >
              <DeleteForeverIcon />
            </IconButton>
          </>
        )}

        {isStudentUser && (
          <IconButton
            aria-label="delete"
            disabled={!isFutureEvent}
            onClick={handleDeleteEnrollmentStudent}
          >
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

import {
  Popover,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Box
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ClassIcon from "@mui/icons-material/Class";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeLessonPop, deleteLessonRequest } from "../../redux/lessonSlice";
import {
  addEnrollment,
  cancelEnrollment,
  resetEnrollmentError,
} from "../../redux/enrollmentSlice";
import { TOMORROW, LESSON_LEVEL } from "../../constants";
import { getEnrollmentId, checkStudentEnrollment } from "../../utilities";
import { useEffect } from "react";

export default function LessonPop({ info }) {
  const dispatch = useDispatch();
  const { isLessonPopOpen } = useSelector((store) => store.lesson);
  const { role, user } = useSelector((store) => store.user);
  const { error } = useSelector(store => store.enrollment)
  const lessonId = parseInt(info.event.id);
  const {title} = info.event

  const {
    is_full,
    description,
    level,
    price,
    teacher,
    teacher_id,
    enrollments,
  } = info.event.extendedProps;

  const enrollmentId = getEnrollmentId(enrollments, user.id);
  const userIsEnrolled = checkStudentEnrollment(enrollments, user.id);

  const isFutureEvent = info.event.start > TOMORROW;
  const canCancelEnrollment =
    role === "student" && userIsEnrolled && isFutureEvent;
  const canJoin = role === "student" && !userIsEnrolled && isFutureEvent;
  const isMyLesson = role === "teacher" && user.id === teacher_id;

  const handleDeleteLesson = () => {
    if (
      window.confirm(
        `Are you sure you want to delete the lesson '${info.event.title}'`
      )
    ) {
      dispatch(deleteLessonRequest(lessonId));
      dispatch(closeLessonPop());
    }
  };

  useEffect(() => {
    if (error) {
      if (error.error === "Insufficient credit") {
        alert("Insufficient credit to register; please purchase more!")
        dispatch(resetEnrollmentError());
      }
    }
  }, [error]);

  return (
    <div>
      <Popover
        id="lesson"
        open={isLessonPopOpen}
        anchorEl={info.jsEvent.target}
        onClose={() => dispatch(closeLessonPop())}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar
                // sx={{ bgcolor: green[500] }}
                >
                <ClassIcon/>
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${title}`}
              secondary="Lesson"
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar src={teacher["avatar"]}></Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${teacher["first_name"]} ${teacher["last_name"]} `}
              secondary="Teacher"
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                {is_full ? <PersonAddDisabledIcon /> : <PersonAddIcon />}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={is_full ? "Full" : "Available"}
              secondary="Capacity"
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AttachMoneyIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`$ ${price}`} secondary="Lesson Fee" />
          </ListItem>

          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <StarBorderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${LESSON_LEVEL[level]}`}
              secondary="Lesson level"
            />
          </ListItem>

          <ListItem>
            <Typography gutterBottom>Description:</Typography>
          </ListItem>
          <ListItem>
            <Typography>{description}</Typography>
          </ListItem>

          {canCancelEnrollment && (
            <Box sx={{ mt: 2, mb: 1, px: 4 }}>
              <Button variant="text" fullWidth disabled={true}>
                {userIsEnrolled}
              </Button>
            </Box>
          )}

          {canCancelEnrollment && (
            <Box sx={{ mt: 2, mb: 1, px: 4 }}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => {
                  dispatch(cancelEnrollment([lessonId, enrollmentId, role]));
                  dispatch(dispatch(closeLessonPop()));
                }}
              >
                Cancel
              </Button>
            </Box>
          )}

          {canJoin && (
            <Box sx={{ mt: 2, mb: 1, px: 4 }}>
              <Button
                variant="contained"
                fullWidth
                // NEED TO HANDLE INSUFFICIENT FUND ERROR
                // right now, if there's not sufficient fund
                // the rejection is not clear
                // prevent from submitting at the first place if possible

                onClick={() => {
                  dispatch(addEnrollment(lessonId));
                  console.log(error)
                  dispatch(closeLessonPop());
                }}
              >
                {is_full ? "Join Waitlist" : "Register"}
              </Button>
            </Box>
          )}

          {isMyLesson && (
            <Box sx={{ mt: 2, mb: 1, px: 4 }}>
              <Button
                component={RouterLink}
                to={`/editor/${info.event.id}`}
                variant="contained"
                fullWidth
                disabled={!isFutureEvent}
                // onClick={null}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                fullWidth
                disabled={!isFutureEvent}
                onClick={() => handleDeleteLesson(info)}
              >
                Delete
              </Button>
            </Box>
          )}
        </List>
      </Popover>
    </div>
  );
}

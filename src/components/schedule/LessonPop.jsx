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
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeLessonPop, deleteLessonRequest } from "../../redux/lessonSlice";
import { addEnrollment, cancelEnrollment } from "../../redux/enrollmentSlice";
import { TOMORROW, LESSON_LEVEL } from "../../constants";
import { getEnrollmentId, checkStudentEnrollment } from "../../utilities";

export default function LessonPop({ info }) {
  // console.log(info)
  const dispatch = useDispatch();
  const { isLessonPopOpen } = useSelector((store) => store.lesson);
  const { role, user } = useSelector((store) => store.user);
  const lessonId = info.event.id;
  const { is_full, description, level, price, teacher, teacher_id, enrollments} =
    info.event.extendedProps;

  const enrollmentId = getEnrollmentId(enrollments, user.id);
  const userEnrollmentStatus = checkStudentEnrollment(enrollments, user.id);

  const canCancel = role === "student" && userEnrollmentStatus;
  const canJoin = role === "student" && !userEnrollmentStatus;
  const isMyLesson = role === "teacher" && user.id === teacher_id;
  const notEditable = info.event.start <= TOMORROW;

  const handleDeleteLesson = (info) => {
    if (
      window.confirm(
        `Are you sure you want to delete the lesson '${info.event.title}'`
      )
    ) {
      dispatch(deleteLessonRequest(info.event.id));
      info.event.remove();
      dispatch(closeLessonPop());
    }
  };

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
                <BeachAccessIcon />
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

          {canCancel && (
            <Box sx={{ mt: 2, mb: 1, px: 4 }}>
              <Button variant="text" fullWidth disabled={true}>
                {userEnrollmentStatus}
              </Button>
            </Box>
          )}

          {canCancel && (
            <Box sx={{ mt: 2, mb: 1, px: 4 }}>
              <Button
                variant="contained"
                fullWidth
                onClick={() =>
                  dispatch(cancelEnrollment([lessonId, enrollmentId]))
                }
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
                onClick={() => dispatch(addEnrollment(lessonId))}
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
                disabled={notEditable}
                // onClick={null}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                fullWidth
                disabled={notEditable}
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

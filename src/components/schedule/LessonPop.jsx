import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Box from "@mui/material/Box";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeLessonPop, deleteLessonRequest } from "../../redux/lessonSlice";
import { addEnrollment, cancelEnrollment } from "../../redux/enrollmentSlice";

const LESSON_LEVEL = {
    1: "Beginner",
    2: "Intermediate I",
    3: "Intermediate II",
    4: "Advanced I",
    5: "Advanced II"
}

export default function LessonPop({ selectedEvent }) {

  const dispatch = useDispatch();
  const { isLessonPopOpen, lessonPopInfo} = useSelector((store) => store.lesson);
  const { role, user } = useSelector(store => store.user)

  const currentEnrollments = selectedEvent.event.extendedProps.enrollments

  const handleDeleteLesson = (selectedEvent) => {
    if (
      window.confirm(
        `Are you sure you want to delete the lesson '${selectedEvent.event.title}'`
      )
    ) {
      dispatch(deleteLessonRequest(selectedEvent.event.id));
      selectedEvent.event.remove()
      dispatch(closeLessonPop());
    }
  };

  const checkStudentEnrollment = (currentEnrollments, studentId) => {
    const foundEnrollment = currentEnrollments.find(enrollment => enrollment.student_id === studentId);
    return foundEnrollment ? foundEnrollment.status : null
  }


  const getEnrollmentId = (currentEnrollments, studentId) => {
    const foundEnrollment = currentEnrollments.find(
      (enrollment) => enrollment.student_id === studentId
    );
    return foundEnrollment ? foundEnrollment.id : null;
  };

  if (selectedEvent) {
    // MAYBE NEED TO GET THE LESSON TO STORE IT IN THE STATE
    const lessonId = selectedEvent.event.id
    const { is_full, description, level, price, teacher, teacher_id } =
      lessonPopInfo;
    const editable = role === "teacher" && user.id === teacher_id

    const userEnrollmentStatus = checkStudentEnrollment(
      currentEnrollments,
      user.id
    )

    const canCancel =
      role === "student" && userEnrollmentStatus;
    const canJoin = role === "student" && !userEnrollmentStatus ;

    const enrollmentId = getEnrollmentId(currentEnrollments, user.id);

    return (
      <div>
        <Popover
          id="lesson"
          open={isLessonPopOpen}
          anchorEl={selectedEvent.jsEvent.target}
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
                  onClick={() => dispatch(addEnrollment(lessonId))}
                >
                  {is_full ? "Join Waitlist" : "Register"}
                </Button>
              </Box>
            )}

            {editable && (
              <Box sx={{ mt: 2, mb: 1, px: 4 }}>
                <Button
                  component={RouterLink}
                  to={`/editor/${selectedEvent.event.id}`}
                  variant="contained"
                  fullWidth
                  disabled={!editable}
                  // onClick={null}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  disabled={!editable}
                  onClick={() => handleDeleteLesson(selectedEvent)}
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
  }

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
import { useDispatch, useSelector } from "react-redux";
import { closeLessonPop } from "../../redux/lessonSlice";

const LESSON_LEVEL = {
    1: "Beginner",
    2: "Intermediate I",
    3: "Intermediate II",
    4: "Advanced I",
    5: "Advanced II"
}

export default function LessonPop({ lessonPopAnchorEl }) {


  const dispatch = useDispatch();
  const { isLessonPopOpen, lessonPopInfo} = useSelector((store) => store.lesson);
  const { role, user } = useSelector(store => store.user)
  const {
    is_full,
    description,
    level,
    price,
    teacher,
    teacher_id
  } = lessonPopInfo;


  if (lessonPopInfo) {
    const editable = role === "teacher" && user.id === teacher_id
    const canRegister = role === "student" && (!is_full)



    return (
      <div>
        <Popover
          id="lesson"
          open={isLessonPopOpen}
          anchorEl={lessonPopAnchorEl}
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

            {canRegister && (
              <Box sx={{ mt: 2, mb: 1, px: 4 }}>
                <Button variant="contained" fullWidth disabled={!canRegister}>
                  {canRegister ? "Register" : "Full"}
                </Button>
              </Box>
            )}

            {editable && (
              <Box sx={{ mt: 2, mb: 1, px: 4 }}>
                <Button variant="contained" fullWidth disabled={!editable}>
                  Edit
                </Button>
              </Box>
            )}
          </List>
        </Popover>
      </div>
    );
  }
  }

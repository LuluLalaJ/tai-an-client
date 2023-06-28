import { useState } from 'react';
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Divider, Grid, IconButton, List, ListItem, ListItemText, ListItemAvatar, Typography} from '@mui/material';
import { styled } from "@mui/material/styles";
import { green, grey } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useDispatch, useSelector } from "react-redux";
import { deleteLessonRequest } from "../../redux/lessonSlice";
import { Link as RouterLink } from "react-router-dom";
import { EnrollmentCard } from './EnrollmentCard';
import { TOMORROW } from "../../constants";


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const LessonCard = ({ lesson }) => {
    const dispatch = useDispatch()
      const { role } = useSelector(store => store.user)
      const canEdit = role === "teacher"

    const handleDeleteLesson = () => {
        if (
          window.confirm(
            `Are you sure you want to delete the lesson '${lesson.title}'`
          )
        ) {
          dispatch(deleteLessonRequest(lesson.id));

        }
    }

    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    const {start, description, title, enrollments, is_full } = lesson

    //BACKEND HANDLING TOO
    const isFutureEvent = new Date(start) > TOMORROW;

    return (
      <Grid item key={lesson.id} xs={12} sm={12} md={6}>
        <Card sx={{ maxWidth: 450 }}>
          <CardHeader
            //maybe do group avatars here
            //maybe color separation between past and current events
            avatar={
              <Avatar
                sx={{ bgcolor: isFutureEvent ? green[500] : grey[500] }}
                aria-label="lesson"
              >
                {title[0]}
              </Avatar>
            }
            title={`${title}`}
            subheader={start}
          />

          <CardMedia
            component="img"
            height="194"
            image="https://rb.gy/utbxe"
            alt="Paella dish"
          />
          <CardContent>
            {role === "student" && (
              <Typography variant="body2" color="text.primary">
                Teacher: {lesson.teacher.first_name} {lesson.teacher.last_name}
              </Typography>
            )}
            <Typography variant="body2" color="text.primary">
              Capacity: {is_full? "Full": "Not Full"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            {canEdit && (
              <>
                <IconButton
                  component={RouterLink}
                  to={`/editor/${lesson.id}`}
                  aria-label="edit"
                  disabled={!isFutureEvent}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={handleDeleteLesson}
                  disabled={!isFutureEvent}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </>
            )}
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                {enrollments.length === 0 && (
                  <>
                    <Divider variant="inset" component="li" />
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <PersonOffIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="No registered student yet" />
                    </ListItem>
                  </>
                )}

                {enrollments &&
                  enrollments.map((enrollment) => (
                    <EnrollmentCard
                      enrollment={enrollment}
                      key={enrollment.id}
                      canEdit={canEdit}
                      isFutureEvent={isFutureEvent}
                      isFull={is_full}
                    />
                  ))}
              </List>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>
    );
};

export default LessonCard

import React , {useState} from 'react'
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { green, red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { deleteLessonRequest, openLessonPop, closeLessonPop } from "../../redux/lessonSlice";
import { Link as RouterLink } from "react-router-dom";
import List from "@mui/material/List";
import { EnrollmentCard } from './EnrollmentCard';
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Divider from "@mui/material/Divider";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import Popover from "@mui/material/Popover";

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
    const { isLessonPopOpen, lessonPopInfo } = useSelector(
      (store) => store.lesson
    );
    const handleDeleteLesson = () => {
        if (
          window.confirm(
            `Are you sure you want to delete the lesson '${lesson.title}'`
          )
        ) {
          dispatch(deleteLessonRequest(lesson.id));

        }
    }

    const [expanded, setExpanded] = React.useState(false);
    const [anchorEl, setAnchorEl] = useState(null)

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    const {start, end, capacity, level, price, description, title, enrollments, id} = lesson
  return (
    <Grid item key={lesson.id} xs={12} sm={12} md={6}>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: green[500] }} aria-label="lesson">
              {title[0]}
            </Avatar>
          }
          //   action={
          //     <IconButton
          //       aria-label="info"
          //       onClick={(event) => {
          //         dispatch(openLessonPop())
          //         setAnchorEl(event.currentTarget);

          //       }}
          //     >
          //       <MoreVertIcon />
          //     </IconButton>
          //   }
          title={`${title.slice(0, 30)}...`}
          subheader={start}
        />

        <CardMedia
          component="img"
          height="194"
          image="https://rb.gy/utbxe"
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            component={RouterLink}
            to={`/editor/${lesson.id}`}
            aria-label="edit"
          >
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={handleDeleteLesson}>
            <DeleteForeverIcon />
          </IconButton>
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
                  <EnrollmentCard enrollment={enrollment} key={enrollment.id} />
                ))}
            </List>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
};

export default LessonCard

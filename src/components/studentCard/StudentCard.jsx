import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { green, red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Grid from "@mui/material/Grid";
import StudentEnrollmentModal from "./StudentEnrollmentModal";


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

const StudentCard = ({student}) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  console.log(student)
  const {avatar, email, enrollments, first_name, last_name, id} = student

  return (
    <Grid item key={student.id} xs={12} sm={12} md={6}>
      <Card sx={{ maxWidth: 450 }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: green[700] }}
              aria-label={`${first_name} ${last_name}`}
            >
              {first_name[0]}
            </Avatar>
          }
          action={
           <StudentEnrollmentModal />
          }
          title={`${first_name} ${last_name}`}
          subheader={email}
        />
        <CardMedia
          component="img"
          height="250"
          image={avatar}
          alt={`${first_name} ${last_name}`}
        />
        <CardContent>
          <Typography variant="h6" color="text.secondary">
            Total Lessons: {enrollments.length}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {/* <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
           */}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default StudentCard;

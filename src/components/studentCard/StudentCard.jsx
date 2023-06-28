import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { green } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import StudentEnrollmentModal from "./StudentEnrollmentModal";
import { useSelector } from "react-redux";

const StudentCard = ({student}) => {
      const { user } = useSelector((store) => store.user);

  const {avatar, email, enrollments, first_name, last_name, city, state, country} = student

const enrollmentsInMyLessons = enrollments.filter((enrollment) => {
  return enrollment.lesson.teacher_id === user.id;
});

if (enrollmentsInMyLessons.length === 0) {
  return null
}
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
            <StudentEnrollmentModal enrollments={enrollmentsInMyLessons} />
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
          <Typography variant="h6" color="text.primary">
            Total Lessons: {enrollmentsInMyLessons.length}
          </Typography>
          <Typography variant="body1" color="text.primary">
            From: {city}, {state}, {country}
          </Typography>
        </CardContent>
        <CardActions disableSpacing></CardActions>
      </Card>
    </Grid>
  );
};

export default StudentCard;

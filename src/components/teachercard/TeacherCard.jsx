import React from 'react';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const TeacherCard = ({teacher}) => {
  const {id, country, first_name, avatar, bio} = teacher
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="div"
        sx={{
          // 16:9
          // pt: "56.25%",
          pt: "120%",
        }}
        image={avatar}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {first_name}
        </Typography>
        <Typography>{bio}</Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">View</Button>
        <Button size="small">Edit</Button>
      </CardActions> */}
    </Card>
  );
}

export default TeacherCard

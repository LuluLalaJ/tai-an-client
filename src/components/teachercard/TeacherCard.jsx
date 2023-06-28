import React from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const TeacherCard = ({teacher}) => {
  const {last_name, avatar, bio} = teacher
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
          {last_name}
        </Typography>
        <Typography>{bio}</Typography>
      </CardContent>
    </Card>
  );
}

export default TeacherCard

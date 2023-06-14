import React from 'react';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { TeacherCard } from '../../components'

const Teachers = () => {

  const teachers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <main>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Our Teachers
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est, harum
            quas? Ex officiis facilis reprehenderit voluptate aut aspernatur sit
            molestiae.
          </Typography>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {teachers.map((teacher) => (
            <Grid item key={teacher} xs={12} sm={6} md={4}>
              <TeacherCard teacher={teacher}/>
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}

export default Teachers

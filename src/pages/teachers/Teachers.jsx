import React, { useEffect } from 'react';
import {Grid, Box, Typography, Container} from "@mui/material";
import { TeacherCard } from '../../components'
import { useDispatch, useSelector } from "react-redux";
import { getTeachers } from '../../redux/teachersSlice';
import { sortByStringAsc } from '../../utilities';


const Teachers = () => {
  const { teachers } = useSelector( store => store.teachers)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeachers());
  }, [dispatch]);

  return (
    <Box sx={{ minHeight: "100vh" }}>
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
            Our tea teachers are exceptional guides and mentors in the world of
            Japanese tea ceremony. With their extensive knowledge, dedication,
            and passion for the art, they impart not only the technical skills
            of making tea but also the profound principles of harmony, respect,
            and tranquility. Through their guidance, students embark on a
            transformative journey, discovering the beauty and depth of the tea
            ceremony.
          </Typography>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {sortByStringAsc(teachers, "last_name").map((teacher) => (
            <Grid item key={teacher.id} xs={12} sm={6} md={4}>
              <TeacherCard teacher={teacher} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Teachers

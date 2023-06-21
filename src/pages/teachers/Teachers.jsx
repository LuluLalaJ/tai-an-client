import React, { useEffect } from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { TeacherCard } from '../../components'
import { useDispatch, useSelector } from "react-redux";
import { getTeachers } from '../../redux/teachersSlice';


const Teachers = () => {
  const { teachers } = useSelector( store => store.teachers)
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getTeachers())
  }, [])

  // console.log(teachers)

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
            <Grid item key={teacher.id} xs={12} sm={6} md={4}>
              <TeacherCard teacher={teacher}/>
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}

export default Teachers

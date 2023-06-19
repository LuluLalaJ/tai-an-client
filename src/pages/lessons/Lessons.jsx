import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { LessonCard } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getTeacherLessons } from "../../redux/lessonSlice";

const Lessons = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((store) => store.user);
  const { myLessons } = useSelector((store) => store.lesson);

  useEffect(() => {
    dispatch(getTeacherLessons(user.id));
  }, []);

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Grid container spacing={4}>
        {myLessons && myLessons.map((lesson) => (
          <LessonCard lesson={lesson} key={lesson.id} />
        ))}
      </Grid>
    </Container>
  );
}

export default Lessons;

import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { LessonCard } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getStudents } from "../../redux/studentsSlice";
import { StudentCard }from "../../components";

const Students = () => {
  const dispatch = useDispatch()
  const {user} = useSelector(store => store.user)
  const {students} = useSelector(store => store.students)

  useEffect(() => {
    dispatch(getStudents(user.id));
  }, []);
  console.log(students)

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Grid container spacing={4}>
        {students &&
          students.map((student) => (
            <StudentCard student={student} key={student.id} />
          ))}
      </Grid>
    </Container>
  );
};

export default Students;

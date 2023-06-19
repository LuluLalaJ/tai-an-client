import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { LessonCard } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getStudents } from "../../redux/studentsSlice";

const Students = () => {
  const dispatch = useDispatch()
  const {user} = useSelector(store => store.user)
  const {students} = useSelector(store => store.students)

  useEffect(() => {
    dispatch(getStudents(user.id));
  }, []);

  console.log(students);
  if (students) {
  return <div>Students</div>;
  }
};

export default Students;

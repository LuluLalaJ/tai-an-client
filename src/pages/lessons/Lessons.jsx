import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import { LessonCard } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getTeacherLessons, getStudentLessons } from "../../redux/lessonSlice";
import { sortByDateAsc, sortByDateDesc } from "../../utilities";

const Lessons = () => {
  const dispatch = useDispatch()
  const { user, role } = useSelector((store) => store.user);
  const { myLessons } = useSelector((store) => store.lesson);
  const [sortedLessons, setSortedLessons] = useState(myLessons);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    if (role === "teacher") {
      dispatch(getTeacherLessons(user.id));
    } else if (role === "student") {
      dispatch(getStudentLessons(user.id));
    }
  }, []);

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const filteredLessons = sortedLessons.filter((lesson) => {
    const { title, description, teacher: {first_name, last_name} } = lesson;
    const keyword = searchKeyword.toLowerCase();
    return (
      title.toLowerCase().includes(keyword) ||
      description.toLowerCase().includes(keyword) ||
      `${first_name} ${last_name}`.toLowerCase().includes(keyword)
    );
  });

  console.log(filteredLessons)
  console.log(sortedLessons)
  console.log(myLessons)
  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Button
        variant="contained"
        onClick={() => setSortedLessons(sortByDateAsc(myLessons, "start"))}
      >
        Sort Asc
      </Button>
      <Button
        variant="contained"
        onClick={() => setSortedLessons(sortByDateDesc(myLessons, "start"))}
      >
        Sort Desc
      </Button>
      <Button variant="contained" onClick={() => setSortedLessons(myLessons)}>
        Unsort
      </Button>

      <TextField
        label="Search"
        variant="outlined"
        value={searchKeyword}
        onChange={handleSearchChange}
      />

      <Grid container spacing={4}>
        {filteredLessons.length ===0
        ? myLessons.map((lesson) => (
          <LessonCard lesson={lesson} key={lesson.id} />))
        : filteredLessons.map((lesson) => (
          <LessonCard lesson={lesson} key={lesson.id} />))
        }
      </Grid>
    </Container>
  );
}

export default Lessons;

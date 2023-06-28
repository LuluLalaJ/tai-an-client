import { useEffect, useState } from "react";
import { Box, Toolbar, TextField, IconButton, Grid, Container, Typography} from "@mui/material";
import { LessonCard } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getTeacherLessons, getStudentLessons } from "../../redux/lessonSlice";
import { sortByDateAsc, sortByDateDesc } from "../../utilities";
import { resetChangeEnrollError } from "../../redux/enrollmentSlice";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

const Lessons = () => {
  const dispatch = useDispatch()
  const { user, role } = useSelector((store) => store.user);
  const { myLessons } = useSelector((store) => store.lesson);
  const { changeEnrollError } = useSelector((store) => store.enrollment);
  console.log(changeEnrollError);
  useEffect(() => {
    if (changeEnrollError) {
      if (changeEnrollError.error === "Insufficient credit") {
        alert("Insufficient credit to register!");
      }
      dispatch(resetChangeEnrollError());
    }
  }, [changeEnrollError]);

  const [sortedLessons, setSortedLessons] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    if (role === "teacher") {
      dispatch(getTeacherLessons(user.id));
    } else if (role === "student") {
      dispatch(getStudentLessons(user.id));
    }
  }, [dispatch, role, user.id]);

  useEffect(() => {
    setSortedLessons(sortByDateDesc(myLessons, "start"));
  }, [myLessons]);

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const filteredLessons = sortedLessons.filter((lesson) => {
    const { title, description, teacher: {first_name, last_name}, start } = lesson;
    const keyword = searchKeyword.toLowerCase();
    return (
      title.toLowerCase().includes(keyword) ||
      description.toLowerCase().includes(keyword) ||
      `${first_name} ${last_name}`.toLowerCase().includes(keyword) ||
      start.toLowerCase().includes(keyword)
    );
  });


  return (
    <Container sx={{ py: 2, minHeight: "100vh" }} maxWidth="md">
      <Toolbar
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
        }}
      >
        <Box sx={{ flex: "30%" }}>
          <IconButton
            variant="outlined"
            size="small"
            onClick={() => setSortedLessons(sortByDateDesc(myLessons, "start"))}
          >
            <KeyboardDoubleArrowDownIcon />
          </IconButton>
          <IconButton
            variant="outlined"
            size="small"
            onClick={() => setSortedLessons(sortByDateAsc(myLessons, "start"))}
          >
            <KeyboardDoubleArrowUpIcon />
          </IconButton>
        </Box>
        <TextField
          label="Search"
          variant="outlined"
          value={searchKeyword}
          onChange={handleSearchChange}
          size="small"
          fullWidth
          placeholder="Search by title, description, teacher, or dates"
          sx={{ flex: "60%" }}
        />
        <IconButton aria-label="search">
          <SearchIcon />
        </IconButton>
      </Toolbar>

      {filteredLessons.length === 0 ? (
        <Typography variant="h3">No lesson found...</Typography>
      ) : (
        <Grid container spacing={4} sx={{ py: 1 }}>
          {filteredLessons.map((lesson) => (
            <LessonCard lesson={lesson} key={lesson.id} />
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default Lessons;

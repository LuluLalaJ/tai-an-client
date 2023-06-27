import { useEffect, useState } from "react";
import { Toolbar, TextField, IconButton, Grid, Container, Typography} from "@mui/material";
import { LessonCard } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getTeacherLessons, getStudentLessons } from "../../redux/lessonSlice";
import { sortByDateAsc, sortByDateDesc } from "../../utilities";

import SearchIcon from "@mui/icons-material/Search";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

const Lessons = () => {
  const dispatch = useDispatch()
  const { user, role } = useSelector((store) => store.user);
  const { myLessons } = useSelector((store) => store.lesson);
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
    const { title, description, teacher: {first_name, last_name} } = lesson;
    const keyword = searchKeyword.toLowerCase();
    return (
      title.toLowerCase().includes(keyword) ||
      description.toLowerCase().includes(keyword) ||
      `${first_name} ${last_name}`.toLowerCase().includes(keyword)
    );
  });


  return (
    <Container sx={{ py: 2 }} maxWidth="md">
      <Toolbar
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
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
        </div>
        <div>
          <TextField
            label="Search"
            variant="outlined"
            value={searchKeyword}
            onChange={handleSearchChange}
            size="small"
            placeholder="Search"
          />
          <IconButton aria-label="search">
            <SearchIcon />
          </IconButton>
        </div>
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

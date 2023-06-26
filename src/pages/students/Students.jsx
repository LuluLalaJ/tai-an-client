import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudents } from "../../redux/studentsSlice";
import { StudentCard }from "../../components";
import { Toolbar, TextField, IconButton, Grid, Container } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { sortByStringAsc, sortByStringDesc } from "../../utilities";

const Students = () => {
  const dispatch = useDispatch()
  const {user} = useSelector(store => store.user)
  const {students} = useSelector(store => store.students)
  const [sortedStudents, setSortedStudents] = useState(students);
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const filteredStudents = sortedStudents.filter((student) => {
    const {
      first_name,
      last_name,
      email,
      city,
      state,
      country
    } = student;
    const keyword = searchKeyword.toLowerCase();
    return (
      `${first_name} ${last_name}`.toLowerCase().includes(keyword) ||
      email.toLowerCase().includes(keyword) ||
      city.toLowerCase().includes(keyword) ||
      state.toLowerCase().includes(keyword) ||
      country.toLowerCase().includes(keyword)
    );
  });

  useEffect(() => {
    dispatch(getStudents(user.id));
  }, [dispatch, user.id]);

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
            onClick={() =>
              setSortedStudents(sortByStringDesc(students, "last_name"))
            }
          >
            <KeyboardDoubleArrowDownIcon />
          </IconButton>
          <IconButton
            variant="outlined"
            size="small"
            onClick={() =>
              setSortedStudents(sortByStringAsc(students, "last_name"))
            }
          >
            <KeyboardDoubleArrowUpIcon />
          </IconButton>

          <IconButton
            variant="outlined"
            size="small"
            onClick={() => setSortedStudents(students)}
          >
            <ShuffleIcon />
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

      <Grid container spacing={4} sx={{ py: 1 }}>
        {/* {filteredStudents.length === 0
          ? students.map((student) => (
              <StudentCard student={student} key={student.id} />
            ))
          : filteredStudents.map((student) => (
              <StudentCard student={student} key={student.id} />
            ))} */}
        {filteredStudents.map((student) => (
              <StudentCard student={student} key={student.id} />
            ))}
      </Grid>
    </Container>
  );
};

export default Students;

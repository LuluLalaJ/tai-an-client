import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudents } from "../../redux/studentsSlice";
import { StudentCard }from "../../components";
import {
  Box,
  Toolbar,
  TextField,
  IconButton,
  Grid,
  Container,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { sortByStringAsc, sortByStringDesc } from "../../utilities";
import { resetChangeEnrollError } from "../../redux/enrollmentSlice";

const Students = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((store) => store.user);
  const { changeEnrollError } = useSelector((store) => store.enrollment);

  const { students } = useSelector(store => store.students)
  const [sortedStudents, setSortedStudents] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    if (changeEnrollError) {
      if (changeEnrollError.error === "Insufficient credit") {
        alert("Insufficient credit to register!");
      }
      dispatch(resetChangeEnrollError());
    }
  }, [changeEnrollError]);

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

  useEffect(() => {
    setSortedStudents(sortByStringAsc(students, "last_name"));
  }, [students]);

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
        </Box>
          <TextField
            label="Search"
            variant="outlined"
            value={searchKeyword}
            onChange={handleSearchChange}
            size="small"
            placeholder="Search by name, email, or hometown"
            fullWidth
            sx={{ flex: "60%" }}
          />
          <IconButton aria-label="search">
            <SearchIcon />
          </IconButton>
      </Toolbar>

      <Grid container spacing={4} sx={{ py: 1 }}>
        {filteredStudents.map((student) => (
          <StudentCard student={student} key={student.id} />
        ))}
      </Grid>
    </Container>
  );
};

export default Students;

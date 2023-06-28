import { useState, useEffect } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Container, Stack, Typography, IconButton} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { useDispatch, useSelector } from "react-redux";
import {
  StudentProfileEditor,
  TeacherProfileEditor,
  PaymentHistoryCard,
  LessonCreditHistory,
} from "../../components";
import { sortByDateAsc, sortByDateDesc } from "../../utilities";
import axios from "axios";


export default function Profile() {
  const dispatch = useDispatch();

  const { user, role } = useSelector((store) => store.user);
  const [records, setRecords] = useState([]);
  const [credit, setCredit] = useState(user.lesson_credit)
  const [sortedPayments, setSortedPayments] = useState([]);
  const [sortedRecords, setSortedRecords] = useState([]);

  useEffect(() => {
    if (role === "student") {
      axios
        .get(`/students/${user.id}/payments`)
        .then((r) => {
          setSortedPayments(sortByDateDesc(r.data, "created_at"));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [role, user.id]);

  useEffect(() => {
    if (role === "student") {
      axios
        .get(`/students/${user.id}/lessoncredithistory`)
        .then((r) => {
          setRecords(r.data);
          setSortedRecords(sortByDateDesc(r.data, "created_at"));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [role, user.id]);

  useEffect(() => {
    if (role === "student") {
      axios
        .get(`/students/${user.id}`)
        .then((r) => {setCredit(r.data.lesson_credit);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [])

  return (
    <Container sx={{ mt: 5, minHeight: "100vh" }}>
      {role === "student" ? <StudentProfileEditor /> : <TeacherProfileEditor />}

      {role === "student" && (
        <>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id="remaining-credit"
            >
              <Typography>Remaining Credit</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>$ {credit}</Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id="lesson-credit-history"
            >
              <Typography>Lesson Credits History</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <IconButton
                variant="outlined"
                size="small"
                onClick={() =>
                  setSortedRecords(sortByDateDesc(sortedRecords, "created_at"))
                }
              >
                <KeyboardDoubleArrowDownIcon />
              </IconButton>
              <IconButton
                variant="outlined"
                size="small"
                onClick={() =>
                  setSortedRecords(sortByDateAsc(sortedRecords, "created_at"))
                }
              >
                <KeyboardDoubleArrowUpIcon />
              </IconButton>
              <Stack
                spacing={1}
                sx={{ overflowY: "scroll", maxHeight: "30vh" }}
              >
                {sortedRecords.length === 0 ? (
                  <Typography>There are no records!</Typography>
                ) : (
                  sortedRecords.map((record) => (
                    <LessonCreditHistory record={record} key={record.id} />
                  ))
                )}
              </Stack>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id="purchase-history"
            >
              <Typography>Purchase History</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <IconButton
                variant="outlined"
                size="small"
                onClick={() =>
                  setSortedPayments(
                    sortByDateDesc(sortedPayments, "created_at")
                  )
                }
              >
                <KeyboardDoubleArrowDownIcon />
              </IconButton>
              <IconButton
                variant="outlined"
                size="small"
                onClick={() =>
                  setSortedPayments(sortByDateAsc(sortedPayments, "created_at"))
                }
              >
                <KeyboardDoubleArrowUpIcon />
              </IconButton>
              <Stack
                spacing={1}
                sx={{ overflowY: "scroll", maxHeight: "30vh" }}
              >
                {sortedPayments.length === 0 ? (
                  <Typography>You didn't purchase any credits yet!</Typography>
                ) : (
                  sortedPayments.map((payment) => (
                    <PaymentHistoryCard payment={payment} key={payment.id} />
                  ))
                )}
              </Stack>
            </AccordionDetails>
          </Accordion>
        </>
      )}
    </Container>
  );
}

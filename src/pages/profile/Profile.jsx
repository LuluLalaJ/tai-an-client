import { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Stack, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { StudentProfileEditor, TeacherProfileEditor } from "../../components";
import axios from "axios";
import { PaymentHistoryCard, LessonCreditHistory } from "../../components";

export default function Profile() {

  const { user, role } = useSelector(store => store.user )
  const [payments, setPayments] = useState([])
  const [records, setRecords] = useState([])

  useEffect(()=>{
    if (role === "student") {
      axios.get(`/students/${user.id}/payments`)
      .then(r => setPayments(r.data))
      .catch(err => {
        console.log(err)
      })
    }
  }, [])

  useEffect(() => {
    if (role === "student") {
      axios
        .get(`/students/${user.id}/lessoncredithistory`)
        .then((r) => setRecords(r.data))
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);


  const renderPayments = payments.map(payment => {
               <PaymentHistoryCard payment={payment}/>;
              })

  return (
    <Container sx={{ mt: 5 }}>
      {role === "student" ? <StudentProfileEditor /> : <TeacherProfileEditor />}

      {role === "student" && (
        <>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Remaining Credit</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>$ {user.lesson_credit}</Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Lesson Credits History</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={1}>
                {records.length === 0 ? (
                  <Typography>There are no records!</Typography>
                ) : (
                  records.map((record) => (
                    <LessonCreditHistory record={record} key={record.id} />
                  ))
                )}
              </Stack>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Purchase History</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={1}>
                {payments.length === 0 ? (
                  <Typography>You didn't purchase any credits yet!</Typography>
                ) : (
                  payments.map((payment) => (
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

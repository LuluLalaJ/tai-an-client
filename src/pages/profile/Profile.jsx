import { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { StudentProfileEditor, TeacherProfileEditor } from "../../components";
import axios from "axios";
import PurchaseHistoryCard from "../../components";

export default function Profile() {

  const { user, role } = useSelector(store => store.user )
  const [payments, setPayments] = useState([])

  useEffect(()=>{
    if (role === "student") {
      axios.get(`/students/${user.id}/payments`)
      .then(r => setPayments(r.data))
      .catch(err => {
        console.log(err)
      })
    }
  }, [])


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
              <Typography>
                $ {user.lesson_credit}
              </Typography>
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
              {payments.length === 0
              ? <Typography>
                You have not purchased any lesson credits!
              </Typography>
              : payments.map(payment => {
                <PurchaseHistoryCard />
              })}

            </AccordionDetails>
          </Accordion>
        </>
      )}
    </Container>
  );
}

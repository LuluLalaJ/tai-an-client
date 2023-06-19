import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { StudentProfileEditor, TeacherProfileEditor } from "../../components";

export default function Profile() {

  const { user, role } = useSelector(store => store.user )

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
              <Typography>Payment History</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </>
      )}
    </Container>
  );
}

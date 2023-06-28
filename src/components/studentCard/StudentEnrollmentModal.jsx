import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import IconButton from "@mui/material/IconButton";
import EnrollmentDetail from "./EnrollmentDetail";
import { Stack, Container } from "@mui/material";
import { sortByDateDesc } from "../../utilities";

export default function StudentEnrollmentModal({enrollments}) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);


  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);


  const sortedEnrollments = enrollments.sort((a, b) => {
    const startTimeA = a.lesson.start;
    const startTimeB = b.lesson.start;

    if (startTimeA < startTimeB) {
      return 1;
    } else if (startTimeA > startTimeB) {
      return -1;
    } else {
      return 0;
    }
  });

  return (
    <div>
      <IconButton aria-label="open-lesson-history" onClick={handleClickOpen()}>
        <LocalLibraryIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} scroll="paper">
        <DialogTitle id="scroll-dialog-title">Lesson History</DialogTitle>
        <Container>
          <Stack
            spacing={1}
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {sortedEnrollments.map((enrollment) => (
              <EnrollmentDetail enrollment={enrollment} key={enrollment.id} />
            ))}
          </Stack>
        </Container>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

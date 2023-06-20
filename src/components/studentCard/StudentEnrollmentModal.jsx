import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import IconButton from "@mui/material/IconButton";
import EnrollmentDetail from "./EnrollmentDetail";
import { Stack, Container } from "@mui/material";
import { StorefrontRounded } from "@mui/icons-material";
export default function StudentEnrollmentModal({enrollments}) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  console.log(enrollments)
  const descriptionElementRef = React.useRef(null);


  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <IconButton aria-label="open-lesson-history" onClick={handleClickOpen()}>
        <LocalLibraryIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        // aria-labelledby="lesson-history"
        // aria-describedby="lesson-history"
      >
        <DialogTitle id="scroll-dialog-title">Lesson History</DialogTitle>
        <Container>
          <Stack
            spacing={1}
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {enrollments.map((enrollment) => (
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

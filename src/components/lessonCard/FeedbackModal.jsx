import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { Formik } from "formik";
import TextField from "@mui/material/TextField";
import { changeEnrollmentStatus } from "../../redux/enrollmentSlice";
import { useDispatch, useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function FeedbackModal({ comment, lessonId, enrollmentId }) {
  const { user } = useSelector(store => store.user)
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

   const handleFormSubmit = (values) => {
     dispatch(changeEnrollmentStatus([lessonId, enrollmentId, values, user.id]));

   };

  return (
    <div>
      <IconButton aria-label="add lesson feedback" onClick={handleOpen}>
        <RateReviewIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Comments
          </Typography>
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={{ comment }}
            enableReinitialize="true"
          >
            {({ values, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Box>
                  <TextField
                    fullWidth
                    multiline
                    minRows={4}
                    variant="outlined"
                    type="comment"
                    // label="Edit box"
                    onChange={handleChange}
                    value={values.comment}
                    name="comment"
                  />

                  <Button variant="outlined" type="submit">
                    Edit Comments
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}

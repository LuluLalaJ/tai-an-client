import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Stack } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { updateNewLessonValues, closeNewLessonFormModal } from "../../redux/lessonSlice";

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


export default function LessonModal() {
  const dispatch = useDispatch();
  const { isNewLessonFormModalOpen } = useSelector((store) => store.lesson);

  const formSchema = yup.object().shape({
    title: yup.string().required("required"),
    description: yup.string().required("required"),
    capacity: yup.number().required("required"),
    level: yup.number().required("required"),
    price: yup.number().required("required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      capacity: "",
      level: "",
      price: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      dispatch(updateNewLessonValues(values));
      dispatch(closeNewLessonFormModal());
    },
  });

  const { values, handleChange, handleSubmit, touched, errors } = formik;


  return (
    <div>
      <Modal
        open={isNewLessonFormModalOpen}
        onClose={() => dispatch(closeNewLessonFormModal())}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Enter new lesson info:
            </Typography>
            <FormControl fullWidth>
              <TextField
                required
                id="title"
                label="Title"
                variant="outlined"
                value={values.title}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl fullWidth>
              <TextField
                required
                id="description"
                label="Description"
                multiline
                rows={4}
                value={values.description}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="level">Level</InputLabel>
              <Select
                labelId="level"
                id="level"
                name="level"
                label="Level"
                required
                value={values.level}
                onChange={handleChange}
              >
                <MenuItem value={1}>Beginner</MenuItem>
                <MenuItem value={2}>Intermediate I</MenuItem>
                <MenuItem value={3}>Intermediate II</MenuItem>
                <MenuItem value={4}>Advanced I</MenuItem>
                <MenuItem value={5}>Advanced II</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="capacity">Capacity</InputLabel>

              <Select
                labelId="capacity"
                id="capacity"
                name="capacity"
                label="Capacity"
                required
                value={values.capacity}
                onChange={handleChange}
              >
                <MenuItem value={1}>One Student</MenuItem>
                <MenuItem value={2}>Two Students</MenuItem>
                <MenuItem value={3}>Three Students</MenuItem>
                <MenuItem value={4}>Four Students</MenuItem>
                <MenuItem value={5}>Five Students</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel htmlFor="price">Price</InputLabel>
              <OutlinedInput
                id="price"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="price"
                type="number"
                name="price"
                value={values.price}
                onChange={handleChange}
              />
            </FormControl>
            <Button variant="contained" type="submit">
              Add lesson
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

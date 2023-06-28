import React, { useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from "yup";
import { Formik } from 'formik';
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { getLessonById } from "../../redux/lessonSlice";
import { Box, Button, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import { editLessonRequest } from "../../redux/lessonSlice";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("UTC");

const LessonEditor = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { lessonId } = useParams()
  const { lessonToEdit } = useSelector(store => store.lesson)

  useEffect(() => {
    //NEED VARIOUS ERRO HANDLING
    //EMPTY STRING - DATE RANGE INCORRECT - APPROPRIATE ERROR MESSAGE
    dispatch(getLessonById(lessonId));
  }, [dispatch, lessonId]);

    // console.log("init", lessonToEdit);

 const {id, title, description, capacity, level, price, start, end} = lessonToEdit
 const initialValues = {
   id,
   title,
   description,
   capacity,
   level,
   price,
   start,
   end,
 };

  const formSchema = yup.object().shape({
    //MORE ON THESE VALIDATION LATER AFTER MOST FUNCTIONALITIES ARE BUILT
    title: yup.string().required("required"),
    description: yup.string().required("required"),
    capacity: yup.number().required("required"),
    level: yup.number().required("required"),
    price: yup
      .number()
      .min(0, "The price can't be negative")
      .required("required"),
    start: yup.date().required("required"),
    end: yup
      .date()
      .required("required"),
  });

    const handleFormSubmit = (values) => {
      // console.log(typeof(values.start))
      dispatch(editLessonRequest([id, values]));
      navigate("/lessons");
    };

  if (lessonToEdit) {
return (
  <Box m="20px" sx={{ minHeight: "100vh" }}>
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={formSchema}
      enableReinitialize="true"
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(6, minmax(0, 1fr))"
            //  sx={{
            //    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            //  }}
          >
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Lesson Title"
              onChange={handleChange}
              value={values.title}
              name="title"
              onBlur={handleBlur}
              error={!!touched.title && !!errors.title}
              helperText={touched.title && errors.title}
              sx={{ gridColumn: "span 2" }}
            />

            <DateTimePicker
              timezone="UTC"
              fullWidth
              variant="filled"
              type="text"
              label="Start Time"
              onBlur={handleBlur}
              onChange={(date) => setFieldValue("start", date)}
              value={dayjs.utc(values.start)}
              name="start"
              error={!!touched.start && !!errors.start}
              sx={{ gridColumn: "span 2" }}
              disablePast={true}
              minutesStep={30}
            />
            <DateTimePicker
              timezone="UTC"
              fullWidth
              variant="filled"
              type="text"
              label="End Time"
              onBlur={handleBlur}
              onChange={(date) => setFieldValue("end", date)}
              value={dayjs.utc(values.end)}
              name="end"
              error={!!touched.end && !!errors.end}
              helperText={touched.end && errors.end}
              sx={{ gridColumn: "span 2" }}
              disablePast={true}
              minutesStep={30}
            />

            <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
              <InputLabel id="level">Level</InputLabel>
              <Select
                labelId="level"
                id="level"
                name="level"
                label="Level"
                required
                value={values.level}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.level && !!errors.level}
              >
                <MenuItem value={1}>Beginner</MenuItem>
                <MenuItem value={2}>Intermediate I</MenuItem>
                <MenuItem value={3}>Intermediate II</MenuItem>
                <MenuItem value={4}>Advanced I</MenuItem>
                <MenuItem value={5}>Advanced II</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
              <InputLabel id="capacity">Capacity</InputLabel>
              <Select
                labelId="capacity"
                id="capacity"
                name="capacity"
                label="Capacity"
                required
                value={values.capacity}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.capacity && !!errors.capacity}
              >
                <MenuItem value={1}>One Student</MenuItem>
                <MenuItem value={2}>Two Students</MenuItem>
                <MenuItem value={3}>Three Students</MenuItem>
                <MenuItem value={4}>Four Students</MenuItem>
                <MenuItem value={5}>Five Students</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
              <TextField
                fullWidth
                id="price"
                type="number"
                label="Price"
                onChange={handleChange}
                value={values.price}
                name="price"
                onBlur={handleBlur}
                error={!!touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 2" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <TextField
              fullWidth
              multiline
              rows={4}
              variant="filled"
              type="text"
              label="Lesson Description"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.description}
              name="description"
              error={!!touched.description && !!errors.description}
              helperText={touched.description && errors.description}
              sx={{ gridColumn: "span 6" }}
            />
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              Update Lesson
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  </Box>
);}

}



export default LessonEditor

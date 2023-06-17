import React, { useEffect } from "react";
import { useParams } from 'react-router-dom'
import * as yup from "yup";
import { useFormik, Formik } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { getLessonById } from "../../redux/lessonSlice";
import { Box, Button, TextField } from "@mui/material";

const LessonEditor = () => {
  const dispatch = useDispatch()
  const { lessonId } = useParams()
  const { lessonToEdit } = useSelector(store => store.lesson)
  useEffect(()=>{
    dispatch(getLessonById(lessonId));
  }, [])



  const formSchema = yup.object().shape({
    //MORE ON THESE VALIDATION LATER AFTER MOST FUNCTIONALITIES ARE BUILT
    title: yup.string().required("required"),
    description: yup.string().required("required"),
    capacity: yup.number().required("required"),
    level: yup.number().required("required"),
    price: yup.number().required("required"),
    start: yup.date().required("required"),
    end: yup.date().required("required"),
  });

  const formik = useFormik({
    initialValues: lessonToEdit,
    enableReinitialize: true,
    validationSchema: formSchema,
    onSubmit: (values) => {
      // const lessonValues = { ...values, ...newLessonTime };
      // //add error handling later
      // dispatch(postNewLesson(lessonValues));
      // dispatch(closeNewLessonFormModal());
    },
  });

  const { initialValues, values, handleChange, handleSubmit, touched, errors } =
    formik;

  console.log('init', initialValues);

    const handleFormSubmit = (values) => {
      console.log(values);
    };


   return (
     <Box m="20px">
       {/* <Header title="CREATE USER" subtitle="Create a New User Profile" /> */}

       <Formik
         onSubmit={handleFormSubmit}
         initialValues={initialValues}
         validationSchema={checkoutSchema}
       >
         {({
           values,
           errors,
           touched,
           handleBlur,
           handleChange,
           handleSubmit,
         }) => (
           <form onSubmit={handleSubmit}>
             <Box
               display="grid"
               gap="30px"
               gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              //  sx={{
              //    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              //  }}
             >
               <TextField
                 fullWidth
                 variant="filled"
                 type="text"
                 label="First Name"
                 onBlur={handleBlur}
                 onChange={handleChange}
                 value={values.firstName}
                 name="firstName"
                 error={!!touched.firstName && !!errors.firstName}
                 helperText={touched.firstName && errors.firstName}
                 sx={{ gridColumn: "span 2" }}
               />
               <TextField
                 fullWidth
                 variant="filled"
                 type="text"
                 label="Last Name"
                 onBlur={handleBlur}
                 onChange={handleChange}
                 value={values.lastName}
                 name="lastName"
                 error={!!touched.lastName && !!errors.lastName}
                 helperText={touched.lastName && errors.lastName}
                 sx={{ gridColumn: "span 2" }}
               />
               <TextField
                 fullWidth
                 variant="filled"
                 type="text"
                 label="Email"
                 onBlur={handleBlur}
                 onChange={handleChange}
                 value={values.email}
                 name="email"
                 error={!!touched.email && !!errors.email}
                 helperText={touched.email && errors.email}
                 sx={{ gridColumn: "span 4" }}
               />
               <TextField
                 fullWidth
                 variant="filled"
                 type="text"
                 label="Contact Number"
                 onBlur={handleBlur}
                 onChange={handleChange}
                 value={values.contact}
                 name="contact"
                 error={!!touched.contact && !!errors.contact}
                 helperText={touched.contact && errors.contact}
                 sx={{ gridColumn: "span 4" }}
               />
               <TextField
                 fullWidth
                 variant="filled"
                 type="text"
                 label="Address 1"
                 onBlur={handleBlur}
                 onChange={handleChange}
                 value={values.address1}
                 name="address1"
                 error={!!touched.address1 && !!errors.address1}
                 helperText={touched.address1 && errors.address1}
                 sx={{ gridColumn: "span 4" }}
               />
               <TextField
                 fullWidth
                 variant="filled"
                 type="text"
                 label="Address 2"
                 onBlur={handleBlur}
                 onChange={handleChange}
                 value={values.address2}
                 name="address2"
                 error={!!touched.address2 && !!errors.address2}
                 helperText={touched.address2 && errors.address2}
                 sx={{ gridColumn: "span 4" }}
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
   );
}


const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
};


export default LessonEditor

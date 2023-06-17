import React from 'react'
import { useParams } from 'react-router-dom'
import * as yup from "yup";
import { useFormik } from 'formik';

const LessonEditor = () => {

  const { lessonId } = useParams()
  


  const formSchema = yup.object().shape({
    //MORE ON THESE VALIDATION LATER AFTER MOST FUNCTIONALITIES ARE BUILT
    title: yup.string().required("required"),
    description: yup.string().required("required"),
    capacity: yup.number().required("required"),
    level: yup.number().required("required"),
    price: yup.number().required("required"),
    // start: yup.date().required("required"),
    // end: yup.date().required("required"),
  });

  const formik = useFormik({
    initialValues: {
      start:"",
      end:"",
      title: "",
      description: "",
      capacity: "",
      level: "",
      price: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      // const lessonValues = { ...values, ...newLessonTime };
      // //add error handling later
      // dispatch(postNewLesson(lessonValues));
      // dispatch(closeNewLessonFormModal());
    },
  });

  const { values, handleChange, handleSubmit, touched, errors } = formik;


  return (
    <div>LessonEditor{lessonId}</div>
  )
}

export default LessonEditor

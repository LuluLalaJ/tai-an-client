import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Container } from "@mui/material";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { editStudentProfile } from "../../redux/userSlice";
import Avatar from "@mui/material/Avatar";


const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const StudentProfileEditor = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((store) => store.user);

    const {
      id,
      username,
      email,
      phone,
      first_name,
      last_name,
      avatar,
      address_line1,
      address_line2,
      city,
      state,
      country,
    } = user;

    const initialValues = {
      username,
      email,
      phone,
      first_name,
      last_name,
      avatar,
      address_line1,
      address_line2,
      city,
      state,
      country,
    };

const checkoutSchema = yup.object().shape({
  first_name: yup.string().required("required"),
  last_name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  phone: yup.string().matches(phoneRegExp, "Phone number is not valid"),
});

    const handleFormSubmit = (values) => {
       console.log(values);
       dispatch(editStudentProfile([id, values]))
     };


     return (
       <Accordion>
         <AccordionSummary
           expandIcon={<ExpandMoreIcon />}
           aria-controls="panel1a-content"
           id="panel1a-header"
         >
           <Avatar alt="Cindy Baker" src={avatar} />

         </AccordionSummary>
         <AccordionDetails>
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
                   // sx={{
                   //   "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                   // }}
                 >
                   <TextField
                     fullWidth
                     variant="filled"
                     type="text"
                     label="User ID"
                     value={values.id}
                     name="id"
                     sx={{ gridColumn: "span 2" }}
                     disabled={true}
                   />
                   <TextField
                     fullWidth
                     variant="filled"
                     type="text"
                     label="Username"
                     value={values.username}
                     name="username"
                     sx={{ gridColumn: "span 2" }}
                     disabled={true}
                   />

                   <TextField
                     fullWidth
                     variant="filled"
                     type="text"
                     label="Avatar"
                     onBlur={handleBlur}
                     onChange={handleChange}
                     value={values.avatar}
                     name="avatar"
                     sx={{ gridColumn: "span 4" }}
                   />
                   <TextField
                     fullWidth
                     variant="filled"
                     type="text"
                     label="First Name"
                     onBlur={handleBlur}
                     onChange={handleChange}
                     value={values.first_name}
                     name="first_name"
                     error={!!touched.first_name && !!errors.first_name}
                     helperText={touched.first_name && errors.first_name}
                     sx={{ gridColumn: "span 2" }}
                   />
                   <TextField
                     fullWidth
                     variant="filled"
                     type="text"
                     label="Last Name"
                     onBlur={handleBlur}
                     onChange={handleChange}
                     value={values.last_name}
                     name="last_name"
                     error={!!touched.last_name && !!errors.last_name}
                     helperText={touched.last_name && errors.last_name}
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
                     label="Phone Number"
                     onBlur={handleBlur}
                     onChange={handleChange}
                     value={values.phone}
                     name="phone"
                     error={!!touched.phone && !!errors.phone}
                     helperText={touched.phone && errors.phone}
                     sx={{ gridColumn: "span 4" }}
                   />
                   <TextField
                     fullWidth
                     variant="filled"
                     type="text"
                     label="Address 1"
                     onBlur={handleBlur}
                     onChange={handleChange}
                     value={values.address_line1}
                     name="address_line1"
                     error={!!touched.address_line1 && !!errors.address_line1}
                     helperText={touched.address_line1 && errors.address_line1}
                     sx={{ gridColumn: "span 4" }}
                   />
                   <TextField
                     fullWidth
                     variant="filled"
                     type="text"
                     label="Address 2"
                     onBlur={handleBlur}
                     onChange={handleChange}
                     value={values.address_line2}
                     name="address2"
                     error={!!touched.address_line2 && !!errors.address_line2}
                     helperText={touched.address_line2 && errors.address_line2}
                     sx={{ gridColumn: "span 2" }}
                   />
                   <TextField
                     fullWidth
                     variant="filled"
                     type="text"
                     label="City"
                     onChange={handleChange}
                     value={values.city}
                     name="city"
                     sx={{ gridColumn: "span 2" }}
                   />
                   <TextField
                     fullWidth
                     variant="filled"
                     type="text"
                     label="State"
                     onChange={handleChange}
                     value={values.state}
                     name="state"
                     sx={{ gridColumn: "span 2" }}
                   />

                   <TextField
                     fullWidth
                     variant="filled"
                     type="text"
                     label="Country"
                     onChange={handleChange}
                     value={values.country}
                     name="country"
                     sx={{ gridColumn: "span 2" }}
                   />
                 </Box>
                 <Box display="flex" justifyContent="end" mt="20px">
                   <Button type="submit" color="secondary" variant="contained">
                     Update My Info
                   </Button>
                 </Box>
               </form>
             )}
           </Formik>
         </AccordionDetails>
       </Accordion>
     );
};

export default StudentProfileEditor;

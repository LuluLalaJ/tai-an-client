import { Typography } from '@mui/material'
import React from 'react'
import TextField from "@mui/material/TextField";

const EnrollmentDetail = ({enrollment}) => {
    const {
      comment,
      id,
      lesson_id,
      status,
      lesson: { start, end, title },
    } = enrollment;

    console.log(enrollment)

  return (
    <>
      <Typography>
        `Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
        consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel
        scelerisque nisl consectetur et.` `Cras mattis consectetur purus sit
        amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
        quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
        `Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
        consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel
        scelerisque nisl consectetur et.`
      </Typography>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Email Address"
        type="email"
        fullWidth
        variant="standard"
      />
    </>
  );
}

export default EnrollmentDetail

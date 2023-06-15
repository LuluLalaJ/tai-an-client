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
import { closeModal } from "../../redux/modalSlice";
import { useState } from "react";

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
  const { isOpen } = useSelector((store) => store.modal);

  const [level, setLevel] = useState('')
  const [capacity, setCapacity] = useState("");


  return (
    <div>
      <Modal
        open={isOpen}
        onClose={() => dispatch(closeModal())}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={null}>
          <Stack spacing={2}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Enter new lesson info:
            </Typography>
            <FormControl fullWidth>
              <TextField required id="title" label="Title" variant="outlined" />
            </FormControl>

            <FormControl fullWidth>
              <TextField
                required 
                id="outlined-multiline-flexible"
                label="Description"
                multiline
                rows={4}
                maxRows={6}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="level">Level</InputLabel>
              <Select
                labelId="level"
                id="level"
                value={level}
                label="Level"
                onChange={null}
                required
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
                value={capacity}
                label="Capacity"
                onChange={null}
                required
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
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="price"
                type="number"
              />
            </FormControl>
            <Button variant="contained" type="submit">Add lesson</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

// title = db.Column(db.String, nullable=False)
//     description = db.Column(db.String, nullable=False)
//     level = db.Column(db.Integer, nullable=False)
//     start = db.Column(db.DateTime, nullable=False)
//     end = db.Column(db.DateTime, nullable=False)
//     capacity = db.Column(db.Integer, nullable=False)
//     price = db.Column(db.Numeric(8, 2), default=0)

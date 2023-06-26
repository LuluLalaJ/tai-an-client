import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));


const LessonCreditHistory = ({ record }) => {
   const { created_at, memo, old_credit, new_credit } = record;

  return (
    <Grid container>
      <Grid item xs={3} md={2}>
        <Item>{created_at}</Item>
      </Grid>
      <Grid item xs={3} md={3}>
        <Item>New: $ {new_credit}</Item>
      </Grid>
      <Grid item xs={3} md={3}>
        <Item>Old: $ {old_credit}</Item>
      </Grid>
      <Grid item xs={3} md={4}>
        <Item>Memo: {memo}</Item>
      </Grid>
    </Grid>
  );
}

export default LessonCreditHistory

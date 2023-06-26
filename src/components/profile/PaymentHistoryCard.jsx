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

const PaymentHistoryCard = ({ payment }) => {
  const {created_at, lesson_credit} = payment

  return (
    <Grid container>
      <Grid item xs={6} md={4}>
        <Item>Purchased on: {created_at}</Item>
      </Grid>
      <Grid item xs={6} md={8}>
        <Item>Amount: $ {lesson_credit}</Item>
      </Grid>
    </Grid>
  );
};

export default PaymentHistoryCard;

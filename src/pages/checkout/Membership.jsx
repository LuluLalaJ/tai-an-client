import { Container } from "@mui/material";
import * as React from "react";

function Membership() {
  return (
    <Container>
      <stripe-buy-button
        buy-button-id="buy_btn_1NLQaBFn2n3otckJT4zDXvZa"
        publishable-key="pk_test_51NHzJrFn2n3otckJ7S4HIevoL8N7EMCvAe4VfJXBSn4CZbkDX64HhN8RGISqw48Suxf3OZAtOF9siK5iAGvU6YTy00sQvozT51"
      ></stripe-buy-button>
    </Container>
  );
}

export default Membership;

// AmountBox.jsx
import React from "react";
import { Box } from "@chakra-ui/react";

export default function AmountBox({ displayedAmt }) {
  return (
    <Box
      width="370px"
      height="370px"
      color=""
      display="flex"
      alignItems="center"
      fontSize="6xl"
      px="16"
    >
      ₹{displayedAmt}
    </Box>
  );
}

// ActionButtons.jsx
import React from "react";
import { Grid, GridItem, Button, Spacer } from "@chakra-ui/react";

export default function ActionButtons({
  handleIncrease,
  handleDecrease,
  isDecreaseDisabled,
}) {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
      <GridItem w="100%" h="10">
        <Button
          colorScheme="blue"
          variant="solid"
          px="50"
          onClick={handleIncrease}
        >
          +
        </Button>
      </GridItem>
      <Spacer />
      <GridItem w="100%" h="10">
        <Button
          colorScheme="blue"
          variant="solid"
          px="50"
          onClick={handleDecrease}
          isDisabled={isDecreaseDisabled}
        >
          -
        </Button>
      </GridItem>
    </Grid>
  );
}

import React from 'react'
import { ChakraProvider, Button, HStack } from "@chakra-ui/react";

function MenuSelection() {
    return (
        <ChakraProvider>
          <HStack spacing={4}>
          <Button colorScheme='teal' variant='outline'>Pay Loan Installments</Button>
          <Button colorScheme='teal' variant='outline'>Notice Generation</Button>
          </HStack>
        </ChakraProvider>
      );
}

export default MenuSelection
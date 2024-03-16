import React from 'react'
import { ChakraProvider, Button, HStack } from "@chakra-ui/react";

function MenuSelection() {
    return (
        <ChakraProvider>
          <HStack spacing={4}>
            <Button colorScheme="blue">Button 1</Button>
            <Button colorScheme="green">Button 2</Button>
          </HStack>
        </ChakraProvider>
      );
}

export default MenuSelection
import React from 'react'
import { ChakraProvider, Button, HStack } from "@chakra-ui/react";

function MenuSelection() {
    return (
          <HStack spacing={4}>
          <Button colorScheme='teal' variant='outline'>Pay Loan Installments</Button>
          <Button colorScheme='teal' variant='outline'>Notice Generation</Button>
          </HStack>
      );
}

export default MenuSelection

// <Box px="3">
// <SearchUser onSearch={handleSearchChange} />
// <DisplayTable users={data} search={search} />
// </Box>
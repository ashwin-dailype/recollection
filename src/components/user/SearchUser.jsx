import React, { useState } from "react";
import { Box, FormControl, Input } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

export default function SearchUser({ onSearch }) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    onSearch(searchTerm);
  };

  return (
    <Box py={8} maxW={800} mx="auto" textAlign="center">
      <FormControl display="inline-block">
        <Input
          variant={isFocused ? "flushed" : "outline"}
          placeholder="Search"
          size="lg"
          onChange={handleSearchChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          paddingLeft="3rem"
          maxW={800}
        />
        <Search2Icon
          position="absolute"
          left="1rem"
          top="50%"
          transform="translateY(-50%)"
          color="gray.300"
        />
      </FormControl>
    </Box>
  );
}

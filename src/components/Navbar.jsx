import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Box bg="#e0f4ff" p={4}>
      <Flex align="center" justify="center">
        {/* Use Link to navigate to the root route */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <Text fontSize="xl" fontWeight="bold" fontFamily="heading" cursor="pointer">
            DailyPe
          </Text>
        </Link>
      </Flex>
    </Box>
  );
};

export default Navbar;

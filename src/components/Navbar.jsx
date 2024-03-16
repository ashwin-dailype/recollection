import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Box bg="#e0f4ff" p={4}>
      <Flex align="center" justify="center">
        <Link to="/" style={{ textDecoration: "none" }}>
          <Text fontSize="xl" fontWeight="bold" fontFamily="navBarHeading" cursor="pointer">
            DailyPe
          </Text>
        </Link>
      </Flex>
    </Box>
  );
};

export default Navbar;

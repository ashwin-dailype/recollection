import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Flex,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Button,
  Input,
} from "@chakra-ui/react";
import AgentService from "../../services/Agent";

export default function GetTokenInput() {
  const [authToken, setAuthToken] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setAuthToken(e.target.value);
    // Reset error when input changes
    setError(null);
  };

  const sendInput = async () => {
    setLoading(true);
    const API = import.meta.env.VITE_FETCH_DATA_API;
    const query_type = "all_user_loan_collection_details";

    const result = await AgentService.checkToken(API, authToken, query_type);
    
    if (result[0]) {
      setLoading(false);
      setError(null);
      AgentService.storeToken(authToken);
      window.location.reload();
    } else {
      setError("Wrong authorization token");
      setLoading(false);
    }
  };

  return (
    <Flex align="center" justify="center" height="100vh">
    <Card maxW="md" mx='2' boxShadow="lg" border="2px" borderColor="blue.500">
    <CardHeader>
        <Heading size="md">Enter your Authorization Token</Heading>
      </CardHeader>
      <CardBody>
        <FormControl>
          {error && <FormLabel htmlFor="authToken" colorScheme="red" color="red.500">{error}</FormLabel>}
          <Input
            id="authToken"
            placeholder="Enter your token"
            onChange={handleChange}
          />
        </FormControl>
      </CardBody>
      <CardFooter>
        <Button colorScheme="blue" disabled={loading} onClick={sendInput} width="100%">
          {loading ? "Loading..." : "Send"}
        </Button>
      </CardFooter>
    </Card>
    </Flex>
  );
}

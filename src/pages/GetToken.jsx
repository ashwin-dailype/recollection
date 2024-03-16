import React, { useEffect, useState } from "react";
import { Box, Button, Stack, useBreakpointValue } from "@chakra-ui/react";
import GetTokenInput from "../components/user/GetTokenInput";
import AgentService from "../services/Agent";
import SearchUser from "../components/user/SearchUser";
import DisplayTable from "../components/user/DisplayTable";

export default function GetToken() {
  const [token, setToken] = useState(null);
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [buttonAction, setButtonAction] = useState("");

  const API = import.meta.env.VITE_FETCH_DATA_API;
  const query_params = { query_type: "all_user_loan_collection_details" };

  const handleSearchChange = (searchTerm) => {
    setSearch(searchTerm);
  };

  useEffect(() => {
    const checkToken = async (tokenToCheck) => {
      try {
        const check = await AgentService.checkToken(
          API,
          tokenToCheck,
          query_params
        );
        setToken(check[0]);
        setData(check[1]);
      } catch (error) {
        console.error("Error checking token:", error);
      }
    };

    const storedToken = AgentService.getToken();
    if (storedToken) {
      checkToken(storedToken);
    }
  }, [API, query_params]);

  const handleLoanButtonClick = () => {
    setShowTable(true);
    setButtonAction("loan");
  };

  const handleNoticeButtonClick = () => {
    setShowTable(true);
    setButtonAction("notice");
  };

  const isDesktop = useBreakpointValue({ base: false, lg: true });

  return (
    <>
      {token ? (
        <Box px="3" display="flex" justifyContent="center" alignItems="center" height="100vh">
          {!showTable && (
            <Stack direction={isDesktop ? "row" : "column"} spacing={4}>
              <Button onClick={handleLoanButtonClick} colorScheme="orange" size="lg" fontSize={isDesktop ? "3xl" : "2xl"} height={isDesktop ? "16" : "14"} width={isDesktop ? "40" : "32"}>
                Loan
              </Button>
              <Button onClick={handleNoticeButtonClick} colorScheme="orange" size="lg" fontSize={isDesktop ? "3xl" : "2xl"} height={isDesktop ? "16" : "14"} width={isDesktop ? "40" : "32"}>
                Notice
              </Button>
            </Stack>
          )}
          {showTable && (
            <DisplayTable users={data} search={search} buttonAction={buttonAction} />
          )}
        </Box>
      ) : (
        <GetTokenInput />
      )}
    </>
  );
}

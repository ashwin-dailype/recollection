import React, { useEffect, useState } from "react";
import { Box, Button, Stack } from "@chakra-ui/react";
import GetTokenInput from "../components/user/GetTokenInput";
import AgentService from "../services/Agent";
import SearchUser from "../components/user/SearchUser";
import DisplayTable from "../components/user/DisplayTable";

export default function GetToken() {
  const [token, setToken] = useState(null);
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [buttonAction, setButtonAction] = useState(""); // New state to track which button is clicked

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
    // Show the table and set button action to "loan" when Loan button is clicked
    setShowTable(true);
    setButtonAction("loan");
  };

  const handleNoticeButtonClick = () => {
    // Set button action to "notice" when Notice button is clicked
    setButtonAction("notice");
  };

  return (
    <>
      {token ? (
        <box>
        <Box px="3" pt="150" display="flex" justifyContent="center" alignItems="center">
          {!showTable && ( // Render buttons if table is not shown
            <>
            <Stack direction={isDesktop ? "row" : "column"} spacing={4}>
              <Button onClick={handleLoanButtonClick} size="lg" fontSize="3xl" height="16" width="40">
                Loan
              </Button>
              <Button onClick={handleNoticeButtonClick} size="lg" fontSize="3xl" height="16" width="40">
                Notice
              </Button>
            </Stack>
            </>
          )}

        </Box>
          {showTable && (
            <DisplayTable users={data} search={search} buttonAction={buttonAction} />
          )}
        </box>

      ) : (
        <GetTokenInput />
      )}
    </>
  );
}
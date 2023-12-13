import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import GetTokenInput from "../components/user/GetTokenInput";
import AgentService from "../services/Agent";
import SearchUser from "../components/user/SearchUser";
import DisplayTable from "../components/user/DisplayTable";

export default function GetToken() {
  const [token, setToken] = useState(null);
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");

  const API = import.meta.env.VITE_FETCH_DATA_API;
  const query_params = {query_type: "all_user_loan_collection_details"};

  const handleSearchChange = (searchTerm) => {
    setSearch(searchTerm);
  };

  useEffect(() => {
    const checkToken = async (tokenToCheck) => {
      try {
        const check = await AgentService.checkToken(
          API,
          tokenToCheck,
          query_params,
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

  return (
    <>
      {token ? (
        <Box px="3">
          <SearchUser onSearch={handleSearchChange} />
          <DisplayTable users={data} search={search} />
        </Box>
      ) : (
        <GetTokenInput />
      )}
    </>
  );
}

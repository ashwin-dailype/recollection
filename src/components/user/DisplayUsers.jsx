import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import DisplayTable from "./DisplayTable";
import SearchUser from "./SearchUser";
import useFetchData from "../../services/FetchData";

export default function DisplayUsers() {
  const [search, setSearch] = useState("");
  const users = useFetchData();

  const handleSearchChange = (searchTerm) => {
    setSearch(searchTerm);
  };

  return (
    <Box px="3">
      <SearchUser onSearch={handleSearchChange} />
      <DisplayTable users={users} search={search} />
    </Box>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";

export default function DisplayTable({ users, search, buttonAction }) {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");

  const handleSortingChange = (field) => {
    const sortOrder = field === sortField && order === "asc" ? "desc" : "asc";
    setSortField(field);
    setOrder(sortOrder);
  };

  const sortedUsers = [...users].sort((a, b) => {
    const comparison = order === "asc" ? 1 : -1;

    const aStatus =
      sortField === "total_amount_pending"
        ? Number(a[sortField])
        : String(a[sortField] || "");
    const bStatus =
      sortField === "total_amount_pending"
        ? Number(b[sortField])
        : String(b[sortField] || "");

    if (isNaN(aStatus) || isNaN(bStatus)) {
      return aStatus.localeCompare(bStatus) * comparison;
    }

    return (aStatus - bStatus) * comparison;
  });

  const searchTerm = search.toLowerCase().trim();
  const searchWords = searchTerm.split(" ");

  const filteredUsers = sortedUsers.filter((user) => {
    const fname = user.fname?.toLowerCase() || "";
    const mname = user.mname?.toLowerCase() || "";
    const lname = user.lname?.toLowerCase() || "";
    const loanAccNum = user.loan_acc_num?.toLowerCase() || "";

    return searchWords.every((word) => {
      return (
        fname.includes(word) ||
        mname.includes(word) ||
        lname.includes(word) ||
        loanAccNum.includes(word)
      );
    });
  });

  const handleClick = (user) => {
    if (buttonAction === "loan") {
      redirectToPaymentPage(user);
    } else if (buttonAction === "notice") {
      // Implement logic for Notice button if needed
      console.log("Generate notice logic goes here");
    }
  };

  const redirectToPaymentPage = (user) => {
    const { user_id, loan_id, single_installment_amt } = user;
    navigate(`/payment/${user_id}/${loan_id}/${single_installment_amt}`);
  };

  return (
    <TableContainer css="padding: 60; max-width: 800px;" mx="auto">
      <style jsx>{`
        .custom-table tr:nth-child(odd) {
          background-color: #3081d0;
        }

        .custom-table tr:nth-child(even) {
          background-color: #aedefc;
        }

        .sort-icon {
          margin-left: 0.5rem;
        }

        .truncate-cell {
          max-width: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      `}</style>
      <Table variant="striped" className="custom-table" size="sm">
        <Thead>
          <Tr>
            <Th onClick={() => handleSortingChange("fname")}>
              Borrower{" "}
              {sortField === "fname" && (
                <Icon
                  as={order === "asc" ? ArrowUpIcon : ArrowDownIcon}
                  className="sort-icon"
                />
              )}
            </Th>
            <Th onClick={() => handleSortingChange("total_amount_pending")}>
              Amount{" "}
              {sortField === "total_amount_pending" && (
                <Icon
                  as={order === "asc" ? ArrowUpIcon : ArrowDownIcon}
                  className="sort-icon"
                />
              )}
            </Th>
            <Th textAlign="center">{buttonAction === "loan" ? "Pay" : "Generate"}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredUsers.map((user) => {
            const {
              user_id,
              loan_id,
              total_amount_pending,
              single_installment_amt,
              fname,
              mname,
              lname,
            } = user;
            const borrowerName = `${fname} ${mname ? mname + " " : ""}${
              lname || ""
            }`;

            return (
              <Tr key={loan_id} textAlign="center">
                <Td className="truncate-cell">{borrowerName}</Td>
                <Td>{total_amount_pending}</Td>
                <Td textAlign="center">
                  <Button
                    colorScheme={buttonAction === "loan" ? "orange" : "teal"}
                    px="7"
                    onClick={() => handleClick(user)}
                  >
                    {buttonAction === "loan" ? "Pay" : "Generate"}
                  </Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
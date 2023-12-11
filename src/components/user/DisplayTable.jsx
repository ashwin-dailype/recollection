import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

export default function DisplayTable({ users, search }) {
  const navigate = useNavigate(); // Import useNavigate instead of useHistory

  const filteredUsers = users.filter(
    (user) =>
      user.fname.toLowerCase().includes(search.toLowerCase()) ||
      user.lname.toLowerCase().includes(search.toLowerCase()) ||
      user.loan_acc_num.toLowerCase().includes(search.toLowerCase())
  );

  const redirectToPaymentPage = (user) => {
    const { user_id, loan_id, single_installment_amt, fname, mname, lname } =
      user;
    const borrowerName = `${fname} ${mname ? mname + " " : ""}${lname || ""}`;

    // Redirect to the payment page with user_id, loan_id, and loan_installment_amt
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
            <Th>Borrower</Th>
            <Th>Amount</Th>
            <Th textAlign="center">Payment</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredUsers.map((user) => {
            const {
              user_id,
              loan_id,
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
                <Td>{single_installment_amt}</Td>
                <Td textAlign="center">
                  <Button
                    colorScheme="orange"
                    px="7"
                    onClick={() => redirectToPaymentPage(user)}
                  >
                    Pay
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

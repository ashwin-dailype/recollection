// PaymentCard.jsx
import React, { useState } from "react";
import {
  Box,
  Flex,
  Card,
  CardBody,
  CardFooter,
  Button,
  Text,
} from "@chakra-ui/react";

import AmountBox from "./AmountBox";
import ActionButtons from "./ActionButtons";
import AgentService from "../../services/Agent";

export default function PaymentCard({
  user_id,
  loan_id,
  loan_installment_amt,
}) {
  const initialAmt = Number(loan_installment_amt);
  const [displayedAmt, setDisplayedAmt] = useState(initialAmt);
  const [qrCode, setQrCode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleIncrease = () => {
    setDisplayedAmt(displayedAmt + initialAmt);
  };

  const handleDecrease = () => {
    const newAmt = displayedAmt - initialAmt;
    setDisplayedAmt(Math.max(newAmt, initialAmt));
  };

  const handleGenerateQR = async () => {
    try {
      const storedToken = AgentService.getToken();

      if (!storedToken) {
        console.error("Authorization token not found.");
        return;
      }

      setIsLoading(true);

      const API = import.meta.env.VITE_GENERATE_QR;
      const query_params = {
        user_id: user_id,
        loan_id: loan_id,
        amount: Number(displayedAmt),
      };

      const result = await AgentService.checkToken(
        API,
        storedToken,
        query_params
      );
      if (result[0]) {
        setIsLoading(false);
        setQrCode(result[1]?.dynamic_qr);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error generating QR code:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex align="center" justify="center" height="100vh">
      <Card maxW="sm" boxShadow="lg" border="2px" borderColor="blue.500">
        <CardBody>
          {qrCode ? (
            <>
              <Box
                w="100%"
                h="350px"
                bg={`url(data:image/png;base64,${qrCode})`}
                backgroundSize="cover"
                backgroundPosition="center"
              />
              <Text textAlign="center" mt="4" fontSize="2xl" pb="3">
                Pay ₹{displayedAmt}
              </Text>
            </>
          ) : (
            <AmountBox displayedAmt={displayedAmt} />
          )}
          <ActionButtons
            handleIncrease={handleIncrease}
            handleDecrease={handleDecrease}
            isDecreaseDisabled={displayedAmt === initialAmt}
          />
        </CardBody>
        <CardFooter>
          <Button
            variant="solid"
            colorScheme="blue"
            width="100%"
            onClick={handleGenerateQR}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Generate QR"}
          </Button>
        </CardFooter>
      </Card>
    </Flex>
  );
}

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
      const storedToken = localStorage.getItem("authorizationToken");

      if (!storedToken) {
        console.error("Authorization token not found.");
        return;
      }

      // Set loading state to true
      setIsLoading(true);

      const response = await fetch(
        import.meta.env.VITE_GENERATE_QR,
        {
          method: "POST",
          headers: {
            Authorization: storedToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user_id,
            loan_id: loan_id,
            amount: Number(displayedAmt),
          }),
        }
      );

      const result = await response.json();

      if (result && result.response && result.response.dynamic_qr) {
        setQrCode(result.response.dynamic_qr);
      } else {
        console.error("Dynamic QR code not found in API response.");
      }
    } catch (error) {
      console.error("Error generating QR code:", error.message);
    } finally {
      // Set loading state back to false after handling response
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
                h="350px" // Set the height as per your requirement
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
            disabled={isLoading} // Disable the button while loading
          >
            {isLoading ? "Loading..." : "Generate QR"}
          </Button>
        </CardFooter>
      </Card>
    </Flex>
  );
}

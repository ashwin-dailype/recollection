// MakePayments.jsx
import React from "react";
import { useParams } from "react-router-dom";
import PaymentCard from "../components/payment/PaymentCard";

export default function MakePayments() {
  const { user_id, loan_id, loan_installment_amt } = useParams();

  return (
    <div>
      <PaymentCard
        user_id={user_id}
        loan_id={loan_id}
        loan_installment_amt={loan_installment_amt}
      />
    </div>
  );
}

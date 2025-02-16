import React from "react";
import axios from "axios";

const PaymentButton = () => {
  const handlePayment = async () => {
    const { data } = await axios.post("http://localhost:8000/api/payment/create-order", {
      amount: 1,
      currency: "INR",
    });

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "Your Company",
      description: "Job Letter Subscription",
      order_id: data.id,
      handler: async (response) => {
        await axios.post("http://localhost:5000/api/payment/verify-payment", response);
        alert("Payment Successful: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "Abhay Pawar",
        email: "abhay@example.com",
        contact: "9999999999",
      },
      theme: { color: "#3399cc" },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  return <button onClick={handlePayment}>Pay Now</button>;
};

export default PaymentButton;

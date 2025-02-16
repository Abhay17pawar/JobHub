const Razorpay = require("razorpay");
require("dotenv").config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const options = {
      amount: amount * 100, 
      currency,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Verify Payment
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    res.json({
      success: true,
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,
      signature: razorpay_signature,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createOrder, verifyPayment };

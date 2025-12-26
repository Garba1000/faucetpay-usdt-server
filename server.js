// server.js
const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

// FaucetPay API key from environment variable
const API_KEY = process.env.FAUCETPAY_KEY;

app.post("/withdraw", async (req, res) => {
  const { email, amount } = req.body;

  if (!email || !amount) {
    return res.json({ success: false, message: "Missing parameters" });
  }

  try {
    const fpResponse = await axios.post(
      "https://faucetpay.io/api/v1/send",
      {
        api_key: API_KEY,
        amount: amount,
        to: email,
        currency: "USDT"  // <- Changed to USDT
      }
    );

    return res.json(fpResponse.data);

  } catch (err) {
    return res.json({
      success: false,
      error: err.message,
      data: err.response ? err.response.data : null
    });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));

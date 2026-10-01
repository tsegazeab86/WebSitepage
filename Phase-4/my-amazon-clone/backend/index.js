require("dotenv").config(); // .env ፋይል እንዲነብ አድርግ
const express = require("express");
const cors = require("cors");

// Stripe Secret Key መኖሩን ማረጋገጥ
if (!process.env.STRIPE_SECRET_KEY) {
  console.error("❌ ERROR: STRIPE_SECRET_KEY is missing in .env file!");
}

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

// CORS Config: React ከሚነሳበት Port ጥያቄዎችን እንዲቀበል
app.use(cors({ origin: true }));
app.use(express.json());

// Server መስራቱን ለማረጋገጥ Test Route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Amazon Backend Server is running successfully!" });
});

// Payment Intent የመፍጠሪያ Route
app.post("/payments/create", async (req, res) => {
  try {
    // query ወይም body ላይ የሚመጣውን total መቀበል
    const rawTotal = req.query.total || req.body.total;
    const total = Math.round(Number(rawTotal)); // Float ወደ Integer ለመቀየር

    console.log("Received Total Amount (in cents):", total);

    // total ቁጥር መሆኑንና ከ 0 በላይ መሆኑን ማረጋገጥ
    if (!total || isNaN(total) || total <= 0) {
      return res.status(400).json({
        message: "Total amount must be a valid number greater than 0",
        received: rawTotal,
      });
    }

    // በ Stripe PaymentIntent መፍጠር
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // amount is in cents (e.g., $10.00 = 1000)
      currency: "usd",
    });

    // clientSecret ለአንደምንጭ ለ React መመለስ
    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });

  } catch (error) {
    console.error("❌ Stripe Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Port ማስተካከያ (PORT environment variable ካለ ወይም 5000)
const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  if (err) {
    console.error("Server start error:", err);
  } else {
    console.log(`🚀 Amazon Server running on PORT: ${PORT}`);
  }
});
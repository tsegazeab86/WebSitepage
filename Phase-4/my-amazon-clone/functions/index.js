const path = require("path");
require("dotenv").config({path: path.resolve(__dirname, ".env")});

const {setGlobalOptions} = require("firebase-functions/v2");
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");

const stripeKey = process.env.STRIPE_KEY;

if (!stripeKey) {
  logger.error("❌ ERROR: STRIPE_KEY በ .env ፋይል ውስጥ አልተገኘም!");
}

const stripe = require("stripe")(stripeKey);

const app = express();
app.use(cors({origin: true}));
app.use(express.json());

// ... (የቀሩት routes)
// 🟢 1. GET Test Route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success! Express & Firebase Function running.",
  });
});

// 🟢 2. POST Payment Intent Route
app.post("/payments/create", async (req, res) => {
  // Query Parameter ወይም Body ከሁለቱም ይቀበላል
  const total = parseInt(req.query.total || req.body.total, 10);

  if (total && total > 0) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(total),
        currency: "usd",
      });

      res.status(201).send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      logger.error("Stripe Error:", error);
      res.status(500).send({error: error.message});
    }
  } else {
    res.status(400).send({message: "Total amount must be greater than 0"});
  }
});

setGlobalOptions({maxInstances: 10});

// 🟢 Firebase Express app-ን Export ያደርጋል
exports.api = onRequest(app);

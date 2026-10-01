import React, { useContext, useState } from "react";
import axios from "../../../Api/axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { DataContext } from "../../../DataContext/DataContext";
import Layout from "../Layout/Layout";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Type } from "../../../Utility/action.type";
// 🟢 Firebase v9/v10 Modular imports
import { db } from "../../../Utility/firebase";
import { doc, setDoc } from "firebase/firestore";
import "./Payment.css";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  // Total quantity and total price
  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0) || 0;
  const total = basket?.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  ) || 0;

  const handleChange = (e) => {
    setCardError(e?.error ? e.error.message : "");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    if (total <= 0) {
      setCardError("Your basket is empty.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setCardError("Card input element is not mounted. Please refresh.");
      return;
    }

    try {
      setProcessing(true);
      setCardError(null);

      // 1. Get Client Secret from backend Express app
      const amountInCents = Math.round(total * 100);
      const response = await axios.post(`/payments/create?total=${amountInCents}`);
      const clientSecret = response.data?.clientSecret;

      if (!clientSecret) {
        throw new Error("Client secret missing from backend response.");
      }

      // 2. Confirm payment with Stripe
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (error) {
        setCardError(error.message);
        setProcessing(false);
        return;
      }

      // 🟢 3. SAVE ORDER TO FIRESTORE (Firebase v9 Modular Syntax)
      if (user?.uid) {
        const orderRef = doc(db, "users", user.uid, "orders", paymentIntent.id);

        await setDoc(orderRef, {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
      }

      // 4. Empty Basket and redirect to Orders page
      dispatch({ type: Type.EMPTY_BASKET });
      setProcessing(false);
      navigate("/orders", { state: { msg: "You have placed a new order" } });

    } catch (error) {
      console.log("Payment Process Failed:", error);
      setCardError(
        error?.response?.data?.message || error?.message || "Payment process failed."
      );
      setProcessing(false);
    }
  };

  return (
    <Layout>
      <div className="payment">
        <div className="payment__header">Checkout ({totalItem} items)</div>

        <section className="payment__container">
          {/* Delivery Address */}
          <div className="flex">
            <h3>Delivery Address</h3>
            <div>
              <div>{user?.email || "Guest User"}</div>
              <div>123 Main Street</div>
            </div>
          </div>
          <hr />

          {/* Product Review */}
          <div className="flex">
            <h3>Review items and delivery</h3>
            <div>
              {basket?.map((item, index) => (
                <div key={item.id || index} style={{ display: "flex", gap: "15px", marginBottom: "12px" }}>
                  <img src={item.image} alt={item.title} style={{ width: "80px", height: "80px", objectFit: "contain" }} />
                  <div>
                    <h4 style={{ margin: "0 0 5px 0" }}>{item.title}</h4>
                    <p style={{ margin: "0" }}>Price: ${item.price}</p>
                    <p style={{ margin: "0" }}>Quantity: {item.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <hr />

          {/* Payment Method */}
          <div className="flex">
            <h3>Payment Method</h3>
            <div className="payment__details">
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red", display: "block", marginBottom: "10px" }}>
                    {cardError}
                  </small>
                )}

                <CardElement onChange={handleChange} />

                <div className="payment__priceContainer" style={{ marginTop: "15px" }}>
                  <div>
                    <span>
                      Total Order | <strong>${total.toFixed(2)}</strong>
                    </span>
                  </div>

                  <button type="submit" disabled={processing || !stripe || total <= 0}>
                    {processing ? (
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                        <ClipLoader color="gray" size={14} />
                        <span>Please Wait...</span>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default Payment;
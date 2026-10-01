import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "./Utility/stripe"; // ወይም export default ከሆነ: import stripePromise from "./Utility/stripe";
import { DataContext } from "./DataContext/DataContext";
// Page Components
import Landing from "./assets/Components/Landing/Landing";
import Auth from "./assets/Components/Auth/Auth";
import Cart from "./assets/Components/Cart/Cart";
import Orders from "./assets/Components/Orders/Orders";
import Payment from "./assets/Components/Payment/Payment";
import ProductDetail from "./assets/Components/ProductDetail/ProductDetail";
import Results from "./assets/Components/Results/Results";


// 🛡️ Protected Route Component
const ProtectedRoute = ({ children, redirectMsg }) => {
  const [{ user }] = useContext(DataContext);

  if (!user) {
    return (
      <Navigate
        to="/auth"
        state={{ msg: redirectMsg, redirect: window.location.pathname }}
        replace
      />
    );
  }

  return children;
};

function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/category/:categoryName" element={<Results />} />

        {/* 🔒 Protected Payments Route */}
        <Route
          path="/payments"
          element={
            <ProtectedRoute redirectMsg="You must log in to pay">
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />

        {/* 🔒 Protected Orders Route */}
        <Route
          path="/orders"
          element={
            <ProtectedRoute redirectMsg="You must log in to view your orders">
              <Orders />
            </ProtectedRoute>
          }
        />

        {/* 404 Route */}
        <Route path="*" element={<div style={{ padding: "50px", textAlign: "center" }}>Page Not Found (404)</div>} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
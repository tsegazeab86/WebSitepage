import React, { useEffect, useState, useContext } from "react";
import Layout from "../Layout/Layout";
import { db } from "../../../Utility/firebase";
// 🟢 Firebase v9 Modular functions
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { DataContext } from "../../../DataContext/DataContext";
import "./Orders.css";

function Orders() {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user?.uid) {
      // 🟢 Firebase v9 syntax: query እና onSnapshot በመጠቀም orders ማምጣት
      const ordersRef = collection(db, "users", user.uid, "orders");
      const q = query(ordersRef, orderBy("created", "desc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });

      return () => unsubscribe();
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <Layout>
      <section className="orders__container">
        <h2>Your Orders</h2>

        {orders?.length === 0 ? (
          <div className="orders__empty">
            <p>You have no orders yet.</p>
          </div>
        ) : (
          <div className="orders__list">
            {orders?.map((order) => (
              <div key={order.id} className="order__card">
                <div className="order__header">
                  <h3>Order Details</h3>
                  <p className="order__id">
                    <strong>Order ID:</strong> {order.id}
                  </p>
                  <p className="order__date">
                    <small>
                      {new Date(order.data.created * 1000).toLocaleString()}
                    </small>
                  </p>
                </div>

                {/* የዕቃዎች ዝርዝር */}
                <div className="order__items">
                  {order.data.basket?.map((item, index) => (
                    <div key={item.id || index} className="order__item">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="order__image"
                      />
                      <div className="order__itemDetails">
                        <h4>{item.title}</h4>
                        <p>Price: ${item.price?.toFixed(2)}</p>
                        <p>Quantity: {item.amount}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* አጠቃላይ ክፍያ */}
                <div className="order__total">
                  <h4>
                    Order Total: ${(order.data.amount / 100)?.toFixed(2)}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Orders;
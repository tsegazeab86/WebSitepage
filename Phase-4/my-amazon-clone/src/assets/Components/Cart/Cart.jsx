import React, { useContext } from 'react';
import Header from '../Header/Header';
import LowerHeader from '../Header/LowerHeader';
import CurrencyFormat from '../../../Utility/CurrencyFormat';
import { Link } from 'react-router-dom';
import { DataContext } from '../../../DataContext/DataContext';
import { Type } from '../../../Utility/action.type';
import './Cart.css';

function Cart() {
  // 1. DataContext ን በመጠቀም basket እና dispatch ን እንወስዳለን
  const [{ basket, user }, dispatch] = useContext(DataContext);

  // 2. አጠቃላይ የዕቃዎቹን ዋጋ ማስላት
  const total = basket?.reduce((amount, item) => item.price * item.amount + amount, 0);

  // 3. አጠቃላይ የዕቃዎቹን ብዛት (Total Quantity) ማስላት
  const totalItemCount = basket?.reduce((amount, item) => item.amount + amount, 0);

  // 4. Quantity ለመጨመር (+)
  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: item,
    });
  };

  // 5. Quantity ለመቀነስ (-)
  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id: id,
    });
  };

  return (
    <div>
      <Header />
      <LowerHeader />

      <section className="container">
        <div className="cart__container">
          <h2>Hello, {user ? user.email?.split('@')[0] : 'Guest'}</h2>
          <h3>Your shopping basket</h3>
          <hr />

          {basket?.length === 0 ? (
            <p>sorry No item in your cart</p>
          ) : (
            basket?.map((item) => (
              <section key={item.id} className="cart__product">
                {/*  የምስል መቀበያ (item.image ወይም item.img ቢሆን እንዲሰራ) */}
                <img src={item.image || item.img} alt={item.title} />
                
                <div className="cart__productDetails">
                  <p className="cart__title">{item.title}</p>
                  <p className="cart__price">
                    <CurrencyFormat amount={item.price} />
                  </p>
                  
                  {/*  የ (+) እና (-) አዝራሮች ከ onClick ጋር */}
                  <div className="btn__container">
                    <button className="btn" onClick={() => increment(item)}>
                      +
                    </button>
                    <span>{item.amount}</span>
                    <button className="btn" onClick={() => decrement(item.id)}>
                      -
                    </button>
                  </div>
                </div>
              </section>
            ))
          )}
        </div>

        {/* Subtotal Checkout Box */}
        {basket?.length !== 0 && (
          <div className="subtotal">
            <div>
              <p>Subtotal ({totalItemCount} items): </p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" /> <small>This order contains a gift</small>
            </span>
            <Link to="/payments">continue to checkout</Link>
          </div>
        )}
      </section>
    </div>
  );
}

export default Cart;
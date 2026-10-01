import React, { useEffect, useState, useContext } from 'react'; // 🟢 useContext ጨምረናል
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Header from '../Header/Header';
import LowerHeader from '../Header/LowerHeader';
import CurrencyFormat from '../../../Utility/CurrencyFormat';
import Loader from '../Loader/Loader';
import { DataContext } from '../../../DataContext/DataContext'; // 🟢 DataContext አስገብተናል
import { Type } from '../../../Utility/action.type'; // 🟢 Action type አስገብተናል
import './ProductDetail.css';

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🟢 1. Context API State እና Dispatch መውሰድ
  const [state, dispatch] = useContext(DataContext);

  useEffect(() => {
    setLoading(true);

    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product details:", err);
        setProduct(null);
        setLoading(false);
      });
  }, [productId]);

  // 🟢 2. Add to Cart የሚሰራበት Function
  const addToCart = () => {
    if (product) {
      dispatch({
        type: Type.ADD_TO_BASKET,
        item: {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          rating: product.rating,
          description: product.description,
        },
      });
    }
  };

  return (
    <div>
      <Header />
      <LowerHeader />

      {loading ? (
        <Loader />
      ) : !product ? (
        <div className="notFound" style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Product not found!</h2>
        </div>
      ) : (
        <section className="productDetail__container">
          {/* Left Side: Product Image */}
          <div className="productDetail__img">
            <img src={product.image} alt={product.title} />
          </div>

          {/* Right Side: Product Info */}
          <div className="productDetail__info">
            <h2>{product.title}</h2>

            <div className="productDetail__rating">
              <Rating value={product.rating?.rate || 0} precision={0.5} readOnly />
              <small>({product.rating?.count || 0} reviews)</small>
            </div>

            <hr />

            <div className="productDetail__price">
              <p>Price:</p>
              <span className="price__amount">
                <CurrencyFormat amount={product.price} />
              </span>
            </div>

            <div className="productDetail__description">
              <h5>About this item:</h5>
              <p>{product.description}</p>
            </div>

            {/* 🟢 3. onClick={addToCart} ተጨምሯል */}
            <button className="productDetail__button" onClick={addToCart}>
              Add to Cart
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductDetail;
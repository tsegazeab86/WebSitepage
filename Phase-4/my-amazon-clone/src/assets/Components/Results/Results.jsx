import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import LowerHeader from '../Header/LowerHeader';
import ProductCard from '../Product/ProductCard';
import './Results.css';

function Results() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { categoryName } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    // FakeStore API ጥሪ
    fetch(`https://fakestoreapi.com/products/category/${categoryName}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setResults(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching category results:', err);
        setError('Failed to fetch products. Please check your internet connection.');
        setIsLoading(false);
      });
  }, [categoryName]);

  return (
    <div>
      <Header></Header>
      <LowerHeader></LowerHeader>

      <section className="results__container">
        <h1>Results</h1>
        <p>Category / {categoryName}</p>
        <hr />

        {isLoading ? (
          <div className="results__loading">Loading...</div>
        ) : error ? (
          <div className="results__error">{error}</div>
        ) : (
          <div className="products_container">
            {results?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Results; 
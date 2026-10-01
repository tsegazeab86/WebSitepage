import React from 'react';
import Layout from '../Layout/Layout';
import CarouselEffect from '../Carousel/Carousel';
import Category from '../Category/Category';
import Product from '../Product/Product';

function Landing() {
  return (
    <Layout>
      <CarouselEffect />
      <Category />
      <Product />
    </Layout>
  );
}

export default Landing;
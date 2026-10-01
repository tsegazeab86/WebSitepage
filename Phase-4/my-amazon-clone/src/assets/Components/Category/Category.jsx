import React from 'react';
import { categoryInfos } from './categoryFullInfos';
import CategoryCard from './CategoryCard';
import './category.css';

function Category() {
  return (
    <section className="category__container">
      {categoryInfos.map((infos, index) => (
        <CategoryCard key={index} data={infos} />
      ))}
    </section>
  );
}

export default Category;
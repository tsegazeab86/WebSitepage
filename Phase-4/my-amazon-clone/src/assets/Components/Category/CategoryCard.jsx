import React from 'react';
import './category.css';
import { Link } from 'react-router-dom';
function CategoryCard({ data }) {
  return (
<Link to={`/category/${data.name}`}>
  <div className="category">
    <h2>{data.title}</h2>
    <img src={data.imgLink} alt={data.title} />
    <p>Shop now</p>
  </div>
</Link>
 
  );
}

export default CategoryCard;
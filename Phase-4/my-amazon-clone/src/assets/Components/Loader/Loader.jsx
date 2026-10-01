import React from 'react';
// Import ስታደርግ FadeLoader ን በ curly braces {} ውስጥ አድርገው
import { FadeLoader } from 'react-spinners';
import './Loader.css';

function Loader() {
  return (
    <div className="loader__container">
      <FadeLoader color="#01ffaa" />
    </div>
  );
}

export default Loader;
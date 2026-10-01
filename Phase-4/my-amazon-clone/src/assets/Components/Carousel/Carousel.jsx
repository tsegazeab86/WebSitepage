import React from "react";
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.css"; 
import { img } from "./img/data";
import "./Carousel.css";

function CarouselEffect() {
  return (
    <div>
      <ResponsiveCarousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
        interval={2000}
        transitionTime={300}    
      >
        {img.map((imageItemLink, index) => {
          return <img key={index} src={imageItemLink} alt={`banner-${index}`} />;
        })}
      </ResponsiveCarousel>

      {/* ከታች ካሉት Product Cards ጋር አምሮ እንዲዋሃድ የሚያደርገው የ Amazon Gradient Shadow */}
      <div className="hero__img"></div>
    </div>
  );
}

export default CarouselEffect;
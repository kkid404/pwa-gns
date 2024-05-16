import React from "react";
interface ImageSliderDataType {
  images: string[];
}

export default function ImageSlider({ images }: ImageSliderDataType) {
  return (
    <div className="slider app-width">
      <img className="slider-image" src={images[0]} alt=""></img>
      <img className="slider-image" src={images[1]} alt=""></img>
      <img className="slider-image" src={images[2]} alt=""></img>
      <img className="slider-image" src={images[3]} alt=""></img>
    </div>
  );
}

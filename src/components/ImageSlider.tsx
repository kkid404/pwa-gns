import LazyPreloadImage from "./LazyPreloadImage";

interface ImageSliderDataType {
  images: string[];
}

export default function ImageSlider({ images }: ImageSliderDataType) {
  return (
    <div className="slider app-width">
      {images.map((src, index) => (
        <LazyPreloadImage key={index} src={src} alt={`Image ${index + 1}`} />
      ))}
    </div>
  );
}

import LazyPreloadImage from "./LazyPreloadImage";

interface ImageSliderDataType {
  video: string;
  images: string[];
}

export default function ImageSlider({ video, images }: ImageSliderDataType) {
  const regex = /^(https:\/\/www\.youtube\.com|https:\/\/youtu\.be\/)/;

  // Ютуб разрешает только видео для встраивания, не забыть
  return (
    <div className="slider app-width">
      {video && regex.test(video) ? (
        <iframe
          height="204"
          src={video}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="slider-video"
        ></iframe>
      ) : (
        ""
      )}
      {images.map((src, index) => (
        <LazyPreloadImage key={index} src={src} alt={`Image ${index + 1}`} />
      ))}
    </div>
  );
}

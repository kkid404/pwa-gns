import React, { useState, useEffect, useRef } from "react";

interface LazyPreloadImageProps {
  src: string;
  alt: string;
}

const LazyPreloadImage: React.FC<LazyPreloadImageProps> = ({ src, alt }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current && observer && observer.unobserve) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImageSrc(src);
      };
    }
  }, [isVisible, src]);

  return (
    <img
      className="slider-image"
      ref={imgRef}
      src={imageSrc || ""}
      alt={alt}
      style={{ minHeight: "100px" }} // Optional: placeholder height
    />
  );
};

export default LazyPreloadImage;

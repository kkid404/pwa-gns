import { useEffect, useState } from "react";

interface StarDataType {
  score: number;
  width: number;
}

export default function Stars({ score, width }: StarDataType) {
  const root = document.documentElement;
  const currentLinkColor = getComputedStyle(root)
    .getPropertyValue("--primary-color")
    .trim();
  const [starProgress, setStarProgress] = useState("100%");
  const [grayProgress, setGrayProgress] = useState("50%");
  
  useEffect(() => {
    if (score == 5) {
      setStarProgress("100%");
    } else if (score == 4) {
      setStarProgress("0%");
      setGrayProgress("0%")
    } else {
      setStarProgress(score.toString().split(".")[1] + "0%");
    }
    
  }, [starProgress]);

  return (
    <div className="rating-data-scores-stars">
      <svg
        className="rating-data-scores-stars__item"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        style={{ width: `${width}px` }}
      >
        <path d="M0 0h24v24H0z" fill="none"></path>
        <path d="M0 0h24v24H0z" fill="none"></path>
        <path
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          id="star"
        ></path>
      </svg>
      <svg
        className="rating-data-scores-stars__item"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        style={{ width: `${width}px` }}
      >
        <path d="M0 0h24v24H0z" fill="none"></path>
        <path d="M0 0h24v24H0z" fill="none"></path>
        <path
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          id="star"
        ></path>
      </svg>
      <svg
        className="rating-data-scores-stars__item"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        style={{ width: `${width}px` }}
      >
        <path d="M0 0h24v24H0z" fill="none"></path>
        <path d="M0 0h24v24H0z" fill="none"></path>
        <path
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          id="star"
        ></path>
      </svg>
      <svg
        className="rating-data-scores-stars__item"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        style={{ width: `${width}px` }}
      >
        <path d="M0 0h24v24H0z" fill="none"></path>
        <path d="M0 0h24v24H0z" fill="none"></path>
        <path
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          id="star"
        ></path>
      </svg>
      <svg
        style={{ width: `${width}px` }}
        viewBox="0 0 24 24"
        className="rating-data-scores-stars__item"
      >
        <defs>
          <linearGradient id={"half-blue-gray" + starProgress } x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset={starProgress}
              style={{ stopColor: currentLinkColor, stopOpacity: "1" }}
            />
            <stop
              offset={grayProgress}
              style={{ stopColor: "gray", stopOpacity: "1" }}
            />
          </linearGradient>
        </defs>
        <polygon
          fill={"url(#half-blue-gray" + starProgress + ")"}
          points="12,2 15,9 22,9 17,14 18,21 12,17 6,21 7,14 2,9 9,9"
        />
      </svg>
    </div>
  );
}

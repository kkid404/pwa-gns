interface StarDataType {
  width: number;
  height: number;
  color: string;
}

function Star({ width, height, color }: StarDataType) {
  return (
    <>
      <svg
        style={{ width: width, height: height }}
        viewBox="0 0 24 24"
        className="rating-data-scores-stars__item"
      >
        <defs>
          <linearGradient id={"halffullgray" + color} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="100%"
              style={{ stopColor: color, stopOpacity: "1" }}
            />
            <stop
              offset="100%"
              style={{ stopColor: color, stopOpacity: "1" }}
            />
          </linearGradient>
        </defs>
        <polygon
          fill={"url(#halffullgray"+ color + ")"}
          points="12,2 15,9 22,9 17,14 18,21 12,17 6,21 7,14 2,9 9,9"
        />
      </svg>
    </>
  );
}

export default Star;

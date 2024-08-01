function Star() {
  return (
    <div>
      <svg
        style={{ width: `15px` }}
        viewBox="0 0 24 24"
        className="rating-data-scores-stars__item"
      >
        <defs>
          <linearGradient id={"halffullgray"} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="100%"
              style={{ stopColor: "#8e8e93", stopOpacity: "1" }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#8e8e93", stopOpacity: "1" }}
            />
          </linearGradient>
        </defs>
        <polygon
          fill={"url(#halffullgray" + ")"}
          points="12,2 15,9 22,9 17,14 18,21 12,17 6,21 7,14 2,9 9,9"
        />
      </svg>
    </div>
  );
}

export default Star;

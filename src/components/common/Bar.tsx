interface BarDataType {
  value: number;
  label: number;
}

export default function Bar({value, label}: BarDataType) {
  return (
    <div className="rating-data-progress-item">
      <div className="rating-data-progress-item__score">{label}</div>
      <div className="rating-data-progress-item-bar">
        <div
          style={{ "--current-width": `${value}%` } as React.CSSProperties}
          className="rating-data-progress-item-bar__filled"
        ></div>
      </div>
    </div>
  );
}

import star from "../../imgs/star.svg";

interface StarDataType {
  width: number;
}

export default function Stars({ width }: StarDataType) {
  return (
    <div className="rating-data-scores-stars">
      <img style={{"width": `${width}px`}} className="rating-data-scores-stars__item" src={star} alt="" />
      <img style={{"width": `${width}px`}} className="rating-data-scores-stars__item" src={star} alt="" />
      <img style={{"width": `${width}px`}} className="rating-data-scores-stars__item" src={star} alt="" />
      <img style={{"width": `${width}px`}} className="rating-data-scores-stars__item" src={star} alt="" />
      <img style={{"width": `${width}px`}} className="rating-data-scores-stars__item" src={star} alt="" />
    </div>
  );
}

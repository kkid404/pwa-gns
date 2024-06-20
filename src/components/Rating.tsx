import arrowRight from "../imgs/arrow-right.svg";
import Stars from "./common/Stars";
import Bar from "./common/Bar";

interface RatingDataType {
  score: number;
  reviews: number;
  staticParams: {
    itemTitle: string;
    itemReviews: string;
  };
}

export default function Rating({
  score,
  reviews,
  staticParams,
}: RatingDataType) {
  const raitingParams = [
    { value: 88, label: 5 },
    { value: 9, label: 4 },
    { value: 1, label: 3 },
    { value: 0, label: 2 },
    { value: 2, label: 1 },
  ];
  return (
    <div className="rating app-width">
      <div className="rating-head">
        <h2 className="rating-head__title">{staticParams.itemTitle}</h2>
        <button className="rating-head-btn">
          <img className="rating-head-btn__img" src={arrowRight} alt=""></img>
        </button>
      </div>
      <div className="rating-data">
        <div className="rating-data-scores">
          <span className="rating-data-scores__number">{score}</span>
          <Stars score={score} width={16}></Stars>
          <div className="rating-data-scores__reviews">
            {reviews} {staticParams.itemReviews}
          </div>
        </div>
        <div className="rating-data-progress">
          {raitingParams.map((item) => (
            <Bar key={item.label} value={item.value} label={item.label}></Bar>
          ))}
        </div>
      </div>
    </div>
  );
}

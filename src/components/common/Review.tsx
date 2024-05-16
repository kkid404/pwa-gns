import Stars from "./Stars";
import points from "../../imgs/points.svg";

interface ReviewsPrototypeDataType {
  reviewPrototype: {
    photo: string;
    name: string;
    score: string;
    scoreDate: string;
    review: string;
    helpful: number;
  };
}

export default function Review({ reviewPrototype }: ReviewsPrototypeDataType) {
  return (
    <div className="review">
      <div className="review-profile">
        <div className="review-profile-wrapper">
          <img
            className="review-profile__image"
            src={reviewPrototype.photo}
            alt=""
          ></img>
          <div className="review-profile__title">{reviewPrototype.name}</div>
        </div>
        <button className="review-profile-button">
          <img className="review-profile-button__img" src={points} alt=""></img>
        </button>
      </div>
      <div className="review-score">
        <Stars width={12}></Stars>
        <div className="review-score__date">{reviewPrototype.scoreDate}</div>
      </div>
      <div className="review__text">{reviewPrototype.review}</div>
      <div className="review__helpfull">
        {reviewPrototype.helpful} people found this review helpful
      </div>
      <div className="review-check">
        <div className="review-check__title">Did you find this helpful?</div>
        <button className="review-check__btn">Yes</button>
        <button className="review-check__btn">No</button>
      </div>
      <div className="review-answer">
        <div className="review-answer-head">
          <div className="review-answer-head__name">Casino</div>
          <div className="review-answer-head__date">
            {reviewPrototype.scoreDate}
          </div>
        </div>
        <div className="review-answer__text">
          We have taken your request into account and will forward it to the
          technical department
        </div>
      </div>
    </div>
  );
}

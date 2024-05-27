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
    answer?: {
      author: string;
      authorAnswer: string;
    };
  };
  review: {
    itemHelpful: string;
    itemAsk: string;
    itemYes: string;
    itemNo: string;
  };
}

export default function Review({
  reviewPrototype,
  review,
}: ReviewsPrototypeDataType) {
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
        {reviewPrototype.helpful} {review.itemHelpful}
      </div>
      <div className="review-check">
        <div className="review-check__title">{review.itemAsk}</div>
        <button className="review-check__btn">{review.itemYes}</button>
        <button className="review-check__btn">{review.itemNo}</button>
      </div>
      {reviewPrototype.answer ? (
        <div className="review-answer">
          <div className="review-answer-head">
            <div className="review-answer-head__name">
              {reviewPrototype.answer.author}
            </div>
            <div className="review-answer-head__date">
              {reviewPrototype.scoreDate}
            </div>
          </div>
          <div className="review-answer__text">
            {reviewPrototype.answer.authorAnswer}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

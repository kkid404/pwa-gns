import Review from "./common/Review";

interface ReviewsDataType {
  reviews: {
    photo: string;
    name: string;
    score: string;
    scoreDate: string;
    review: string;
    helpful: number;
  }[];
  staticParams: {
    itemAll: string;
    itemNews: string;
    itemDev: string;
  };
  review: {
    itemHelpful: string;
    itemAsk: string;
    itemYes: string;
    itemNo: string;
  };
}

export default function Reviews({
  reviews,
  staticParams,
  review,
}: ReviewsDataType) {
  return (
    <div className="reviews app-width">
      {reviews.map((item) => (
        <Review
          review={review}
          key={item.photo}
          reviewPrototype={item}
        ></Review>
      ))}
      <div className="reviews-all">{staticParams.itemAll}</div>
      <h2 className="reviews-news">{staticParams.itemNews}</h2>
      <h2 className="reviews-devs">{staticParams.itemDev}</h2>
    </div>
  );
}

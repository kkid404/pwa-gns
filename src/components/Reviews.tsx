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
}

export default function Reviews({ reviews }: ReviewsDataType) {
  return (
    <div className="reviews app-width">
      {reviews.map((item) => (
        <Review key={item.photo} reviewPrototype={item}></Review>
      ))}
      <div className="reviews-all">See all reviews</div>
      <h2 className="reviews-news">What's new</h2>
      <h2 className="reviews-devs">Developer contact</h2>
    </div>
  );
}

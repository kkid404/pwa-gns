import Review from "./common/Review";

interface ReviewsDataType {
  amount: number;
}

export default function Reviews({ amount }: ReviewsDataType) {
  const reviewPrototype = {
    photo:
      "https://preogh.xyz/assets-ucp/Ek5K/c65ef15e14b4c83d4f27481e2427a49be7b852b5d3aa51/_r64x64_png",
    name: "Jean",
    score: "5",
    scoreDate: "March 6, 2024",
    review: "I've been playing my favorite slot machine for a week",
    helpful: 501,
  };
  return (
    <div className="reviews app-width">
      {[...Array(amount)]
        .map((e, i) => i + 1)
        .map((item) => (
          <Review reviewPrototype={reviewPrototype}></Review>
        ))}
      <div className="reviews-all">See all reviews</div>
      <h2 className="reviews-news">What's new</h2>
      <h2 className="reviews-devs">Developer contact</h2>
    </div>
  );
}

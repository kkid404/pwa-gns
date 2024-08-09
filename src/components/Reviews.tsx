// Reviews.tsx
import { useEffect, useState } from "react";
import Review from "./common/Review";
import staticReviewsData from "../i18n/staticReviewsData.json";

interface ReviewsDataType {
  author: string;
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
interface StaticReviews {
  photo: string;
  name: string;
  score: number;
  scoreDate: string;
  review: string;
  helpful: number;
  answer?: {
    author: string;
    authorAnswer: string;
  };
}
[];

interface StaticReview {
  photo: string;
  name: string;
  score: number;
  scoreDate: string;
  review: string;
  helpful: number;
  answer?: {
    author: string;
    authorAnswer: string;
  };
}

interface StaticReviewsData {
  en: StaticReviews;
  fr: StaticReviews;
  es: StaticReviews;
  ar: StaticReviews;
  [key: string]: StaticReviews;
}

// Функция для получения параметра из URL
function getQueryParam(param: string): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

export default function Reviews({
  author,
  staticParams,
  review,
}: ReviewsDataType) {
  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    // Получаем параметр hl из URL, если он существует
    const queryLang = getQueryParam('hl');
    const lang = queryLang ? queryLang : navigator.language.slice(0, 2);

    const data: StaticReviewsData =
      staticReviewsData as unknown as StaticReviewsData;

    if (data[lang]) {
      // @ts-ignore
      setReviewData(data[lang]);
    } else {
      // @ts-ignore
      setReviewData(data.en);
    }
  }, []);

  console.log(reviewData);

  return (
    <div className="reviews app-width">
      {reviewData.map((item: StaticReview) => (
        <Review
          author={author}
          review={review}
          key={item.name}
          reviewPrototype={item}
        ></Review>
      ))}
      <div className="reviews-all">{staticParams.itemAll}</div>
      <h2 className="reviews-news">{staticParams.itemNews}</h2>
      <h2 className="reviews-devs">{staticParams.itemDev}</h2>
    </div>
  );
}

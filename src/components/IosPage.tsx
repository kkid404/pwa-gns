import paramsData from ".././mock/params.json";
import { StaticParams } from ".././i18n/StaticParams";
import staticParamsData from ".././i18n/staticData.json"; // Импортируем JSON-файл напрямую
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Star from "./common/Star";
import profile from "../imgs/profile.png";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode, Pagination } from "swiper/modules";

interface StaticParamsData {
  en: StaticParams;
  fr: StaticParams;
  es: StaticParams;
  ar: StaticParams;
  [key: string]: StaticParams;
}

function IosPage() {
  const [pwaParams] = useState(paramsData);
  const [staticParams, setStaticParams] = useState<StaticParams | null>(null);
  const [fullDescription, setFullDescription] = useState(false);

  useEffect(() => {
    const lang = navigator.language.slice(0, 2);
    const data: StaticParamsData =
      staticParamsData as unknown as StaticParamsData;
    if (data[lang]) {
      setStaticParams(data.en);
      //setStaticParams(data[lang]);
    } else {
      setStaticParams(data.en);
    }
  }, []);

  const getShortText = () => {
    const lines = pwaParams.text.split("\n");

    if (lines.length <= 3) {
      return pwaParams.text;
    } else {
      const truncatedText = lines.slice(0, 3).join("\n");
      return truncatedText;
    }
  };

  return (
    <div className="ios">
      <div className="ios-wrapper">
        <header className="ios-header">
          <img src={pwaParams.icon} className="ios-header__logo"></img>
          <div className="ios-header-titles">
            <div className="ios-header-titles__title">{pwaParams.name}</div>
            <div className="ios-header-titles__author">{pwaParams.author}</div>
            {/* КНОПКА УСТАНОВКИ */}
            <button className="ios-header-titles__install">
              {staticParams?.appTitle.infoButton}
            </button>
          </div>
        </header>

        <div className="ios-stat">
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            freeMode={true}
            modules={[FreeMode, Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="ios-stat__review">
                {staticParams?.appTitle.infoReviews}
              </div>
              <div className="ios-stat__score">{pwaParams.score}</div>
              <div className="ios-stat__stars">
                <Star></Star>
                <Star></Star>
                <Star></Star>
                <Star></Star>
                <Star></Star>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="ios-stat__review">
                {staticParams?.appTitle.infoRated}
              </div>
              <div className="ios-stat__score">18+</div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="ios-stat__review">
                {staticParams?.about.itemSafety}
              </div>
              <div className="ios-stat__score">No.1</div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="ios-stat__review">18+</div>
              <img className="ios-stat__profile" src={profile}></img>
              <div className="ios-stat__lastreview">
                {staticParams?.appTitle.infoOther}
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="ios-about">
          <div className="ios-about__title">
            {staticParams?.about.aboutGame}
          </div>
          <p className="ios-about__text" style={{ whiteSpace: "pre-wrap" }}>
            {fullDescription ? pwaParams.text : getShortText()}
          </p>
          <div
            style={{ display: fullDescription ? "none" : "block" }}
            className="ios-about__shadow"
          ></div>
          <button
            className="ios-about__btn"
            onClick={() => setFullDescription(!fullDescription)}
          >
            {staticParams?.appTitle.infoOpen}
          </button>
        </div>
      </div>
    </div>
  );
}

export default IosPage;

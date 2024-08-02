import paramsData from ".././mock/params.json";
import { StaticParams } from ".././i18n/StaticParams";
import staticParamsData from ".././i18n/staticData.json"; // Импортируем JSON-файл напрямую
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Star from "./common/Star";
import profile from "../imgs/profile.png";
import Button from "@mui/material/Button";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode, Pagination } from "swiper/modules";
import { sendPostback } from "../utils/postback";

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
  const [offer, setOffer] = useState<string>("");
  const dateNow = new Date();

  function getParameterByName(name: string) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var url = window.location.href;
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  useEffect(() => {
    // Сохранение параметров в localStorage
    // @ts-ignore
    localStorage.setItem("subid", getParameterByName("subid"));
    // @ts-ignore
    localStorage.setItem("sub1", getParameterByName("sub1"));
    // @ts-ignore
    localStorage.setItem("sub2", getParameterByName("sub2"));
    // @ts-ignore
    localStorage.setItem("sub3", getParameterByName("sub3"));
    // @ts-ignore
    localStorage.setItem("sub4", getParameterByName("sub4"));
    // @ts-ignore
    localStorage.setItem("sub5", getParameterByName("sub5"));
    // @ts-ignore
    localStorage.setItem("sub6", getParameterByName("sub6"));
    // @ts-ignore
    localStorage.setItem("pixel", getParameterByName("pixel"));
    // @ts-ignore
    localStorage.setItem("fbclid", getParameterByName("fbclid"));
  }, []);

  useEffect(() => {
    setOffer(
      `${pwaParams.offer}?&sub1=${localStorage.getItem(
        "sub1"
      )}&sub2=${localStorage.getItem("sub2")}&sub3=${localStorage.getItem(
        "sub3"
      )}&sub4=${localStorage.getItem("sub4")}&sub5=${localStorage.getItem(
        "sub5"
      )}&sub6=${localStorage.getItem("sub6")}&pixel=${localStorage.getItem(
        "pixel"
      )}&fbclid=${localStorage.getItem("fbclid")}&sub18=${localStorage.getItem(
        "subid"
      )}`
    );
  }, [offer]);

  localStorage.setItem("offer", offer);
  localStorage.setItem("appId", pwaParams.appId);

  useEffect(() => {
    const lang = navigator.language.slice(0, 2);
    const data: StaticParamsData =
      staticParamsData as unknown as StaticParamsData;
    if (data[lang]) {
      setStaticParams(data[lang]);
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

  async function handleInstallClick() {
    const subid = localStorage.getItem("subid");
    setTimeout(() => {
      if (subid) {
        sendPostback(subid, "reject", "cancel_redirect");
        localStorage.setItem("isInstalled", "true");
      }
      window.location.replace(offer);
    }, 500);
  }

  return (
    <div className="ios">
      <div className="ios-wrapper">
        <header className="ios-header">
          <img src={pwaParams.icon} className="ios-header__logo"></img>
          <div className="ios-header-titles">
            <div className="ios-header-titles__title">{pwaParams.name}</div>
            <div className="ios-header-titles__author">{pwaParams.author}</div>
            {/* КНОПКА УСТАНОВКИ */}
            <Button
              variant="contained"
              onClick={() => handleInstallClick()}
              className="ios-header-titles__install"
            >
              {staticParams?.appTitle.infoButton}
            </Button>
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
                <Star color="#8e8e93" width={14} height={14}></Star>
                <Star color="#8e8e93" width={14} height={14}></Star>
                <Star color="#8e8e93" width={14} height={14}></Star>
                <Star color="#8e8e93" width={14} height={14}></Star>
                <Star color="#8e8e93" width={14} height={14}></Star>
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

        <div className="ios-gallery">
          <div className="ios-about__title">
            {staticParams?.about.aboutGame}
          </div>
          <Swiper
            slidesPerView={1.55}
            spaceBetween={12}
            freeMode={true}
            modules={[FreeMode, Pagination]}
            className="mySwiper2"
          >
            {pwaParams.images.map((item) => (
              <SwiperSlide className="ios-gallery-slide">
                <img className="ios-gallery-slide__image" src={item}></img>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="ios-reviews">
          <div className="ios-about__title">
            {staticParams?.rating.itemTitle}
          </div>
          <div className="ios-reviews-amount">
            <div className="ios-reviews-amount__score">{pwaParams.score}</div>
            <div className="ios-reviews-amount-stats">
              <div className="ios-reviews-amount-stats-block">
                <div className="ios-reviews-amount-stats-block-stars">
                  <Star color="#8e8e93" width={10} height={10}></Star>
                  <Star color="#8e8e93" width={10} height={10}></Star>
                  <Star color="#8e8e93" width={10} height={10}></Star>
                  <Star color="#8e8e93" width={10} height={10}></Star>
                  <Star color="#8e8e93" width={10} height={10}></Star>
                </div>
                <div className="ios-reviews-amount-stats-block-backbar">
                  <div className="ios-reviews-amount-stats-block-backbar__inner1"></div>
                </div>
              </div>
              <div className="ios-reviews-amount-stats-block">
                <div className="ios-reviews-amount-stats-block-stars">
                  <Star color="#8e8e93" width={10} height={10}></Star>
                  <Star color="#8e8e93" width={10} height={10}></Star>
                  <Star color="#8e8e93" width={10} height={10}></Star>
                  <Star color="#8e8e93" width={10} height={10}></Star>
                </div>
                <div className="ios-reviews-amount-stats-block-backbar">
                  <div className="ios-reviews-amount-stats-block-backbar__inner2"></div>
                </div>
              </div>
              <div className="ios-reviews-amount-stats-block">
                <div className="ios-reviews-amount-stats-block-stars">
                  <Star color="#8e8e93" width={10} height={10}></Star>
                  <Star color="#8e8e93" width={10} height={10}></Star>
                  <Star color="#8e8e93" width={10} height={10}></Star>
                </div>
                <div className="ios-reviews-amount-stats-block-backbar">
                  <div className="ios-reviews-amount-stats-block-backbar__inner3"></div>
                </div>
              </div>
              <div className="ios-reviews-amount-stats-block">
                <div className="ios-reviews-amount-stats-block-stars">
                  <Star color="#8e8e93" width={10} height={10}></Star>
                  <Star color="#8e8e93" width={10} height={10}></Star>
                </div>
                <div className="ios-reviews-amount-stats-block-backbar">
                  <div className="ios-reviews-amount-stats-block-backbar__inner4"></div>
                </div>
              </div>
              <div className="ios-reviews-amount-stats-block">
                <div className="ios-reviews-amount-stats-block-stars">
                  <Star color="#8e8e93" width={10} height={10}></Star>
                </div>
                <div className="ios-reviews-amount-stats-block-backbar">
                  <div className="ios-reviews-amount-stats-block-backbar__inner5"></div>
                </div>
              </div>
              <div className="ios-reviews-amount-stats__total">
                {staticParams?.rating.itemReviews} : {pwaParams.reviewsAmount}
              </div>
            </div>
          </div>

          <Swiper
            slidesPerView={1.2}
            spaceBetween={12}
            freeMode={true}
            modules={[FreeMode, Pagination]}
            className="ios-reviews-carousel"
          >
            {pwaParams.reviews.map((item) => (
              <SwiperSlide className="ios-reviews-carousel-item">
                <div className="ios-reviews-carousel-item-stars">
                  <Star color="#ff9500" width={22} height={22}></Star>
                  <Star color="#ff9500" width={22} height={22}></Star>
                  <Star color="#ff9500" width={22} height={22}></Star>
                  <Star color="#ff9500" width={22} height={22}></Star>
                  <Star color="#ff9500" width={22} height={22}></Star>
                </div>
                <div className="ios-reviews-carousel-item__title">
                  {item.name} , {dateNow.getDay()}.{dateNow.getMonth()}.
                  {dateNow.getFullYear()}
                </div>
                <div className="ios-reviews-carousel-item__review">
                  {item.review}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="ios-footer">
          <div className="ios-about__title">
            {staticParams?.reviews.itemNews}
          </div>
          <div className="ios-footer-item">
            <div className="ios-footer-item__title">
              {staticParams?.about.itemUpdated}
            </div>
            <div className="ios-footer-item__text">
              {dateNow.getDay()}.{dateNow.getMonth()}.{dateNow.getFullYear()}
            </div>
          </div>

          <div className="ios-footer-item">
            <div className="ios-footer-item__title">
              {staticParams?.about.itemSection}
            </div>
            <div className="ios-footer-item__text">6 mb</div>
          </div>

          <div className="ios-footer-item">
            <div className="ios-footer-item__title">
              {staticParams?.appTitle.infoDownloads}
            </div>
            <div className="ios-footer-item__text">
              {Math.floor(Math.random() * (100000 - 50000 + 1)) + 50000}
            </div>
          </div>

          <div className="ios-footer-item">
            <div className="ios-footer-item__title">
              {staticParams?.appTitle.infoRated}
            </div>
            <div className="ios-footer-item__text">18+</div>
          </div>

          <div className="ios-footer-item">
            <div className="ios-footer-item__title">
              {staticParams?.reviews.itemDev}
            </div>
            <div className="ios-footer-item__text">{pwaParams.author}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IosPage;

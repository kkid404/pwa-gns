import { useEffect, useState } from "react";
import Header from "./components/Header";
import "./style/main.scss";
import AppTitle from "./components/AppTitle";
import ImageSlider from "./components/ImageSlider";
import About from "./components/About";
import { checkPWAInstallation } from "./utils/checkPWAInstallation";
import Rating from "./components/Rating";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import paramsData from "./mock/params.json";
import { StaticParams } from "./i18n/StaticParams";
import staticParamsData from "./i18n/staticData.json"; // Импортируем JSON-файл напрямую
import { UAParser } from "ua-parser-js";

interface StaticParamsData {
  en: StaticParams;
  fr: StaticParams;
  es: StaticParams;
  ar: StaticParams;
  [key: string]: StaticParams;
}

function App() {
  const [pwaParams] = useState(paramsData);
  const [staticParams, setStaticParams] = useState<StaticParams | null>(null);
  const [offer, setOffer] = useState<string>("");

  //определить браузер и сделать редирект
  function redirectBrowser() {
    const parser = new UAParser(window.navigator.userAgent);
    const parserResults = parser.getResult();

    if (
      parserResults.browser.name != "Chrome" &&
      parserResults.os.name == "Android"
    ) {
      localStorage.setItem("defaultUrl", window.location.href);
      let url: string | null = "";
      if (localStorage.getItem("defaultUrl")) {
        url = localStorage.getItem("defaultUrl"); // Замените на нужный URL
        if (url) {
          const chromeIntent = `intent:${url.replace(
            /^https?:\/\//,
            ""
          )}#Intent;scheme=https;package=com.android.chrome;end;`;

          // Попробуем открыть в Chrome
          window.location.href = chromeIntent;
        }
      }
    }
  }

  // подтянуть язык для статики
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

  // подтянуть иконку и тайтл динамически
  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    document.title = pwaParams.name;
    if (!link) {
      link = document.createElement("link") as HTMLLinkElement;
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    link.href = pwaParams.icon;
  }, [pwaParams]);

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

    checkPWAInstallation(offer);
    redirectBrowser();
  }, [offer]);

  window.addEventListener("appinstalled", () => {
    localStorage.setItem("isPWAInstalled", "true");

    window.location.replace(offer);
  });

  localStorage.setItem("offer", offer);

  return (
    <div className="App">
      {staticParams && (
        <div>
          <div className="main-modal-background"></div>
          {staticParams && <Header staticParams={staticParams.header}></Header>}
          <AppTitle
            staticParams={staticParams.appTitle}
            name={pwaParams.name}
            author={pwaParams.author}
            score={pwaParams.score}
            reviews={pwaParams.reviewsAmount}
            icon={pwaParams.icon}
            offer={offer}
          />
          <ImageSlider images={pwaParams.images}></ImageSlider>
          <About
            staticParams={staticParams.about}
            title={pwaParams.title}
            text={pwaParams.text}
          ></About>
          <Rating
            staticParams={staticParams.rating}
            score={pwaParams.score}
            reviews={pwaParams.reviewsAmount}
          ></Rating>
          <Reviews
            review={staticParams.review}
            staticParams={staticParams.reviews}
            reviews={pwaParams.reviews}
          ></Reviews>
          <Footer></Footer>
          <Menu staticParams={staticParams.header}></Menu>
        </div>
      )}
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import Header from "./components/Header";
import "./style/main.scss";
import AppTitle from "./components/AppTitle";
import ImageSlider from "./components/ImageSlider";
import About from "./components/About";
import { checkPWAInstallation } from "./utils/checkPWAInstallation";
import "./style/main.scss";
import Rating from "./components/Rating";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import paramsData from "./mock/params.json";
import staticParamsData from "./i18n/staticData.json";

function App() {
  const [showContent, setShowContent] = useState(true);
  const [newURL, setNewURL] = useState("");
  const [pwaParams] = useState(paramsData);
  const [staticParams, setStaticParams] = useState();

  //подтянуть язык для статики
  useEffect(() => {
    const lang = navigator.language || navigator.userLanguage;

    for (const key in staticParamsData) {
      if (key == lang.slice(0, 2)) {
        setStaticParams(staticParamsData[key]);
      } else {
        setStaticParams(staticParamsData.en);
      }
    }
  });

  //подтянуть иконку и тайтл динамически
  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    document.title = pwaParams.name;
    if (!link) {
      link = document.createElement("link") as HTMLLinkElement;
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    link.href = pwaParams.icon;
  }, []);

  useEffect(() => {
    const isPWAInstalled =
      (window.navigator as any).standalone ||
      localStorage.getItem("isPWAInstalled") === "true";
    setShowContent(!isPWAInstalled);

    if (isPWAInstalled) {
      const cachedURL = localStorage.getItem("cachedURL");
      if (cachedURL) {
        window.location.replace(cachedURL);
      } else {
        const url = `https://tersof.fun/4cbtzcyS?lead_id={lead_id}&sub1=${localStorage.getItem(
          "sub1"
        )}&sub2=${localStorage.getItem("sub2")}&sub3=${localStorage.getItem(
          "sub3"
        )}&sub4=${localStorage.getItem("sub4")}&sub5=${localStorage.getItem(
          "sub5"
        )}&sub6=${localStorage.getItem("sub6")}`;
        setNewURL(url);
        localStorage.setItem("cachedURL", url);
      }
    }
  }, [newURL]);

  useEffect(() => {
    const sub1Value =
      localStorage.getItem("sub1") ||
      new URLSearchParams(window.location.search).get("sub1") ||
      "{sub1}";
    const sub2Value =
      localStorage.getItem("sub2") ||
      new URLSearchParams(window.location.search).get("sub2") ||
      "{sub2}";
    const sub3Value =
      localStorage.getItem("sub3") ||
      new URLSearchParams(window.location.search).get("sub3") ||
      "{sub3}";
    const sub4Value =
      localStorage.getItem("sub4") ||
      new URLSearchParams(window.location.search).get("sub4") ||
      "{sub4}";
    const sub5Value =
      localStorage.getItem("sub5") ||
      new URLSearchParams(window.location.search).get("sub5") ||
      "{sub5}";
    const sub6Value =
      localStorage.getItem("sub6") ||
      new URLSearchParams(window.location.search).get("sub6") ||
      "{sub6}";

    if (!localStorage.getItem("sub1")) localStorage.setItem("sub1", sub1Value);
    if (!localStorage.getItem("sub2")) localStorage.setItem("sub2", sub2Value);
    if (!localStorage.getItem("sub3")) localStorage.setItem("sub3", sub3Value);
    if (!localStorage.getItem("sub4")) localStorage.setItem("sub4", sub4Value);
    if (!localStorage.getItem("sub5")) localStorage.setItem("sub5", sub5Value);
    if (!localStorage.getItem("sub6")) localStorage.setItem("sub6", sub6Value);

    checkPWAInstallation(offer);
  }, []);

  useEffect(() => {
    if (!showContent) {
      return;
    }

    // Render content here
  }, [showContent]);

  const offer = `https://tersof.fun/4cbtzcyS?lead_id={lead_id}&sub1=${localStorage.getItem(
    "sub1"
  )}&sub2=${localStorage.getItem("sub2")}&sub3=${localStorage.getItem(
    "sub3"
  )}&sub4=${localStorage.getItem("sub4")}&sub5=${localStorage.getItem(
    "sub5"
  )}&sub6=${localStorage.getItem("sub6")}`;

  window.addEventListener("appinstalled", () => {
    localStorage.setItem("isPWAInstalled", "true");
    window.location.replace(offer);
    setShowContent(false);
    console.log(showContent);
  });

  return (
    <div className="App">
      {staticParams && (
        <div>
          <Header staticParams={staticParams.header}></Header>
          <AppTitle
            staticParams={staticParams.appTitle}
            name={pwaParams.name}
            author={pwaParams.author}
            score={pwaParams.score}
            reviews={pwaParams.reviewsAmount}
            icon={pwaParams.icon}
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

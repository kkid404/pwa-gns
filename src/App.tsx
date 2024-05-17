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
import data from "./mock/params.json";

function App() {
  const [showContent, setShowContent] = useState(true);
  const [newURL, setNewURL] = useState("");
  const [pwaParams] = useState(data);

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
      <Header></Header>
      <AppTitle
        name={pwaParams.name}
        author={pwaParams.author}
        score={pwaParams.score}
        reviews={pwaParams.reviewsAmount}
      />
      <ImageSlider images={pwaParams.images}></ImageSlider>
      <About title={pwaParams.title} text={pwaParams.text}></About>
      <Rating
        score={pwaParams.score}
        reviews={pwaParams.reviewsAmount}
      ></Rating>
      <Reviews reviews={pwaParams.reviews}></Reviews>
      <Footer></Footer>
      <Menu></Menu>
    </div>
  );
}

export default App;

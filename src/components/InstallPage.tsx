import { useEffect, useState } from "react";
import Header from "./Header";
import AppTitle from "./AppTitle";
import ImageSlider from "./ImageSlider";
import About from "./About";
import Rating from "./Rating";
import Reviews from "./Reviews";
import Footer from "./Footer";
import Menu from "./Menu";
import paramsData from ".././mock/params.json";
import { StaticParams } from ".././i18n/StaticParams";
import staticParamsData from ".././i18n/staticData.json"; // Импортируем JSON-файл напрямую
import { UAParser } from "ua-parser-js";
import PWAPage from "./PWAPage";


interface StaticParamsData {
  en: StaticParams;
  fr: StaticParams;
  es: StaticParams;
  ar: StaticParams;
  [key: string]: StaticParams;
}

function redirectFacebookToBrowser() {
  let userBrowser = new UAParser(window.navigator.userAgent);
  let currentLink = location.href;
  const cancel_redirect = localStorage.getItem("cancel_redirect")

  if(userBrowser.getResult().os.name !== "iOS") {
    if (userBrowser.getBrowser().name !== "Chrome") {
      if(!cancel_redirect){
      // Создание пользовательского промпта
      let userResponse = confirm("We recommend opening this link in Chrome for the best experience. Would you like to open it in Chrome?");
      if (userResponse) {
          if (currentLink.indexOf('https') > -1) {
              currentLink = currentLink.replace('https://', '');
              currentLink = currentLink.replace('www.', '');
              let chromeLink = "intent://" + currentLink + "#Intent;scheme=https;package=com.android.chrome;end";
              window.location.href = chromeLink;
          } else if (currentLink.indexOf('http') > -1) {
              currentLink = currentLink.replace('http://', '');
              currentLink = currentLink.replace('www.', '');
              let chromeLink = "intent://" + currentLink + "#Intent;scheme=http;package=com.android.chrome;end";
              window.location.href = chromeLink;
          }
      }  else {
          // Пользователь отказался от редиректа
          localStorage.setItem("cancel_redirect", "true");
      }
  }
}
  }

}

function InstallPage() {
  const [pwaParams] = useState(paramsData);
  const [staticParams, setStaticParams] = useState<StaticParams | null>(null);
  const [offer, setOffer] = useState<string>("");
  const [isPWA, setIsPWA] = useState<boolean | null>(null);

  useEffect(() => {
    // Определение, является ли приложение PWA
    const checkPWA = () => {
      const isPWA = window.matchMedia('(display-mode: standalone)').matches;
      setIsPWA(isPWA);
    };

    // Добавляем небольшую задержку для демонстрации загрузочного экрана
    setTimeout(checkPWA, 100);
  }, []);

  function getParameterByName(name: string) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var url = window.location.href;
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }


  //функция смены цвета
  function setPrimaryColor(color: string) {
    document.documentElement.style.setProperty("--primary-color", color);
  }

  useEffect(() => {
    redirectFacebookToBrowser()
  }, [])


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
  }, [])

  //Эффект для смены цвета прилы
  useEffect(() => {
    if (pwaParams.color == "blue") {
      setPrimaryColor("#0b57cf");
    }
    if (pwaParams.color == "green") {
      setPrimaryColor("#01875f");
    }
  }, []);

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

  }, [offer]);

  localStorage.setItem("offer", offer);
  localStorage.setItem("appId", pwaParams.appId);
  if (isPWA === null) {
    return (
      <div className="loader-wrapper">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <>
      {isPWA ? (
        <PWAPage />
      ) : (
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
              <ImageSlider
                video={pwaParams.video}
                images={pwaParams.images}
              ></ImageSlider>
              <About
                staticParams={staticParams.about}
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
                  reviews={pwaParams.reviews} author={""}>
                    
                  </Reviews>
              <Footer></Footer>
              <Menu staticParams={staticParams.header}></Menu>
            </div>
          )}
        </div>
      )}
    </>
  );
}
export default InstallPage;

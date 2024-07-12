import { sendPostback } from "../utils/postback";
import ratedOld from "../imgs/eu_18.png";
import { useAddToHomescreenPrompt } from "./UseAddToHomescreenPrompt";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import CircularIndeterminate from "./common/CircularIndeterminate";
import UAParser from "ua-parser-js";

interface AppTitleProps {
  name: string;
  author: string;
  score: number;
  reviews: number;
  icon: string;
  offer: string;
  staticParams: {
    infoOther: string;
    infoReviews: string;
    infoDownloads: string;
    infoRated: string;
    infoButton: string;
    infoWishlist: string;
    infoDownloading: string;
    infoOpen: string;
    infoCanInstall: string;
  };
}

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box
      sx={{
        position: "absolute",
        marginTop: "7px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress
        style={{ color: "#01875f" }}
        size="80px"
        variant="determinate"
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            top: 80,
            left: 96,
            position: "absolute",
          }}
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

//Функция рандома для процентов установки
function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function AppTitle({
  name,
  author,
  score,
  reviews,
  icon,
  staticParams,
  offer,
}: AppTitleProps) {
  //Вызов установки
  const [prompt, promptToInstall] = useAddToHomescreenPrompt();
  //Проверка на готовность установки
  const [, setIsPromptVisible] = useState(false);
  //Счетчик процентов
  const [progress, setProgress] = useState(10);
  //Отображение прогресс бара
  const [showPercentage, setShowPercentage] = useState(false);
  //Интервал заполнения прогресс бара
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  //Можно ли открыть прилу
  const [isOpen, setIsOpen] = useState(true);
  //Можно ли установить прилу на Андроиде после нажатия
  const [canInstall, setCanInstall] = useState(false);
  //Можно ли отобразить модалку
  const [canShowModal, setCanShowModal] = useState(false);

  const parser = new UAParser(window.navigator.userAgent);
  const parserResults = parser.getResult();

  useEffect(() => {
    setTimeout(() => {
      setCanInstall(true);
    }, 4000);
  }, []);

  async function handleInstallClick() {
    localStorage.setItem("isFirstInstall", "true");
    changeBackgroundForModal(false);
    promptToInstall();

    if (prompt) {
      setIsOpen(false);
      const choiceResult = await prompt.userChoice;

      if (choiceResult.outcome === "accepted") {
        const subid = localStorage.getItem("subid");
        if (subid) {
          sendPostback(subid, "reject", "handleInstallClick");
        }
        setTimeout(() => {
          setIsOpen(false);
        }, 6000);
      } else {
        setIsOpen(true);
      }
    }
  }

  function changeBackgroundForModal(check: boolean) {
    if (check) {
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";

      const modal = document.querySelector<HTMLDivElement>(
        ".main-modal-background"
      );
      if (modal) {
        modal.style.display = "block";
      }
    }
    if (!check) {
      document.body.style.overflow = "";
      const modal = document.querySelector<HTMLDivElement>(
        ".main-modal-background"
      );
      if (modal) {
        console.log(123);

        modal.style.display = "none";
      }
      setCanShowModal(false);
    }
  }

  function openClick() {
    if (parserResults.browser.name == "Chrome") {
      window.open('./pwa.html')
    }else{
      if(offer){
        window.open(offer)
      }
    }
  }


  //Обработка клика по кнопке инсталл
  async function handleClick() {
    try{
      const cancel_redirect = localStorage.getItem("cancel_redirect")

      if(cancel_redirect) {
        const subid = localStorage.getItem("subid");
        if (subid) {
          sendPostback(subid, "reject", "cancel_redirect");
        }
        localStorage.setItem("isPWAInstalled", "true");
        setIsOpen(true);  
      }
  
      if (localStorage.getItem("isFirstInstall")) {
        promptToInstall();
      }
      if (progress < 100 && !localStorage.getItem("isFirstInstall")) {
        setShowPercentage(true);
      }
      if (progress >= 100) {
        promptToInstall();
      }
      const timerId = setInterval(() => {
        setProgress((prevProgress: number) =>
          prevProgress >= 60 ? 100 : prevProgress + getRandomNumber(10, 40)
        );
      }, 800);
  
      setTimer(timerId);
  
      setTimeout(() => {
        if (parserResults.os.name == "iOS") {
          const subid = localStorage.getItem("subid");
          if (subid) {
            sendPostback(subid, "reject", "IOS");
          }
          localStorage.setItem("isPWAInstalled", "true");
          setIsOpen(true);
          if(offer){
            window.location.replace(offer);
          }
        } else {
          promptToInstall();
          if (!localStorage.getItem("isFirstInstall")) {
            changeBackgroundForModal(true);
            setCanShowModal(true);
          }
        }
        setShowPercentage(false);
      }, 4000);
  
      if (prompt) {
        setIsOpen(false);
        const choiceResult = await prompt.userChoice;
  
        if (choiceResult.outcome === "accepted") {
          const subid = localStorage.getItem("subid");
          if (subid) {
            sendPostback(subid, "reject", "handleClick");
          }
          setIsOpen(false);
        } else {
          setIsOpen(true);
        }
      }
    } catch {
      const subid = localStorage.getItem("subid");
      if (subid) {
        sendPostback(subid, "reject", "error_install");
      }
      if(offer){
        window.location.replace(offer);
      }
    }

  }

  useEffect(() => {
    if (progress >= 100) {
      if (timer) {
        clearInterval(timer);
      }
      setShowPercentage(false);
    }
  }, [progress, timer]);

  useEffect(() => {
    document.body.click();
    console.log(localStorage.getItem("isPWAInstalled"));

    if (prompt) {
      setIsPromptVisible(true);
    }
  }, [prompt]);

  return (
    <div className="main app-width">
      {canShowModal ? (
        <div className="main-modal-wrapper">
          <div className="main-modal">
            {staticParams.infoCanInstall}
            {/* {isPromptVisible ? ( */}
            <div
              className={
                showPercentage
                  ? "app-title__install-btn-installing"
                  : "app-title__install-btn"
              }
              onClick={() => handleInstallClick()}
            >
              {staticParams.infoButton}
            </div>
            {/* ) : (
            <div className="app-title__install-btn">
              <CircularIndeterminate />
            </div>
          )} */}
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="main__application-title">
        <div className="main__application-title__logo">
          {showPercentage ? <CircularProgressWithLabel value={progress} /> : ""}
          <img
            src={icon}
            className={
              showPercentage
                ? "main__application-title__logo-image-installing"
                : "main__application-title__logo-image"
            }
            alt="logo application"
          />
        </div>
        <div className="main__application-title__info">
          <p className="main__application-title__info-header">{name}</p>
          <div className="main__application-title__info-developer-container">
            <p className="main__application-title__info-developer">{author}</p>
            <p className="main__application-title__info-other">
              {staticParams.infoOther}
            </p>
          </div>
        </div>
      </div>

      <div className="app-title__additional">
        <div className="app-title__additional-container app-title__additional-reviews">
          <p className="app-title__additional-reviews-stars app-title__additional-top_heading">
            {score}★
          </p>
          <p className="app-title__info-other">
            {reviews} {staticParams.infoReviews}
          </p>
        </div>
        <div className="app-title__additional-container app-title__additional-downloads">
          <p className="app-title__additional-downloads-count app-title__additional-top_heading">
            100K+
          </p>
          <p className="app-title__info-other">{staticParams.infoDownloads}</p>
        </div>
        <div className="app-title__additional-container app-title__additional-rated">
          <img
            src={ratedOld}
            alt=""
            className="app-title__additional-rated-image"
          />
          <p className="app-title__info-other">{staticParams.infoRated}</p>
        </div>
      </div>

      <div className="app-title__install-container">
        <div className="app-title__install__btn-container">
          {canInstall ? (
            <div
              className={
                showPercentage
                  ? "app-title__install-btn-installing"
                  : "app-title__install-btn"
              }
              onClick={() => {
                const isInstalled = localStorage.getItem('isPWAInstalled') === 'true';
                if (isInstalled) {
                  openClick();
                } else if (!isOpen) {
                  openClick();
                } else {
                  handleClick();
                } 
              }
            }             
            >
          {showPercentage 
            ? staticParams.infoDownloading 
            : localStorage.getItem('isInstalled') === 'true'
              ? staticParams.infoOpen
              : !isOpen 
                ? staticParams.infoOpen 
                : staticParams.infoButton}            </div>
          ) : parserResults.os.name != "Android" ? (
            <div
            onClick={() => {
              const isInstalled = localStorage.getItem('isPWAInstalled') === 'true';
              if (isInstalled) {
                openClick();
              } else if (!isOpen) {
                openClick();
              } else {
                handleClick();
              } 
            }
          }            
          className="app-title__install-btn"
                      >
          {showPercentage 
            ? staticParams.infoDownloading 
            : localStorage.getItem('isInstalled') === 'true'
              ? staticParams.infoOpen
              : !isOpen 
                ? staticParams.infoOpen 
                : staticParams.infoButton}
                  </div>
          ) : (
            <div className="app-title__install-btn">
              <CircularIndeterminate />
            </div>
          )}
        </div>

        <div className="app-title__wishlist__btn-container">
          <button className="app-title__wishlist__btn-btn">
            <span
              className="app-title__wishlist__icon-container"
              aria-hidden="true"
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M7 3H17C18.1045 3 19 3.8955 19 5V21L12 18L5 21L5.01075 5C5.01075 3.8955 5.8965 3 7 3ZM12 15.824L17 18V5H7V18L12 15.824ZM13 7V9H15V11H13V13H11V11H9V9H11V7H13Z"></path>
              </svg>
            </span>
            <span
              className="app-title__wishlist__text-container"
              aria-hidden="true"
            >
              {staticParams.infoWishlist}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

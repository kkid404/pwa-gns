import React from "react";
import googlePlayLogo from "../imgs/GooglePlayLogo.svg";
// import searchImg from "search.png";
import questionImg from "../imgs/question.svg";
import profileImg from "../imgs/profile.png";

interface HeaderDataType {
  staticParams: {
    itemGames: string;
    itemApps: string;
    itemMovies: string;
    itemBooks: string;
    itemKids: string;
  };
}

export default function Header({ staticParams }: HeaderDataType) {
  const [scroll, setScroll] = React.useState(0);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };
  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={scroll < 100 ? "header" : "header scroll"}>
      <div className="header-nav">
        <img className="header-nav__logo" src={googlePlayLogo} alt="" />
        <div className="header-nav-wrapper">
          <button className="header-nav-item">
            <span className="header-nav-item__text">
              {staticParams.itemGames}
            </span>
          </button>
          <button className="header-nav-item check">
            <span className="header-nav-item__text header-nav-item__pressed">
              Apps
            </span>
          </button>
          <button className="header-nav-item">
            <span className="header-nav-item__text">
              {staticParams.itemMovies}
            </span>
          </button>
          <button className="header-nav-item">
            <span className="header-nav-item__text">
              {staticParams.itemBooks}
            </span>
          </button>
          <button className="header-nav-item">
            <span className="header-nav-item__text">{staticParams.itemKids}</span>
          </button>
        </div>
      </div>
      <div className="header-menu">
        <button className="header-menu-item">
          <img src="./search.png" alt="Search" />
        </button>
        <button className="header-menu-item">
          <img src={questionImg} alt=""></img>
        </button>
        <button className="header-menu-item">
          <img src={profileImg} alt=""></img>
        </button>
      </div>
    </header>
  );
}

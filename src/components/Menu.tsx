import gamepad from "../imgs/gamepad.svg";
import movies from "../imgs/movies.svg";
import books from "../imgs/books.svg";
import kids from "../imgs/kids.svg";

interface MenuDataType {
  staticParams: {
    itemGames: string;
    itemApps: string;
    itemMovies: string;
    itemBooks: string;
    itemKids: string;
  };
}

export default function Menu({ staticParams }: MenuDataType) {
  return (
    <nav className="menu">
      <div className="menu-item">
        <img className="menu-item__img" src={gamepad} alt=""></img>
        <div className="menu-item__name">{staticParams.itemGames}</div>
      </div>
      <div className="menu-item">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="inherit"
          xmlns="http://www.w3.org/2000/svg"
          className="menu-item__img"
        >
          <path
            fill="var(--primary-color)"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15 4H18C19.1 4 20 4.9 20 6V9C20 10.1 19.1 11 18 11H15C13.9 11 13 10.1 13 9V6C13 4.9 13.9 4 15 4ZM9 13H6C4.9 13 4 13.9 4 15V18C4 19.1 4.9 20 6 20H9C10.1 20 11 19.1 11 18V15C11 13.9 10.1 13 9 13ZM18 13H15C13.9 13 13 13.9 13 15V18C13 19.1 13.9 20 15 20H18C19.1 20 20 19.1 20 18V15C20 13.9 19.1 13 18 13ZM9 4H6C4.9 4 4 4.9 4 6V9C4 10.1 4.9 11 6 11H9C10.1 11 11 10.1 11 9V6C11 4.9 10.1 4 9 4Z"
          ></path>
        </svg>
        <div className="menu-item__name menu-item__name-colored">
          {staticParams.itemApps}
        </div>
      </div>
      <div className="menu-item">
        <img className="menu-item__img" src={movies} alt=""></img>
        <div className="menu-item__name">{staticParams.itemMovies}</div>
      </div>
      <div className="menu-item">
        <img className="menu-item__img" src={books} alt=""></img>
        <div className="menu-item__name">{staticParams.itemBooks}</div>
      </div>
      <div className="menu-item">
        <img className="menu-item__img" src={kids} alt=""></img>
        <div className="menu-item__name">{staticParams.itemKids}</div>
      </div>
    </nav>
  );
}

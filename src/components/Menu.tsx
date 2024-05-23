import gamepad from "../imgs/gamepad.svg";
import apps from "../imgs/apps.svg";
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
        <img className="menu-item__img" src={apps} alt=""></img>
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

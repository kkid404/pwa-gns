import gamepad from "../imgs/gamepad.svg";
import apps from "../imgs/apps.svg"
import movies from "../imgs/movies.svg"
import books from "../imgs/books.svg"
import kids from "../imgs/kids.svg"

export default function Menu() {
  return (
    <nav className="menu">
      <div className="menu-item">
        <img className="menu-item__img" src={gamepad} alt=""></img>
        <div className="menu-item__name">Games</div>
      </div>
      <div className="menu-item">
        <img className="menu-item__img" src={apps} alt=""></img>
        <div className="menu-item__name menu-item__name-colored">Apps</div>
      </div>
      <div className="menu-item">
        <img className="menu-item__img" src={movies} alt=""></img>
        <div className="menu-item__name">Movies</div>
      </div>
      <div className="menu-item">
        <img className="menu-item__img" src={books} alt=""></img>
        <div className="menu-item__name">Books</div>
      </div>
      <div className="menu-item">
        <img className="menu-item__img" src={kids} alt=""></img>
        <div className="menu-item__name">Kids</div>
      </div>
    </nav>
  );
}

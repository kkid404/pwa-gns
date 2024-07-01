import arrowRight from "../imgs/arrow-right.svg";

interface AboutDataType {
  text: string;
  staticParams: {
    itemUpdated: string;
    itemSafety: string;
    itemSection: string;
    itemInformation: string;
    aboutGame: string;
  };
}

export default function About({ text, staticParams }: AboutDataType) {
  //Чтобы можно было поставить дату обновления на сегодняшний день
  const now = new Date();
  const monthDate = now.toLocaleString("default", { month: "long" });
  const firstMonthLetter = now
    .toLocaleString("default", { month: "long" })
    .split("")[0]
    .toUpperCase();
  const month = firstMonthLetter + monthDate.slice(1);
  const currentDate = `${month} ${now.getDate()},${now.getFullYear()}`;

  return (
    <div className="about app-width">
      <div className="about-item-data">
        <h2 className="about-item__title">{staticParams.aboutGame}</h2>
        <button className="about-item-data-btn">
          <img
            className="about-item-data-btn__img"
            src={arrowRight}
            alt=""
          ></img>
        </button>
      </div>
      <p className="about-item__text">{text}</p>
      <h3 className="about-item__updated">{staticParams.itemUpdated}</h3>
      <p className="about-item__date">{currentDate}</p>
      <div className="about-item-data">
        <h2 className="about-item__title">{staticParams.itemSafety}</h2>
        <button className="about-item-data-btn">
          <img
            className="about-item-data-btn__img"
            src={arrowRight}
            alt=""
          ></img>
        </button>
      </div>
      <p className="about-item__text">{staticParams.itemSection}</p>
      <textarea
        disabled
        readOnly
        className="about-textarea"
        value={staticParams.itemInformation}
      ></textarea>
    </div>
  );
}

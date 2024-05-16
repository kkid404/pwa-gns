import arrowRight from "../imgs/arrow-right.svg";

interface AboutDataType {
  title: string;
  text: string;
}

export default function About({ title, text }: AboutDataType) {
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
        <h2 className="about-item__title">{title}</h2>
        <button className="about-item-data-btn">
          <img
            className="about-item-data-btn__img"
            src={arrowRight}
            alt=""
          ></img>
        </button>
      </div>
      <p className="about-item__text">{text}</p>
      <h3 className="about-item__updated">Updated on</h3>
      <p className="about-item__date">{currentDate}</p>
      <div className="about-item-data">
        <h2 className="about-item__title">Data safety</h2>
        <button className="about-item-data-btn">
          <img
            className="about-item-data-btn__img"
            src={arrowRight}
            alt=""
          ></img>
        </button>
      </div>
      <p className="about-item__text">
        In this section, developers can specify how applications collect and use
        data.
      </p>
      <textarea
        disabled
        readOnly
        className="about-textarea"
        value={"No information."}
      ></textarea>
    </div>
  );
}

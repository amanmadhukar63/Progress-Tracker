import "./GoalCard.scss";

export default function GoalCard() {


  return (
    <div className="card-container">
      <div className="card-container__header">
        <div className="left"></div>
        <div className="right"></div>
      </div>

      <div className="card-container__titile-container">
        <div className="title"></div>
        <div className="subtitle"></div>
      </div>

      <div className="card-container__progress-bar"></div>

      <div className="card-container__date-container"></div>

    </div>
  );
}
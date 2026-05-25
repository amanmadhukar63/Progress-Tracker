import "./GoalCard.scss";

export default function GoalCard({ 
  title = "Learn Three.js",
  description = "Master 3D web development and interactive shaders."
}) {


  return (
    <div className="card-container">
      <div className="card-container__header">
        <div className="left"></div>
        <div className="right"></div>
      </div>

      <div className="card-container__titile-container">
        <div className="title">{title}</div>
        <div className="subtitle">{description}</div>
      </div>

      <div className="card-container__progress-bar"></div>

      <div className="card-container__date-container"></div>

    </div>
  );
}
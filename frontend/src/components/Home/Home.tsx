import Button from "../Button/Button";
import "./Home.scss";

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-container__hero-title">
        Master Your <span className="gradient-text">Momentum</span>
      </div>
      <div className="home-container__subtext">
        Kinetic is a high-end workspace designed for precision progress. Experience a friction-less workflow that turns long-term goals into daily execution.
      </div>
      <div>
        <Button
          title={"Get Started"}
          type="button"
          style={{
            padding: "16px 32px",
            borderRadius: "12px",
            lineHeight: "normal",
          }}
        />
      </div>
    </div>
  );
}
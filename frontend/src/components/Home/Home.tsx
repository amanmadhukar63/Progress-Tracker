import { useEffect, useRef } from "react";
import Button from "../Button/Button";
import "./Home.scss";
import { createAnimatable } from "animejs";
import ContributionGraph from "../../assets/contribution-graph.svg";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const { userLoggedIn } = useLocalStorage();
  const navigate = useNavigate();

  const ballRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ball = ballRef.current;
    if (!ball) return;
  
    const animatable = createAnimatable(ball, {
      x: 500,
      y: 500,
      ease: "outElastic",
    });
  
    const handleMouseMove = (e: MouseEvent) => {
      const parentRect = ball.parentElement?.getBoundingClientRect();
      if (!parentRect) return;
    
      const rect = ball.getBoundingClientRect();
      const halfW = rect.width / 2;
      const halfH = rect.height / 2;
    
      const x = e.clientX - parentRect.left - halfW;
      const y = e.clientY - parentRect.top - halfH;
    
      animatable.x(x);
      animatable.y(y);
    };
  
    window.addEventListener("mousemove", handleMouseMove);
  
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  function handleGetStarted() {
    if(userLoggedIn) {
      navigate("/dashboard");
      return;
    }
    navigate("/login");
  }

  return (
    <div>
      <div className="home-container">
        <div className="cursor-ball" ref={ballRef} />
        <div className="home-container__hero-title">
          Master Your <span className="gradient-text">Momentum</span>
        </div>
        <div className="home-container__subtext">
          Kinetic is a high-end workspace designed for precision progress. Experience a friction-less workflow that turns long-term goals into daily execution.
        </div>
        <div className="home-container__btn-container">
          <Button
            title={"Get Started"}
            onClick={handleGetStarted}
            type="button"
            style={{
              padding: "16px 32px",
              borderRadius: "12px",
              lineHeight: "normal",
            }}
          />
          <Button
            title={"Learn More"}
            type="button"
            variant={"secondary"}
            style={{
              padding: "16px 32px",
              borderRadius: "12px",
              lineHeight: "normal",
            }}
          />
        </div>
      </div>
      <div>
        <img src={ContributionGraph} alt="contribution graph" />
      </div>
    </div>
  );
}
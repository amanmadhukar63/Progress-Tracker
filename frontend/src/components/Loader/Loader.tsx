// Loader.tsx
import "./Loader.scss";
import LottieModule from "lottie-react";
import loaderAnimation from "../../assets/lottie/loading.json";

const Lottie = (LottieModule as any).default;

export default function Loader() {
  
  return (
    <div className={`loader`}>
      <div className="loader__glass">
        <Lottie
          animationData={loaderAnimation}
          loop
          autoplay
          className="loader__animation"
        />
      </div>
    </div>
  );
}
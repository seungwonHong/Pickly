import Lottie from "lottie-react";
import loading from "@/../public/animations/loading.json";

export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="w-[200px] md:w-[250px]">
        <Lottie animationData={loading} loop={true} />
      </div>
    </div>
  );
}

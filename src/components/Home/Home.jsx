import Lottie from "react-lottie";
import task from "../../assets/task.json";
import { Link } from "react-router-dom";

const Home = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: task,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="flex items-center justify-between max-w-screen-xl mx-auto">
      <div className="w-1/2">
        <h1 className="text-3xl">
          Elevate Your Efficiency with our Task Management Solution
        </h1>

        <div className="mt-10">
          <Link to="/login">
            <button className="bg-blue-600 py-2 px-4 rounded-lg text-white">
              Get Started
            </button>
          </Link>
        </div>
      </div>
      <div className="w-1/2">
        <Lottie options={defaultOptions}></Lottie>
      </div>
    </div>
  );
};

export default Home;

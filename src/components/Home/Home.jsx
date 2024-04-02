import Lottie from "react-lottie";
import task from "../../assets/task.json";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const Home = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: task,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { user } = useContext(AuthContext);
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="py-3">
        <img className="w-52" src={Logo} alt="" />
      </div>
      <div className="flex items-center justify-between ">
        <div className="w-1/2">
          <h1 className="text-3xl">
            Elevate Your Efficiency with our Task Management Solution
          </h1>

          <div className="mt-10">
            {user && user?.email ? (
              <Link to="/taskDashboard/tasks">
                <button className="bg-blue-600 py-2 px-4 rounded-lg text-white">
                  Get Started
                </button>
              </Link>
            ) : (
              <Link to="/login">
                <button className="bg-blue-600 py-2 px-4 rounded-lg text-white">
                  Get Started
                </button>
              </Link>
            )}
          </div>
        </div>
        <div className="w-1/2">
          <Lottie options={defaultOptions}></Lottie>
        </div>
      </div>
    </div>
  );
};

export default Home;

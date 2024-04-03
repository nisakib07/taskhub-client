import Lottie from "react-lottie";
import task from "../../assets/task.json";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { BiTennisBall } from "react-icons/bi";
import { toast } from "react-toastify";

const Home = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: task,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { user, userLogOut } = useContext(AuthContext);

  const handleLogOut = () => {
    userLogOut();
    toast.success("Logged out successfully");
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center px-2">
        <div className="py-3">
          <img className="w-32 md:w-52" src={Logo} alt="" />
        </div>
        {user?.email && (
          <button
            onClick={handleLogOut}
            className="btn bg-blue-600 hover:bg-blue-700 text-white">
            Log Out
          </button>
        )}
      </div>
      <div className="flex flex-col-reverse md:flex-row items-center justify-between ">
        <div className="md:w-1/2 px-3 md:px-0">
          <h1 className="text-xl text-center md:text-start md:text-5xl">
            Elevate Your Efficiency with our Task Management Solution
          </h1>

          <div className="mt-10">
            {user && user?.email ? (
              <Link to="/taskDashboard/tasks">
                <div className="flex justify-center md:justify-start">
                  <button className="bg-blue-600 py-2 px-4 rounded-lg text-white ">
                    Get Started
                  </button>
                </div>
              </Link>
            ) : (
              <Link to="/login">
                <div className="flex justify-center md:justify-start">
                  <button className="bg-blue-600 py-2 px-4 rounded-lg text-white ">
                    Get Started
                  </button>
                </div>
              </Link>
            )}
          </div>
        </div>
        <div className="px-3 md:px-0 md:w-1/2">
          <Lottie options={defaultOptions}></Lottie>
        </div>
      </div>
      <footer className="text-center mt-16">©2024 Nadiatul Islam Sakib</footer>
    </div>
  );
};

export default Home;

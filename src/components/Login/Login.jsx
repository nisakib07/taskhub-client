import Lottie from "react-lottie";
import login from "../../assets/login.json";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Logo from "../../assets/logo.png";

const Login = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: login,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const navigate = useNavigate();

  const { userSignIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data?.email;
    const password = data?.password;

    userSignIn(email, password)
      .then(() => {
        navigate("/taskDashboard/tasks");
        toast.success("Logged In Successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="py-3">
        <img className="w-32 md:w-52 px-2" src={Logo} alt="" />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-around ">
        <div className="md:w-1/2">
          <Lottie options={defaultOptions}></Lottie>
        </div>
        <div className="md:w-1/2">
          <div className="md:w-4/5 bg-blue-400 py-12  px-10 rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="text-lg font-semibold">Email Address</span>
                </label>
                <input
                  type="email"
                  placeholder="Type Here"
                  className="input input-bordered"
                  name="email"
                  {...register("email", { required: true })}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="text-lg font-semibold">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered"
                  name="password"
                  {...register("password", {
                    required: true,
                  })}
                />
              </div>

              <button
                type="submit"
                className="btn mt-4 w-full bg-green-500 hover:bg-green-400 border-0">
                Login
              </button>
            </form>
            <p className="mt-3">
              Don't have an account?{" "}
              <Link className="underline font-bold" to="/signUp">
                Sign Up!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

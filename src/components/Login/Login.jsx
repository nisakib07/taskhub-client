import Lottie from "react-lottie";
import login from "../../assets/login.json";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: login,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  return (
    <div className="flex items-center justify-around max-w-screen-xl mx-auto">
      <div className="w-1/2">
        <Lottie options={defaultOptions}></Lottie>
      </div>
      <div className="w-1/2">
        <div className="w-4/5 bg-blue-400 py-12  px-10 rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="text-lg font-semibold">Email Address</span>
              </label>
              <input
                className="input input-bordered"
                {...register("example")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="text-lg font-semibold">Password</span>
              </label>
              <input
                className="input input-bordered"
                {...register("example")}
              />
            </div>
            <button className="btn mt-3 w-full bg-green-500 hover:bg-green-400 border-0">
              Log In
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
  );
};

export default Login;

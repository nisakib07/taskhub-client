import Lottie from "react-lottie";
import signUp from "../../assets/signup.json";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
const SignUp = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: signUp,
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
                <span className="text-lg font-semibold">Name</span>
              </label>
              <input className="input input-bordered" {...register("name")} />
            </div>
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
            <div className="form-control">
              <label className="label">
                <span className="text-lg font-semibold">Image</span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered border-0  w-full max-w-xs"
                {...register("userImage")}
              />
            </div>
            <button className="btn mt-4 w-full bg-green-500 hover:bg-green-400 border-0">
              Sign Up
            </button>
          </form>
          <p className="mt-3">
            Already have an account?{" "}
            <Link className="underline font-bold" to="/login">
              Login!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

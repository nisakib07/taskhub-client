import Lottie from "react-lottie";
import signUp from "../../assets/signup.json";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Logo from "../../assets/logo.png";

const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;
const SignUp = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: signUp,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { createUser, userProfileUpdate } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const imageFile = { image: data.userImage[0] };
    const res = await axios.post(img_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      const newUser = {
        name: data?.name,
        email: data?.email,
        password: data?.password,
        userImage: res.data.data.display_url,
      };

      createUser(data?.email, data?.password)
        .then(() => {
          userProfileUpdate(data?.name, newUser?.userImage).then(() => {
            axios
              .post("http://localhost:5000/register", newUser)
              .then((res) => {
                if (res.data === "Email already in use") {
                  toast.error(res.data);
                } else {
                  toast.success("Registered Successfully");
                  navigate("/taskDashboard/tasks");
                }
              });
          });
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
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
                  <span className="text-lg font-semibold">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Type Here"
                  className="input input-bordered"
                  name="text"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-red-700 mt-2 text-center">
                    Name is required
                  </span>
                )}
              </div>
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
                {errors.email && (
                  <span className="text-red-700 mt-2 text-center">
                    Email is required
                  </span>
                )}
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
                    minLength: 6,
                    pattern:
                      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).+$/,
                  })}
                />
                {errors.password?.type === "required" && (
                  <span className="text-red-700 mt-2 text-center">
                    Password is required
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-red-700 mt-2 text-center">
                    Password must have at least 6 characters
                  </span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-red-700 mt-2 text-center">
                    Password must have at least <br /> one capital letter and{" "}
                    special character
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="text-lg font-semibold">Image</span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered border-0  w-full max-w-xs"
                  {...register("userImage", { required: true })}
                />
                {errors.userImage && (
                  <span className="text-red-700 mt-2 text-center">
                    Photo is required
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="btn mt-4 w-full bg-green-500 hover:bg-green-400 border-0">
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
    </div>
  );
};

export default SignUp;

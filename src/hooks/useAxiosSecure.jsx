import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { toast } from "react-toastify";

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { userLogOut } = useContext(AuthContext);
  const axiosSecure = axios.create({
    baseURL: "http://localhost:5000",
  });

  axiosSecure.interceptors.request.use(
    function (config) {
      // getting the token first
      const token = localStorage.getItem("token");
      // configuring
      config.headers.authorized = `${token}`;
      return config;
    },
    function (error) {
      // sending error when req is error
      return Promise.reject(error);
    }
  );

  //  intercepts 401 & 403

  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error?.response?.status;
      if (status === 401 || status === 403) {
        await userLogOut();
        toast.error("You are logged out!");
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;

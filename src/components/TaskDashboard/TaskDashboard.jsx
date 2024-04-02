import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const TaskDashboard = () => {
  return (
    <div className="bg-[#F5F5FB]">
      <div className="max-w-screen-xl mx-auto min-h-screen flex flex-col gap-4 md:flex-row">
        <div className="py-2 md:w-1/4">
          <Navbar></Navbar>
        </div>
        <div
          className="bg-base-100 md:w-3/4 my-2 rounded-xl shadow-xl  px-4 py-8"
          style={{ minHeight: "calc(100vh - 64px)" }}>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default TaskDashboard;

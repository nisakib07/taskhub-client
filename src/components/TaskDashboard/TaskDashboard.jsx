import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const TaskDashboard = () => {
  return (
    <div className="bg-[#F5F5FB]">
      <div className="max-w-screen-xl mx-auto min-h-screen flex flex-col md:flex-row">
        <div className="py-2">
          <Navbar></Navbar>
        </div>
        <div>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default TaskDashboard;

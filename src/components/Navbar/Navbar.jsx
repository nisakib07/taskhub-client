import React, { useContext } from "react";
import Logo from "../../assets/logo.png";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, NavLink } from "react-router-dom";
import { IoReorderThree } from "react-icons/io5";
import { MdAddTask } from "react-icons/md";
import { MdOutlineTaskAlt } from "react-icons/md";
import { BiTaskX } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const { user, userLogOut } = useContext(AuthContext);
  console.log(user);

  const handleLogOut = () => {
    userLogOut();
  };
  return (
    <div>
      <div
        className="bg-base-100 px-4 py-8 hidden lg:flex rounded-xl shadow-xl"
        style={{ minHeight: "calc(100vh - 16px)" }}>
        <div>
          <Link to="/">
            <img className="w-52" src={Logo} alt="" />
          </Link>

          <div className="mt-5 flex flex-col text-lg font-semibold gap-3">
            <NavLink
              to="/taskDashboard/tasks"
              className={({ isActive }) =>
                `flex items-center gap-3 ${
                  isActive ? "bg-blue-600 text-white" : ""
                } p-2 rounded-lg`
              }>
              <MdAddTask /> New Tasks
            </NavLink>
            <NavLink
              to="/taskDashboard/ongoing-tasks"
              className={({ isActive }) =>
                `flex items-center gap-3 ${
                  isActive ? "bg-blue-600 text-white" : ""
                } p-2 rounded-lg`
              }>
              <BiTaskX /> Ongoing Tasks
            </NavLink>
            <NavLink
              to="/taskDashboard/completed-tasks"
              className={({ isActive }) =>
                `flex items-center gap-3 ${
                  isActive ? "bg-blue-600 text-white" : ""
                } p-2 rounded-lg`
              }>
              <MdOutlineTaskAlt /> Completed Tasks
            </NavLink>
            <NavLink
              to="/taskDashboard/profile"
              className={({ isActive }) =>
                `flex items-center gap-3 ${
                  isActive ? "bg-blue-600 text-white" : ""
                } p-2 rounded-lg`
              }>
              <CgProfile /> My Profile
            </NavLink>
            <div className="mt-10 mx-2">
              <a onClick={handleLogOut}>Logout</a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center mx-2 lg:hidden justify-between bg-base-100 px-2 rounded-xl">
        {/* Drawer */}
        <div className="drawer drawer-start my-2 ">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="my-drawer-4" className="drawer-button text-3xl">
              <IoReorderThree></IoReorderThree>
            </label>
          </div>
          <div className="drawer-side z-50">
            <label
              htmlFor="my-drawer-4"
              aria-label="close sidebar"
              className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-100">
              <div className="mt-5 flex flex-col text-lg font-semibold gap-3">
                <NavLink
                  to="/taskDashboard/tasks"
                  className={({ isActive }) =>
                    `flex items-center gap-3 ${
                      isActive ? "bg-blue-600 text-white" : ""
                    } p-2 rounded-lg`
                  }>
                  <MdAddTask /> New Tasks
                </NavLink>
                <NavLink
                  to="/taskDashboard/ongoing-tasks"
                  className={({ isActive }) =>
                    `flex items-center gap-3 ${
                      isActive ? "bg-blue-600 text-white" : ""
                    } p-2 rounded-lg`
                  }>
                  <BiTaskX /> Ongoing Tasks
                </NavLink>
                <NavLink
                  to="/taskDashboard/completed-tasks"
                  className={({ isActive }) =>
                    `flex items-center gap-3 ${
                      isActive ? "bg-blue-600 text-white" : ""
                    } p-2 rounded-lg`
                  }>
                  <MdOutlineTaskAlt /> Completed Tasks
                </NavLink>
                <NavLink
                  to="/taskDashboard/profile"
                  className={({ isActive }) =>
                    `flex items-center gap-3 ${
                      isActive ? "bg-blue-600 text-white" : ""
                    } p-2 rounded-lg`
                  }>
                  <CgProfile /> My Profile
                </NavLink>
                <div className="mt-10 mx-2">
                  <a onClick={handleLogOut}>Logout</a>
                </div>
              </div>
            </ul>
          </div>
        </div>

        <Link>
          <img className="w-32" src={Logo} alt="" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

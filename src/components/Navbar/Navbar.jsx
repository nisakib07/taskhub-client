import React, { useContext } from "react";
import Logo from "../../assets/logo.png";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, NavLink } from "react-router-dom";
import { IoReorderThree } from "react-icons/io5";

const Navbar = () => {
  const { user, userLogOut } = useContext(AuthContext);
  console.log(user);

  const handleLogOut = () => {
    userLogOut();
  };
  return (
    <div>
      {/* <div className="navbar bg-base-100 max-w-screen-xl mx-auto hidden md:flex">
        <div className="flex-1">
          <img className="w-52" src={Logo} alt="" />
        </div>
        <div className="flex-none gap-2">
          {user && (
            <div className="flex-none">
              {user ? (
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                      <img
                        src={
                          user?.photoURL
                            ? user.photoURL
                            : "https://i.ibb.co/DCghjvD/profile.jpg"
                        }
                      />
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                      <p>{user?.displayName}</p>
                    </li>

                    <li>
                      <a onClick={handleLogOut}>Logout</a>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/login">
                  <button className="btn bg-cyan-500 hover:bg-cyan-400 border-none">
                    Login
                  </button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div> */}
      <div
        className="bg-base-100 px-4 py-8 hidden lg:flex rounded-xl"
        style={{ minHeight: "calc(100vh - 16px)" }}>
        <div>
          <img className="w-52" src={Logo} alt="" />

          <div className="mt-5 flex flex-col text-lg">
            <NavLink className="">New Tasks</NavLink>
            <NavLink>Ongoing Tasks</NavLink>
            <NavLink>Completed Tasks</NavLink>
            <NavLink>My Profile</NavLink>

            <a onClick={handleLogOut}>Logout</a>
          </div>
        </div>
      </div>
      <div className="flex items-center mx-2 lg:hidden">
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
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              {/* Sidebar content here */}
              <li>
                <a>Sidebar Item 1</a>
              </li>
              <li>
                <a>Sidebar Item 2</a>
              </li>
            </ul>
          </div>
        </div>

        <img className="w-32" src={Logo} alt="" />
      </div>
    </div>
  );
};

export default Navbar;

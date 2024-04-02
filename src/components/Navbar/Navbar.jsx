import React, { useContext } from "react";
import Logo from "../../assets/logo.png";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link } from "react-router-dom";
const Navbar = () => {
  const { user, userLogOut } = useContext(AuthContext);
  console.log(user);

  const handleLogOut = () => {
    userLogOut();
  };
  return (
    <div className="navbar bg-base-100 max-w-screen-xl mx-auto">
      <div className="flex-1">
        <img className="w-52" src={Logo} alt="" />
      </div>
      <div className="flex-none gap-2">
        {user && (
          <div className="flex-none">
            {user ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
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
    </div>
  );
};

export default Navbar;

import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div className="flex flex-col justify-center items-center md:mt-5">
      <img className="w-48 h-48 rounded-full" src={user?.photoURL} alt="" />
      <h1 className="mt-4 text-lg font-semibold">{user?.displayName}</h1>
      <p>{user?.email}</p>
    </div>
  );
};

export default MyProfile;

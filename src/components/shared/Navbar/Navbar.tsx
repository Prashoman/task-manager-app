import { useState } from "react";
import { Link } from "react-router-dom";
import { currentUser, logOut } from "../../../redux/features/auth/authSlice";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";

export default function NavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dispatch = useAppDispatch();

  const user = useAppSelector(currentUser);

  return (
    <>
      <div className="w-full sticky z-30 top-0 left-0">
        <nav className="bg-blue-500 text-neutral-content w-full px-4 xl:px-20 shadow-2xl">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
            <Link to={"/"} className="flex items-center space-x-3 text-white">
              Task Manager
            </Link>

            <div className="flex items-center space-x-3">
              {user ? (
                <div className="relative">
                  <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <img
                      src={user?.profileImage || "/default-avatar.png"} // Replace with actual user image URL
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full border border-gray-300"
                    />
                    <span className="text-white font-medium">
                      {user?.userName}
                    </span>
                  </div>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2">
                      <Link
                        to={`/profile`}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          dispatch(logOut());
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={"/login"}
                  className="  text-white px-2 py-1 rounded-md hover:bg-blue-600"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

import { useState } from "react";
import { HiOutlineMenuAlt2, HiOutlineX } from "react-icons/hi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { currentUser, logOut } from "../../../redux/features/auth/authSlice";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";

export default function NavBar() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dispatch = useAppDispatch();

  const user = useAppSelector(currentUser);
  

  return (
    <>
      <div className="w-full sticky z-30 top-0 left-0">
        <nav className="bg-neutral text-neutral-content w-full px-4 xl:px-20 shadow-2xl">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
            <Link to={"/"} className="flex items-center space-x-3">
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
                  className="bg-blue-500 text-white px-2 py-1 rounded-md hidden lg:block"
                >
                  Login
                </Link>
              )}

              <div
                className="block lg:hidden"
                onClick={() => setIsNavbarOpen(!isNavbarOpen)}
              >
                <HiOutlineMenuAlt2 className="w-6 h-6 text-white cursor-pointer" />
              </div>
            </div>
          </div>
        </nav>
      </div>

      {isNavbarOpen && (
        <motion.div
          className="w-[50%] bg-neutral text-neutral-content h-screen block lg:hidden fixed z-30 top-[15%] right-0 rounded"
          initial={{ x: "100%" }}
          animate={{ x: "0%" }}
          exit={{ x: "0%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="px-4 py-7 relative">
            <ul className="flex flex-col space-y-4">
              <li>
                <Link
                  to="/"
                  className="text-white hover:text-[#F2BF4A] text-[16px] font-[500] hover:text-[17px] transition-all"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/facility"
                  className="text-white hover:text-[#F2BF4A] text-[16px] font-[500] hover:text-[17px] transition-all"
                >
                  Facility
                </Link>
              </li>
              <li>
                <Link
                  to="/about-us"
                  className="text-white hover:text-[#F2BF4A] text-[16px] font-[500] hover:text-[17px] transition-all"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  className="text-white hover:text-[#F2BF4A] text-[16px] font-[500] hover:text-[17px] transition-all"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                {user ? (
                  <Link
                    to={`/dashboard/${user.role}`}
                    className="bg-blue-500 text-white px-2 py-1 rounded-md"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="bg-blue-500 text-white px-2 py-1 rounded-md"
                  >
                    Login
                  </Link>
                )}
              </li>
            </ul>
            <HiOutlineX
              onClick={() => setIsNavbarOpen(false)}
              className="w-6 h-6 text-white cursor-pointer absolute top-2 right-2"
            />
          </div>
        </motion.div>
      )}
    </>
  );
}

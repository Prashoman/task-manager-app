import { motion } from "framer-motion";
import { useAppSelector } from "../../../redux/hooks";
import { currentUser } from "../../../redux/features/auth/authSlice";

import PasswordChangeModal from "./PasswordChangeModal";
import { useEffect, useRef, useState } from "react";
import { modelOpen } from "../../../helpers";
import ProfileEditModel from "./ProfileEditModal";

export default function ProfilePage() {
  const user = useAppSelector(currentUser);
  const [currentUserInfo, setCurrentUserInfo] = useState({
    userName: user?.userName || "",
    email: user?.email || "",
    bio: user?.bio,
    profileImage: user?.profileImage || "",
  });
  const [fetching, setFetching] = useState<boolean>(false);
  const passChangeRef = useRef<HTMLDivElement>(null);
  const editProfileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentUserInfo({
      userName: user?.userName || "",
      email: user?.email || "",
      bio: user?.bio,
      profileImage: user?.profileImage || "",
    });
  }, [user]);

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full text-center"
        >
          <motion.img
            src={currentUserInfo?.profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto border-4 border-blue-500 shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />

          <h2 className="mt-4 text-2xl font-semibold text-gray-800">
            {currentUserInfo?.userName}
          </h2>
          <p className="text-gray-500">{currentUserInfo?.email}</p>

          <p className="text-blue-600 font-semibold mt-2 capitalize">
            {currentUserInfo?.bio}
          </p>

          <motion.div
            className="mt-5 flex justify-center space-x-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button
              onClick={() => {
                modelOpen(editProfileRef);
                setFetching(!fetching);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
            >
              Edit Profile
            </button>
            <button
              onClick={() => {
                modelOpen(passChangeRef);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
            >
              Password Change
            </button>
          </motion.div>
        </motion.div>
      </div>
      <ProfileEditModel modalRef={editProfileRef} state={fetching} />
      <PasswordChangeModal modalRef={passChangeRef} />
    </>
  );
}

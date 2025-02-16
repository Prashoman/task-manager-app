/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef, useState } from "react";
import {
  currentUser,
  setCurrentUser,
} from "../../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Modal from "../../shared/Modal/Modal";
import { imageUploadImageBB } from "../../../utils/imageUpload";
import { useChangeProfileMutation } from "../../../redux/features/auth/authApi";
import { toast } from "sonner";
import { modelClose } from "../../../helpers";
import { TError } from "../../../utils/type/error";
import { TUser } from "../../../utils/type/user.type";

interface ProfileEditModelProps {
  modalRef: any;
  state: any;
  setState?: any;
}

interface TFormValues {
  userName: string;
  email: string;
  bio?: string;
  profileImage: string | File; 
}

const ProfileEditModel = ({ modalRef, state }: ProfileEditModelProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const user = useAppSelector(currentUser);
  const [updateProfile] = useChangeProfileMutation();
  const dispatch = useAppDispatch();

  const [formValues, setFormValues] = useState<TFormValues>({
    userName: user?.userName || "",
    email: user?.email || "",
    bio: user?.bio,
    profileImage: user?.profileImage || "",
  });

  useEffect(() => {
    setFormValues({
      userName: user?.userName || "",
      email: user?.email || "",
      bio: user?.bio,
      profileImage: user?.profileImage || "",
    });
  }, [user, state]);
  const handleProfileUpdate = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    const toastId = toast.loading("Update Profile...");
    let imageUpdate;
    if (
      formValues?.profileImage &&
      typeof formValues?.profileImage === "object"
    ) {
      const formDataObj = new FormData();
      formDataObj.append("image", formValues?.profileImage);

      const updateImage: any = await imageUploadImageBB(formDataObj);
      imageUpdate = updateImage as string;
    } else {
      imageUpdate = formValues?.profileImage;
    }
    const updatedData = {
      profileImage: imageUpdate,
      userName: formValues?.userName,
      email: formValues?.email,
      bio: formValues?.bio || "",
    };
    try {
      const updateRes = await updateProfile(updatedData).unwrap();
      const user: TUser | null = updateRes.data;
      if (user) {
        dispatch(
          setCurrentUser({
            user,
          })
        );
      }
      if (updateRes?.success) {
        toast.success("Profile Updated Successfully", { id: toastId });
        modelClose(modalRef);
        setLoading(false);
      } else {
        setLoading(false);
        toast.error(updateRes?.message || "Failed to update profile", {
          id: toastId,
        });
      }
    } catch (error) {
      setLoading(false);
      const errorMes = error as TError;
      toast.error(errorMes?.data?.message, { id: toastId });
    }
  };
  return (
    <>
      <Modal modalRef={modalRef} formRef={formRef}>
        <div className="max-w-md mx-auto bg-white p-2 lg:p-6 rounded-lg ">
          <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
          <form onSubmit={handleProfileUpdate} ref={formRef}>
            <div>
              <label className="mb-2 font-serif">User Name</label>

              <input
                name="userName"
                value={formValues.userName}
                onChange={(e) => {
                  setFormValues({ ...formValues, userName: e.target.value });
                }}
                type="text"
                className="textarea textarea-bordered w-full focus:ring-2 focus:ring-gray-500 mt-2 font-serif"
              />
            </div>
            <div>
              <label className="mb-2 font-serif">Email</label>

              <input
                name="email"
                value={formValues.email}
                onChange={(e) => {
                  setFormValues({ ...formValues, email: e.target.value });
                }}
                type="email"
                className="textarea textarea-bordered w-full focus:ring-2 focus:ring-gray-500 mt-2 font-serif"
              />
            </div>
            <div>
              <label className="mb-2 font-serif">Profile Image</label>
              {formValues?.profileImage ? (
                typeof formValues?.profileImage === "string" ? (
                  <img
                    src={formValues.profileImage}
                    alt="Profile"
                    className="w-24 h-24 rounded-full"
                  />
                ) : (
                  <img
                    src={URL.createObjectURL(formValues.profileImage)}
                    alt="Profile"
                    className="w-24 h-24 rounded-full"
                  />
                )
              ) : null}
              <input
                type="file"
                name="file"
                accept="image/*"
                className="textarea textarea-bordered w-full focus:ring-2 focus:ring-gray-500 mt-2 font-serif"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setFormValues({
                      ...formValues,
                      profileImage: e.target.files[0],
                    });
                  }
                }}
              />
            </div>

            <div>
              <label className="mb-2 font-serif">Bio</label>

              <textarea
                name="bio"
                value={formValues.bio}
                onChange={(e) => {
                  setFormValues({ ...formValues, bio: e.target.value });
                }}
                rows={3}
                className="textarea textarea-bordered w-full focus:ring-2 focus:ring-gray-500 mt-2 font-serif"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 w-full text-white font-serif border rounded py-2 mt-4 text-lg transition-colors"
            >
              Update Profile
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ProfileEditModel;

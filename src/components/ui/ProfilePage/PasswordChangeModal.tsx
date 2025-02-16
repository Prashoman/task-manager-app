/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues } from "react-hook-form";
import SFForm from "../../shared/Form/SFForm";
import Input from "../../shared/InputFields/Input";
import Modal from "../../shared/Modal/Modal";
import { useRef } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { TError } from "../../../utils/type/error";
import { modelClose } from "../../../helpers";
import { useChangePasswordMutation } from "../../../redux/features/auth/authApi";

interface PasswordChangeModalProps {
  modalRef: any;
}

const PasswordChangeModal = ({ modalRef }: PasswordChangeModalProps) => {
  const navigate = useNavigate();
  const [changePassFun] = useChangePasswordMutation();
  const formRef = useRef<HTMLFormElement>(null);

  const chancePasswordSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Password Change in...");
    try {
      const changePasswordData = {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      };
      if (data.newPassword !== data.confirmPassword) {
        toast.error("Password and Confirm Password not match", { id: toastId });
        return;
      }

      const passResponse = await changePassFun(changePasswordData).unwrap();

      if (passResponse.success) {
        navigate(`/`);
        toast.success("Password Change Successfully", { id: toastId });
        modelClose(modalRef);
      } else {
        toast.error(passResponse?.message, { id: toastId });
      }
    } catch (error) {
      const errorMes = error as TError;
      toast.error(errorMes?.data?.message, { id: toastId });
    }
  };
  return (
    <>
      <Modal modalRef={modalRef} formRef={formRef}>
        <div className="max-w-md mx-auto bg-white p-2 lg:p-6 rounded-lg ">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>

          <SFForm onSubmit={chancePasswordSubmit} formRef={formRef}>
            <Input
              label="old Password"
              name="oldPassword"
              placeholder="Enter Your old Password"
              type="password"
              required={true}
            />
            <Input
              label="New Password"
              name="newPassword"
              placeholder="Enter your new password"
              type="password"
              required={true}
            />
            <Input
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Enter your confirm password"
              type="password"
              required={true}
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 w-full text-white font-serif border rounded py-2 mt-4 text-lg transition-colors"
            >
              Change Password
            </button>
          </SFForm>
        </div>
      </Modal>
    </>
  );
};

export default PasswordChangeModal;

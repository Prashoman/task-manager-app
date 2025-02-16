import { useEffect } from "react";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SFForm from "../../shared/Form/SFForm";
import Input from "../../shared/InputFields/Input";
import { toast } from "sonner";

const ResetPassword = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get("id");
  const token = searchParams.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!id || !token) {
      navigate("/");
    }
  }, [id, token]);

  console.log({ id, token });

  const handlePasswordResetSubmit = async (data: FieldValues) => {
    const updatePass = {
      id: id,
      newPassword: data.newPassword,
    };
    const response = await fetch(
      "https://task-manager-backend-rho-liart.vercel.app/api/auth/reset-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatePass),
      }
    );
    const resData = await response.json();
    if (response) {
      toast.success(resData.message);
      navigate("/login");
    } else {
      console.log("resData", resData);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-gray-100  p-8 rounded-lg shadow-lg">
          <SFForm onSubmit={handlePasswordResetSubmit}>
            <Input
              label="New Password"
              name="newPassword"
              placeholder="Enter your password"
              type="password"
              required={true}
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 w-full text-white font-serif border rounded py-2 mt-4 text-lg transition-colors"
            >
              Log in
            </button>
          </SFForm>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;

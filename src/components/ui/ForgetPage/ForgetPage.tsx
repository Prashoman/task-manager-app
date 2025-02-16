import Input from "../../shared/InputFields/Input";
import SFForm from "../../shared/Form/SFForm";
import { Link, useNavigate } from "react-router-dom";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { TError } from "../../../utils/type/error";
import { useForgetPasswordMutation } from "../../../redux/features/auth/authApi";

interface ForgetPageProps {
  forget: boolean;
  setForget: (value: boolean) => void;
}

const ForgetPage = ({ forget, setForget }: ForgetPageProps) => {
  const navigate = useNavigate();
  const [forgetPassword] = useForgetPasswordMutation();

  const handleForgetSubmit = async (data: FieldValues) => {
    const tostId = toast.loading("Loading...");
    const { email } = data;
    try {
      const userInfo = {
        email,
      };
      const regResponse = await forgetPassword(userInfo).unwrap();
      //   console.log("regResponse", regResponse);

      toast.success(regResponse?.message, { id: tostId });
      navigate("/login");
    } catch (error) {
      const errorMes = error as TError;
      toast.error(errorMes?.data?.message, { id: tostId });
    }
  };
  return (
    <>
      <div>
        <h1 className="text-center text-2xl text-white font-medium font-serif mb-6">
          Forget Password
        </h1>
        <SFForm onSubmit={handleForgetSubmit}>
          <Input
            label="Email"
            name="email"
            placeholder="Enter your email"
            type="email"
            required={true}
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 w-full text-white font-serif border rounded py-2 mt-4 text-lg transition-colors"
          >
            send
          </button>
        </SFForm>
        <div className="mt-6 text-center">
          <p className="text-white">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-400 hover:text-blue-600 font-serif"
            >
              Register
            </Link>
          </p>
          <p>
            <button
              className="text-blue-400 hover:text-blue-600 font-serif"
              onClick={() => setForget(!forget)}
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default ForgetPage;

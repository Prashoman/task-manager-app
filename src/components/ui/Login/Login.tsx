import { Link, useNavigate } from "react-router-dom";
import Input from "../../shared/InputFields/Input";
import SFForm from "../../shared/Form/SFForm";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../../../redux/features/auth/authApi";
import { useAppDispatch } from "../../../redux/hooks";
import { setUser } from "../../../redux/features/auth/authSlice";
import { toast } from "sonner";
import { TError } from "../../../utils/type/error";
import { useState } from "react";
import ForgetPage from "../ForgetPage/ForgetPage";
import { TUser } from "../../../utils/type/user.type";



const Login = () => {
  const [forget, setForget] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  // const {reset} = useForm();
  const handleLoginSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in...");
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      const loginResponse = await login(userInfo).unwrap();
      const user: TUser | null = loginResponse.data;
      dispatch(
        setUser({
          user,
          token: loginResponse.token,
        })
      );
      navigate(`/`);
      toast.success("Login successful", { id: toastId });
    } catch (error) {
      const errorMes = error as TError;
      toast.error(errorMes?.data?.message, { id: toastId });
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-100  p-8 rounded-lg shadow-lg">
        {forget ? (
          <ForgetPage forget={forget} setForget={setForget} />
        ) : (
          <div>
            <h1 className="text-center text-2xl text-black font-medium font-serif mb-6">
              Login
            </h1>
            <SFForm onSubmit={handleLoginSubmit}>
              <Input
                label="Email"
                name="email"
                placeholder="Enter your email"
                type="email"
                required={true}
              />
              <Input
                label="Password"
                name="password"
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
            <div className="mt-6 text-center">
              <p className="text-gray-600">
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
                  Forgot Password
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

import { Link, useNavigate } from "react-router-dom";
import Input from "../../shared/InputFields/Input";
import SFForm from "../../shared/Form/SFForm";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useRegisterMutation } from "../../../redux/features/auth/authApi";
import { TError } from "../../../utils/type/error";

const Register = () => {
  const [registration] = useRegisterMutation();
  const navigate = useNavigate();

  const handleRegistrationSubmit = async (data: FieldValues) => {
    const tostId = toast.loading("Loading...");
    const { name, email, password } = data;
    try {
      const userInfo = {
        userName: name,
        email,
        password,
      };
      const regResponse = await registration(userInfo).unwrap();
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
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 pt-7">
        <div className="bg-gray-800 w-full max-w-md  p-8 rounded-lg shadow-lg">
          <h1 className="text-center text-white text-2xl font-medium font-serif mb-6">
            Register First
          </h1>
          <SFForm onSubmit={handleRegistrationSubmit}>
            <Input
              label="User Name"
              name="name"
              placeholder="Enter your name"
              type="text"
              required={true}
            />
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
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-serif border rounded py-2 mt-4 text-lg transition-colors"
            >
              Register
            </button>
          </SFForm>
          <div className="mt-6 text-center">
            <p className="text-white">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-400 hover:text-blue-600 font-serif"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

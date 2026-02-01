import { useState } from "react";
import loginImg from "../assests/loginImg.png";
import { FaUserCog } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../services/user.service";
import Spinner from "../assests/spinner/Spinner";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandle = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields", { position: "top-center" });
      return;
    }

    try {
      setLoading(true);
      const user = await UserService.login(formData.email, formData.password);
      setLoading(false);

      if (user && user.token) {
        toast.success(`Welcome back, ${user.username}!`, {
          position: "top-center",
        });

        // redirection après 1.5s pour voir le toast
        setTimeout(() => {
          navigate("/home");
        }, 1500);
      } else {
        toast.error("Login failed: invalid user data", {
          position: "top-center",
        });
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      toast.error(
        err.response?.data?.message || "Login failed. Check your credentials.",
        { position: "top-center" }
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-10 px-6 md:px-20 bg-gray-50 py-10">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Left Image */}
      <div className="md:w-1/3 w-80">
        <img
          src={loginImg}
          alt="login illustration"
          className="rounded-xl shadow-lg"
        />
      </div>

      {/* Right Form */}
      <form
        className="md:w-1/3 w-80 flex flex-col gap-4 bg-white p-8 rounded-2xl shadow-lg"
        onSubmit={submitHandle}
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <FaUserCog className="text-blue-500" size={28} />
          <h1 className="text-2xl md:text-4xl font-semibold text-blue-500">
            Sign In
          </h1>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">
            Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="youremail@gmail.com"
            value={formData.email}
            onChange={onInputChange}
            autoComplete="off"
            className="border rounded-md py-2 px-3 outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
        </div>

        {/* Password with eye toggle */}
        <div className="flex flex-col gap-1 relative">
          <label className="font-medium">
            Password <span className="text-red-400">*</span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={onInputChange}
            autoComplete="off"
            className="border rounded-md py-2 px-3 w-full outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
          <span
            className="absolute right-3 top-9 cursor-pointer text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white font-semibold rounded-md w-full py-2 mt-4 hover:from-blue-600 hover:via-purple-600 hover:to-indigo-600 transition flex justify-center items-center gap-2 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner /> Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>

        <div className="text-sm text-center mt-2">
          {/* <Link to="/forget-password" className="text-blue-500 hover:underline">Forgot Password?</Link> */}
        </div>

        <hr className="my-2" />

        <div className="text-sm text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;

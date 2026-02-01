import { useState } from "react";
import registerImg from "../assests/registerImg.png";
import { TiUserAdd } from "react-icons/ti";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate, NavLink } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "../assests/spinner/Spinner";
import UserService from "../services/user.service";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    bio: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      toast.error("Please fill in all fields", { position: "top-center" });
      return;
    }
    if (formData.username.includes(" ")) {
      toast.error("Username cannot contain spaces", { position: "top-center" });
      return;
    }
    try {
      setLoading(true);
      const user = await UserService.register(formData);
      setLoading(false);
      toast.success(
        `Welcome ${user.username}! Your account has been created.`,
        {
          position: "top-center",
        }
      );
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Registration failed", {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="md:flex-row flex-col flex gap-10 items-center justify-center min-h-screen px-6 md:px-20 bg-gray-50 py-10">
        {/* Left Image */}
        <div className="md:w-1/3 w-80">
          <img
            src={registerImg}
            alt="register"
            className="rounded-xl shadow-lg"
          />
        </div>

        {/* Right Form */}
        <form
          className="md:w-1/3 w-80 flex flex-col gap-4 bg-white p-8 rounded-2xl shadow-lg"
          onSubmit={submitHandle}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="border-2 rounded-full py-2 px-2 border-blue-500">
              <TiUserAdd className="text-blue-500" size={30} />
            </span>
            <h1 className="text-center text-2xl font-semibold text-blue-500">
              User Signup
            </h1>
          </div>

          {/* Username */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={onInputChange}
            autoComplete="off"
            className="transition-all py-2 px-3 rounded-md border border-blue-500 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={onInputChange}
            autoComplete="off"
            className="transition-all py-2 px-3 rounded-md border border-blue-500 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          {/* Password with eye toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={onInputChange}
              autoComplete="off"
              className="transition-all py-2 px-3 rounded-md border border-blue-500 w-full bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <span
              className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </span>
          </div>

          {/* Bio */}
          <textarea
            name="bio"
            placeholder="Tell us something about yourself..."
            value={formData.bio}
            onChange={onInputChange}
            className="transition-all py-2 px-3 rounded-md border border-blue-500 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
            rows={3}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white font-semibold rounded-md w-full py-2 mt-4 hover:from-blue-600 hover:via-purple-600 hover:to-indigo-600 transition flex justify-center items-center gap-2"
          >
            {loading ? <Spinner /> : "Register"}
          </button>

          <div className="text-sm text-center mt-2">
            Already have an account?{" "}
            <NavLink to="/login" className="text-blue-500 hover:underline">
              Login
            </NavLink>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;

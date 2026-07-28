import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

import logo from "../assets/owl.png";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleLogin = async () => {
    setErrors({});
    setLoading(true);

    try {
      const response = await axios.post(
        "https://kids-api.test/api/auth/login",
        {
          email: email.trim(),
          password,
        },
      );

      console.log(response.data);

      // Save token
      localStorage.setItem("token", response.data.data.token);

      // Save user
      localStorage.setItem("user", JSON.stringify(response.data.data.user));

      toast.success("Login Successful!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error: any) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert(error.response?.data?.message || "Login Failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-300 via-blue-300 to-purple-300 dark:from-gray-900 dark:via-gray-900 dark:to-black px-4 sm:px-6 md:px-8 py-6 md:py-10">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-[32px] shadow-2xl w-full max-w-md px-7 py-8"
      >
        <img
          src={logo}
          alt="Brain Quest"
          className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto mb-5"
        />

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-center text-purple-700">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 dark:text-gray-300 text-sm sm:text-basemt-2 mb-8">
          Login to continue your learning adventure.
        </p>

        {/* Email */}

        <label className="font-bold text-gray-700 dark:text-white text-sm sm:text-base">
          Email Address
        </label>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-2 mb-5 p-3 sm:p-4 rounded-2xl border-2 border-gray-200 focus:border-purple-500 outline-none text-sm sm:text-base dark:bg-gray-700 dark:text-white"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
        )}

        {/* Password */}

        <label className="font-bold text-gray-700 dark:text-white">
          Password
        </label>

        <div className="relative mt-2">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-purple-500 outline-none pr-12 dark:bg-gray-700 dark:text-white"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>
          )}

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Forgot Password */}

        <div className="text-right mt-3">
          <button
            onClick={() => navigate("/forgot-password")}
            className="text-sm sm:text-base text-purple-600 font-semibold hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        {/* Login */}

        <motion.button
          disabled={loading}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleLogin}
          className={`
    w-full
    mt-8
    py-4
    rounded-2xl
    font-black
    text-lg
    shadow-xl
    transition
    ${
      loading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105"
    }
    text-white
  `}
        >
          {loading ? "Logging in..." : "LOGIN"}
        </motion.button>

        <div className="flex items-center my-6 sm:my-7">
          <div className="flex-1 h-px bg-gray-300" />

          <span className="mx-3 text-gray-500">OR</span>

          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <div className="text-center mt-6 text-sm sm:text-base">
          <span className="text-gray-500 dark:text-gray-300">
            Don't have an account?{" "}
          </span>

          <button
            onClick={() => navigate("/register")}
            className="font-bold text-purple-600 hover:text-purple-700 hover:underline transition"
          >
            Create Account
          </button>
        </div>
      </motion.div>
    </div>
  );
}

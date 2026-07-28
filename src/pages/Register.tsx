import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

import logo from "../assets/owl.png";

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    setConfirmPasswordError("");
    setErrors({});
    setLoading(true);

    try {
      const response = await axios.post(
        "https://kids-api.test/api/auth/register",
        {
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim(),
          password,
          password_confirmation: confirmPassword,
        },
      );

      console.log(response.data);

      const token = response.data.data.token;
      const user = response.data.data.user;

      // Save login session
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success(`Welcome ${user.first_name}!`);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error: any) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gradient-to-b
      from-sky-300
      via-blue-300
      to-purple-300
      dark:from-gray-900
      dark:via-gray-900
      dark:to-black
      px-4
      py-6
      "
    >
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
        bg-white
        dark:bg-gray-800
        rounded-[32px]
        shadow-2xl
        w-full
        max-w-md
        px-6
        py-8
        sm:px-8
        "
      >
        {/* Logo */}

        <img src={logo} alt="Brain Quest" className="w-24 h-24 mx-auto mb-4" />

        <h1 className="text-4xl font-black text-center text-purple-700">
          Create Account
        </h1>

        <p className="text-center text-gray-500 dark:text-gray-300 mt-2 mb-8">
          Join Brain Quest and start your learning adventure.
        </p>

        {/* First Name */}

        <label className="font-bold text-gray-700 dark:text-white">
          First Name
        </label>

        <input
          type="text"
          placeholder="Enter First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="
          w-full
          mt-2
          mb-5
          p-4
          rounded-2xl
          border-2
          border-gray-200
          focus:border-purple-500
          outline-none
          dark:bg-gray-700
          dark:text-white
          "
        />
        {errors.first_name && (
          <p className="text-red-500 text-sm mt-1">{errors.first_name[0]}</p>
        )}

        {/* Last Name */}

        <label className="font-bold text-gray-700 dark:text-white">
          Last Name
        </label>

        <input
          type="text"
          placeholder="Enter Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="
          w-full
          mt-2
          mb-5
          p-4
          rounded-2xl
          border-2
          border-gray-200
          focus:border-purple-500
          outline-none
          dark:bg-gray-700
          dark:text-white
          "
        />
        {errors.last_name && (
          <p className="text-red-500 text-sm mt-1">{errors.last_name[0]}</p>
        )}

        {/* Email */}

        <label className="font-bold text-gray-700 dark:text-white">
          Email Address
        </label>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
          w-full
          mt-2
          mb-5
          p-4
          rounded-2xl
          border-2
          border-gray-200
          focus:border-purple-500
          outline-none
          dark:bg-gray-700
          dark:text-white
          "
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
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
            w-full
            p-4
            rounded-2xl
            border-2
            border-gray-200
            focus:border-purple-500
            outline-none
            pr-12
            dark:bg-gray-700
            dark:text-white
            "
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>
          )}

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-gray-500
            "
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Confirm Password */}

        <label className="font-bold text-gray-700 dark:text-white mt-5 block">
          Confirm Password
        </label>

        <div className="relative mt-2">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="
      w-full
      p-4
      rounded-2xl
      border-2
      border-gray-200
      focus:border-purple-500
      outline-none
      pr-12
      dark:bg-gray-700
      dark:text-white
    "
          />

          {confirmPasswordError && (
            <p className="text-red-500 text-sm mt-2">{confirmPasswordError}</p>
          )}

          {errors.password_confirmation && (
            <p className="text-red-500 text-sm mt-2">
              {errors.password_confirmation[0]}
            </p>
          )}

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Register */}

        <motion.button
          disabled={loading}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleRegister}
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
    : "bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105"
}
text-white
`}
        >
          {loading ? "Creating Account..." : "CREATE ACCOUNT"}
        </motion.button>

        {/* Divider */}

        <div className="flex items-center my-7">
          <div className="flex-1 h-px bg-gray-300"></div>

          <span className="mx-3 text-gray-500">OR</span>

          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Login */}

        <div className="text-center text-sm">
          <span className="text-gray-500 dark:text-gray-300">
            Already have an account?
          </span>

          <button
            onClick={() => navigate("/login")}
            className="
            ml-2
            font-bold
            text-purple-600
            hover:text-purple-700
            hover:underline
            transition
            "
          >
            Login
          </button>
        </div>
      </motion.div>
    </div>
  );
}

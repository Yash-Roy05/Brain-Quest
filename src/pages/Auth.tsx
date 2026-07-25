import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import illustration from "../assets/auth-illustration.png";

export default function Auth() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center py-8 md:py-12 bg-gradient-to-b from-sky-300 via-blue-300 to-purple-300 dark:from-gray-900 dark:via-gray-900 dark:to-black px-4">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-[32px] shadow-2xl w-full max-w-sm sm:max-w-md lg:max-w-lg px-6 sm:px-8 py-8 text-center"
      >

        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-black text-purple-700 mb-2"
        >
          Brain Quest
        </motion.h1>

        <p className="text-gray-500 dark:text-gray-300 mb-3">
          Learn • Play • Grow Every Day
        </p>

        <img
          src={illustration}
          alt="Learning"
          className="w-52 sm:w-60 md:w-72 mx-auto mb-8"
        />

        <h2 className="text-3xl font-black mb-2 dark:text-white">
          Welcome!
        </h2>

        <p className="text-gray-500 dark:text-gray-300 mb-6">
          Continue your learning adventure with exciting games and missions.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
        >
          LOGIN
        </button>

        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-gray-300"></div>

          <span className="mx-3 text-gray-500">OR</span>

          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <button
          onClick={() => navigate("/register")}
          className="w-full border-2 border-purple-600 text-purple-700 dark:text-white py-4 rounded-2xl font-black text-lg hover:bg-purple-600 hover:text-white transition-all duration-300"
        >
          CREATE ACCOUNT
        </button>

        <p className="text-sm text-gray-400 mt-8">
          © Brain Quest 2026
        </p>

      </motion.div>

    </div>
  );
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.tsx";
import { Eye, EyeOff } from "lucide-react";

export default function ParentLogin() {
  const navigate = useNavigate();

  const { user } = useUser();

  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const [showPin, setShowPin] = useState(false);

  const handleLogin = () => {
    if (pin.length !== 4) {
      setError("Please enter 4 digit PIN");
      return;
    }

    if (pin === user.parentPin) {
      navigate("/parent-dashboard");
    } else {
      setError("Incorrect PIN");
    }
  };
  return (
    <div className="h-[calc(100vh-100px)] pb-0 md:pb-10 pt-20 md:pt-40 bg-gradient-to-r from-blue-400 to-purple-500 flex items-start justify-center py-8 px-4 mb-0 md:mb-0 dark:from-gray-900 dark:via-gray-900 dark:to-black">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md text-center dark:bg-gray-700">
        <h1 className="text-4xl font-black text-purple-700 mb-2 md:mb-2 dark:text-white">
          Parent Login
        </h1>

        <p className="text-gray-500 mb-4 md:mb-4 dark:text-white">
          Enter Parent PIN
        </p>

        <div className="relative">
          <input
            type={showPin ? "text" : "password"}
            maxLength={4}
            value={pin}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setPin(value);
              setError("");
            }}
            placeholder="Enter 4 Digit PIN"
            className="w-full border-2 rounded-2xl p-4 text-center text-xl pr-12"
          />

          <button
            type="button"
            onClick={() => setShowPin(!showPin)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPin ? <EyeOff size={22} /> : <Eye size={22} />}
          </button>
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <button
          onClick={handleLogin}
          className="
          w-full
          mt-5
          bg-purple-500
          hover:bg-purple-600
          text-white
          py-4
          rounded-2xl
          font-bold
          "
        >
          Login
        </button>
      </div>
    </div>
  );
}

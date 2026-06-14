import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.tsx";

export default function ParentLogin() {
  const navigate = useNavigate();

  const { user } = useUser();

  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = () => {
    if (pin === user.parentPin) {
      navigate("/parent-dashboard");
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-[80vh] pb-0 md:pb-10 pt-9 md:pt-32 bg-gradient-to-r from-blue-400 to-purple-500 flex items-start justify-center py-8 px-4 mb-0 md:mb-0">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md text-center">

        <h1 className="text-4xl font-black text-purple-700 mb-2 md:mb-2">
           Parent Login
        </h1>

        <p className="text-gray-500 mb-4 md:mb-4">
          Enter Parent PIN
        </p>

        <input
          type="password"
          maxLength={6}
          value={pin}
          onChange={(e) => {
            setPin(e.target.value);
            setError(false);
          }}
          placeholder="Enter PIN"
          className="w-full border-2 rounded-2xl p-4 text-center text-xl "
        />

        {error && (
          <p className="text-red-500 mt-2">
            Incorrect PIN
          </p>
        )}

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
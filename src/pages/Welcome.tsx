import { useNavigate } from "react-router-dom";
import owl from "../assets/owl.png";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center py-10 px-4 bg-gradient-to-r from-pink-400 to-purple-500 min-h-[80vh]">

      <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-xl w-full">

        {/* Owl */}
        <img
          src={owl}
          alt="owl"
          className="w-40 mx-auto mb-6 animate-bounce"
        />

        {/* Title */}
        <h1 className="text-5xl font-bold mb-4 text-gray-800">
          Brain Quest 🎮
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 mb-8 text-lg">
          Learn while playing fun missions!
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/profile")}
          className="bg-yellow-400 hover:bg-yellow-500 hover:scale-105 active:scale-95 transition duration-300 px-8 py-4 rounded-2xl text-xl font-bold"
        >
          Start Game 🚀
        </button>

      </div>

    </div>
  );
}
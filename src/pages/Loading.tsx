import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";


export default function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/profile");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-blue-500 flex flex-col items-center justify-center text-white px-6">

      <div className="text-8xl animate-bounce mb-6">
        🧠
      </div>

      <h1 className="text-5xl font-black mb-4">
        Brain Quest
      </h1>

      <p className="text-xl mb-6">
        Loading Adventure...
      </p>

      <div className="w-64 h-3 bg-white/30 rounded-full overflow-hidden">
        <div className="h-full bg-yellow-300 animate-pulse w-full"></div>
      </div>

      <p className="mt-8 text-center text-sm md:text-base">
        💡 Tip: Complete missions to earn bonus XP!
      </p>

    </div>
  );
}
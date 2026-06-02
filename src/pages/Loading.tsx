import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Loading() {
  const navigate = useNavigate();

  const loadingTexts = [
    "Loading Games...",
    "Loading Missions...",
    "Loading Challenges...",
    "Loading Rewards...",
    "Loading Profile...",
    "Almost Ready...",
  ];

  const [currentText, setCurrentText] = useState(0);

  useEffect(() => {
    if (currentText === loadingTexts.length - 1) {
      setTimeout(() => {
        navigate("/create-profile");
      }, 1000);
    }
  }, [currentText, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => {
        if (prev < loadingTexts.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const progress = ((currentText + 1) / loadingTexts.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-blue-500 flex flex-col items-center justify-center text-white px-6">
      <div className="text-8xl animate-bounce mb-6">🧠</div>

      <h1 className="text-5xl font-black mb-4">Brain Quest</h1>

      <p className="text-xl font-bold text-white">
        {loadingTexts[currentText]}
      </p>

      <div className="w-64 h-3 bg-white/30 rounded-full overflow-hidden">
        <div
          className="h-full bg-yellow-300 transition-all duration-1000"
          style={{
            width: `${progress}%`,
          }}
        ></div>
      </div>

      <p className="mt-8 text-center text-sm md:text-base">
        💡 Tip: Complete missions to earn bonus XP!
      </p>
    </div>
  );
}

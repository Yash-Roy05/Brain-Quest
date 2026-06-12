import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.tsx";
import PageWrapper from "../components/PageWrapper.tsx";
import jungle1 from "../assets/difference/jungle1.png";
import jungle2 from "../assets/difference/jungle2.png";

export default function DifferenceGame() {
  const navigate = useNavigate();

  const { user, setUser, addCoins, addXP } = useUser();

  // ✅ Found Differences
  const [found, setFound] = useState<number[]>([]);
  const [hearts, setHearts] = useState(3);

  // 🎯 Click Difference
  const handleFind = (id: number) => {
    if (!found.includes(id)) {
      setFound((prev) => [...prev, id]);
    }
  };

  // ❌ Wrong Click
  const handleWrongClick = () => {
    if (hearts > 0) {
      setHearts((prev) => prev - 1);
    }
  };

  const [showResult, setShowResult] = useState(false);

  const [finalCoins, setFinalCoins] = useState(0);

  const [finalXP, setFinalXP] = useState(0);

  const [showGameOver, setShowGameOver] = useState(false);

  // 🎉 Complete Game
  useEffect(() => {
    if (found.length === 3) {
      // 🪙 Add Rewards
      addCoins(50);

      addXP(25);

      // ✅ Save Mission
      setUser((prev) => ({
        ...prev,

        completedMissions: [...prev.completedMissions, 101],
      }));

      // 🎊 Success Message
      setFinalCoins(50);

      setFinalXP(25);

      setShowResult(true);
    }
  }, [found]);

  // 💔 Game Over
  useEffect(() => {
    if (hearts === 0) {
      setShowGameOver(true);
    }
  }, [hearts]);
  return (
    <PageWrapper>
      {showGameOver && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[30px] md:rounded-[40px] p-6 md:p-10 text-center shadow-2xl w-full max-w-[90%] md:max-w-md animate-[popup_0.4s_ease] dark:bg-gray-700">
            <div className="text-5xl md:text-7xl mb-4">😢</div>

            <h1 className="text-3xl md:text-5xl font-black text-red-600 mb-4 dark:text-white">
              GAME OVER
            </h1>

            <p className="text-lg md:text-2xl font-bold text-gray-600 mb-6 dark:text-white">
              Better luck next time!
            </p>

            <button
              onClick={() => navigate("/dashboard")}
              className="
          bg-red-500
          hover:bg-red-600
          text-white
          px-5
          py-3
          md:px-8
          md:py-4
          rounded-2xl
          text-lg
          md:text-xl
          font-bold
        "
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}

      {showResult && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[30px] p-4 md:p-8 text-center shadow-2xl w-full max-w-md animate-[popup_0.4s_ease-out] dark:bg-gray-800">
            <div className="text-7xl mb-4">🏆</div>

            <h1 className="text-4xl font-black text-purple-700 mb-4 dark:text-white">
              YOU WIN!
            </h1>

            <div className="text-2xl font-bold text-yellow-600 mb-3 dark:text-white">
              🪙 Coins: {finalCoins}
            </div>

            <div className="text-2xl font-bold text-green-600 mb-6 dark:text-white">
              ⚡ XP: {finalXP}
            </div>

            <button
              onClick={() => navigate("/dashboard")}
              className="
          bg-purple-500
          hover:bg-purple-600
          text-white
          px-8
          py-4
          rounded-2xl
          text-xl
          font-bold
        "
            >
              Continue
            </button>
          </div>
        </div>
      )}
      <div className="min-h-screen pb-28 bg-gradient-to-b from-sky-300 via-blue-200 to-green-300 flex items-center justify-center p-4 md:p-10 relative overflow-x-hidden mb-0 md:mb-0 pb-6 pt-4 md:pb-12 md:pt-4 dark:from-gray-900 dark:via-gray-900 dark:to-black">
        {/* 🌳 Hills */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-green-400 rounded-t-[100%] dark:bg-gray-900"></div>

        {/* Main Card */}
        <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-4 md:p-8 w-full max-w-5xl text-center dark:bg-gray-700">
          {/* Title */}
          <h1 className="text-3xl md:text-6xl font-bold mb-1 md:mb-2 text-purple-700 dark:text-white">
            Find the Difference
          </h1>

          <p className="text-base md:text-lg text-gray-600 mb-2 md:mb-2 dark:text-white">
            Find 3 hidden differences!
          </p>

          {/* ❤️ Hearts */}
          <div className="text-4xl mb-2 md:mb-2">{"❤️".repeat(hearts)}</div>

          {/* 🎯 Progress */}
          <div className="text-xl font-bold text-purple-700 mb-2 md:mb-4 dark:text-white">
            Found : {found.length}/3 
          </div>

          {/* 🖼 Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Left Image */}
            <div className="relative">
              <img
                src={jungle1}
                alt="Jungle Left"
                className="w-full h-auto rounded-3xl shadow-xl"
              />
            </div>

            {/* Right Image */}
            <div className="relative" onClick={handleWrongClick}>
              <img
                src={jungle2}
                alt="Jungle Right"
                className="w-full h-auto rounded-3xl shadow-xl"
              />

              {/* 🦜 Bird Difference */}
              <div className="absolute top-[26%] right-[18%] z-20">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFind(1);
                  }}
                  className="
      w-8
      h-8
      md:w-14
      md:h-14
      opacity-0
      cursor-pointer
      hover:bg-white
    "
                />

                {found.includes(1) && (
                  <div
                    className="
        absolute
        top-1/2
        left-1/2
        -translate-x-1/2
        -translate-y-1/2
        w-8
        h-8
        md:w-12
        md:h-12
        bg-green-500
        border-2
        border-white
        rounded-full
        
      "
                  />
                )}
              </div>

              {/* 🌸 Flower Difference */}
              <button
                onClick={(e) => {
                  e.stopPropagation();

                  handleFind(2);
                }}
                className={`absolute bottom-[7%] left-[13%] z-20 w-8 h-8 md:w-12 md:h-12 rounded-full transition duration-300 ${
                  found.includes(2)
                    ? "bg-green-500 border-2 border-white opacity-100 scale-110"
                    : "opacity-0 hover:opacity-20 "
                }`}
              />

              {/* ☁ Cloud Difference */}
              <button
                onClick={(e) => {
                  e.stopPropagation();

                  handleFind(3);
                }}
                className={`absolute top-[15%] right-[10%] z-20 w-8 h-8 md:w-12 md:h-12 rounded-full transition duration-300 ${
                  found.includes(3)
                    ? "bg-green-500 border-2 border-white opacity-100 scale-110"
                    : "opacity-0 hover:opacity-20"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

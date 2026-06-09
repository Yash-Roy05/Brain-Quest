import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.tsx";
import PageWrapper from "../components/PageWrapper.tsx";
import Confetti from "react-confetti";

export default function DragDropGame() {
  const navigate = useNavigate();

  const { setUser, addCoins, addXP } = useUser();

  // ✅ Correct Matches
  const [matched, setMatched] = useState<string[]>([]);

  // ❤️ Hearts
  const [hearts, setHearts] = useState(3);

  // 📱 Mobile Selected Animal
  const [selectedAnimal, setSelectedAnimal] = useState("");

  // 🎉 Message
  const [message, setMessage] = useState("");

  // 🎉 Win Card
  const [showWinCard, setShowWinCard] = useState(false);

  // 💔 Game Over
  const [showGameOver, setShowGameOver] = useState(false);

  // 🎯 Progress
  const progress = (matched.length / 4) * 100;

  // 🎯 Drag Start
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    animal: string,
  ) => {
    e.dataTransfer.setData("animal", animal);
  };

  // 🎯 Match Logic
  const checkMatch = (animal: string, home: string) => {
    const correct =
      (animal === "fish" && home === "ocean") ||
      (animal === "lion" && home === "jungle") ||
      (animal === "camel" && home === "desert") ||
      (animal === "penguin" && home === "snow");

    // ✅ Correct
    if (correct) {
      if (!matched.includes(animal)) {
        navigator.vibrate?.(100);

        setMatched((prev) => [...prev, animal]);

        setMessage("Correct Match 🎉");

        setTimeout(() => {
          setMessage("");
        }, 1000);
      }
    }

    // ❌ Wrong
    else {
      navigator.vibrate?.([100, 50, 100]);

      setHearts((prev) => Math.max(prev - 1, 0));

      setMessage("Wrong Home 😢");

      setTimeout(() => {
        setMessage("");
      }, 1000);
    }

    // 📱 Reset Mobile Selection
    setSelectedAnimal("");
  };

  // 🎯 Drop Logic
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, home: string) => {
    const animal = e.dataTransfer.getData("animal");

    checkMatch(animal, home);
  };

  // 🎉 Complete Game
  useEffect(() => {
    if (matched.length === 4) {
      addCoins(60);

      addXP(30);

      setUser((prev) => ({
        ...prev,

        completedMissions: [...prev.completedMissions, 103],
      }));

      setShowWinCard(true);
    }
  }, [matched]);

  // 💔 Game Over
  useEffect(() => {
    if (hearts === 0) {
      setShowGameOver(true);
    }
  }, [hearts]);

  const finalCoins = 60;
  const finalXP = 30;

  return (
    <PageWrapper>
      {showGameOver && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[30px] md:rounded-[40px] p-6 md:p-10 text-center shadow-2xl w-full max-w-[90%] md:max-w-md animate-[popup_0.4s_ease] dark:bg-gray-600">
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

      {/* 🎉 WIN */}
      {matched.length === 4 && <Confetti />}

      <div className="min-h-screen pb-24 md:pb-24 overflow-x-hidden bg-gradient-to-b from-sky-300 via-blue-200 to-green-300 p-4 md:p-6 flex items-center justify-center mb-0 md:mb-0 pt-4 md:pt-6">
        <div className="bg-white rounded-[30px] md:rounded-[40px] shadow-2xl p-4 md:p-10 w-full max-w-6xl dark:bg-gray-700">
          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-black text-center mb-4 text-purple-700 mb-0 md:mb-2 pt-2 md:pt-0 dark:text-white">
            Animal Home Match
          </h1>

          <p className="text-center text-gray-600 mb-6 text-base md:text-xl font-bold dark:text-white">
            Match animals to their correct homes!
          </p>

          {/* ❤️ Hearts */}
          <div className="text-center text-3xl md:text-5xl mb-0">
            {"❤️".repeat(Math.max(hearts, 0))}
          </div>

          {/* 📈 Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm md:text-lg font-bold mb-2 dark:text-white">
              <span>Progress </span>

              <span>{matched.length}/4</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-4 md:h-5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-pink-400 via-yellow-400 to-green-500 h-4 md:h-5 rounded-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>

          {/* 🎉 Message */}
          {message && (
            <div className="text-center text-xl md:text-3xl font-black text-pink-500 mb-6 animate-pulse">
              {message}
            </div>
          )}

          {/* 🦁 Animals */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
            {/* Fish */}
            {!matched.includes("fish") && (
              <div
                draggable
                onDragStart={(e) => handleDragStart(e, "fish")}
                onClick={() => setSelectedAnimal("fish")}
                className={`
                  bg-blue-100
                  rounded-3xl
                  flex
                  items-center
                  justify-center
                  text-5xl
                  md:text-7xl
                  h-24
                  md:h-32
                  cursor-grab
                  active:scale-90
                  transition
                  duration-300
                  shadow-xl
                  touch-none
                  ${
                    selectedAnimal === "fish"
                      ? "ring-4 ring-blue-500 scale-105"
                      : ""
                  }
                `}
              >
                🐠
              </div>
            )}

            {/* Lion */}
            {!matched.includes("lion") && (
              <div
                draggable
                onDragStart={(e) => handleDragStart(e, "lion")}
                onClick={() => setSelectedAnimal("lion")}
                className={`
                  bg-yellow-100
                  rounded-3xl
                  flex
                  items-center
                  justify-center
                  text-5xl
                  md:text-7xl
                  h-24
                  md:h-32
                  cursor-grab
                  active:scale-90
                  transition
                  duration-300
                  shadow-xl
                  touch-none
                  ${
                    selectedAnimal === "lion"
                      ? "ring-4 ring-yellow-500 scale-105"
                      : ""
                  }
                `}
              >
                🦁
              </div>
            )}

            {/* Camel */}
            {!matched.includes("camel") && (
              <div
                draggable
                onDragStart={(e) => handleDragStart(e, "camel")}
                onClick={() => setSelectedAnimal("camel")}
                className={`
                  bg-orange-100
                  rounded-3xl
                  flex
                  items-center
                  justify-center
                  text-5xl
                  md:text-7xl
                  h-24
                  md:h-32
                  cursor-grab
                  active:scale-90
                  transition
                  duration-300
                  shadow-xl
                  touch-none
                  ${
                    selectedAnimal === "camel"
                      ? "ring-4 ring-orange-500 scale-105"
                      : ""
                  }
                `}
              >
                🐪
              </div>
            )}

            {/* Penguin */}
            {!matched.includes("penguin") && (
              <div
                draggable
                onDragStart={(e) => handleDragStart(e, "penguin")}
                onClick={() => setSelectedAnimal("penguin")}
                className={`
                  bg-cyan-100
                  rounded-3xl
                  flex
                  items-center
                  justify-center
                  text-5xl
                  md:text-7xl
                  h-24
                  md:h-32
                  cursor-grab
                  active:scale-90
                  transition
                  duration-300
                  shadow-xl
                  touch-none
                  ${
                    selectedAnimal === "penguin"
                      ? "ring-4 ring-cyan-500 scale-105"
                      : ""
                  }
                `}
              >
                🐧
              </div>
            )}
          </div>

          {/* 🌍 Homes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-0">
            {/* Desert */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, "desert")}
              onClick={() => {
                if (selectedAnimal) {
                  checkMatch(selectedAnimal, "desert");
                }
              }}
              className="bg-yellow-300 h-28 md:h-40 rounded-3xl flex items-center justify-center text-5xl md:text-7xl shadow-2xl hover:scale-105 transition duration-300"
            >
              🏜️
            </div>

            {/* Ocean */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, "ocean")}
              onClick={() => {
                if (selectedAnimal) {
                  checkMatch(selectedAnimal, "ocean");
                }
              }}
              className="bg-blue-300 h-28 md:h-40 rounded-3xl flex items-center justify-center text-5xl md:text-7xl shadow-2xl hover:scale-105 transition duration-300"
            >
              🌊
            </div>

            {/* Snow */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, "snow")}
              onClick={() => {
                if (selectedAnimal) {
                  checkMatch(selectedAnimal, "snow");
                }
              }}
              className="bg-cyan-200 h-28 md:h-40 rounded-3xl flex items-center justify-center text-5xl md:text-7xl shadow-2xl hover:scale-105 transition duration-300"
            >
              🧊
            </div>

            {/* Jungle */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, "jungle")}
              onClick={() => {
                if (selectedAnimal) {
                  checkMatch(selectedAnimal, "jungle");
                }
              }}
              className="bg-green-300 h-28 md:h-40 rounded-3xl flex items-center justify-center text-5xl md:text-7xl shadow-2xl hover:scale-105 transition duration-300"
            >
              🌳
            </div>
          </div>

          {/* 📱 Mobile: Tap animal → Tap home */}
        </div>
      </div>

      {showWinCard && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-[30px] p-4 md:p-8 text-center shadow-2xl w-full max-w-md animate-[popup_0.4s_ease-out] dark:bg-gray-700">
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
    </PageWrapper>
  );
}

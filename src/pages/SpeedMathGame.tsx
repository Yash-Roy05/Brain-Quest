import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.tsx";
import PageWrapper from "../components/PageWrapper.tsx";
import Confetti from "react-confetti";

export default function SpeedMathGame() {
  const navigate = useNavigate();

  const { setUser, addCoins, addXP } = useUser();

  // ❤️ Hearts
  const [hearts, setHearts] = useState(3);

  // ⏱ Timer
  const [timeLeft, setTimeLeft] = useState(50);

  // 🪙 Score
  const [score, setScore] = useState(0);

  const progress = Math.min((score / 70) * 100, 100);

  // 🔥 Combo
  const [combo, setCombo] = useState(0);
  const [message, setMessage] = useState("");

  // WIN & GAME OVER CARDS
  const [showWinCard, setShowWinCard] = useState(false);
  const [showGameOverCard, setShowGameOverCard] = useState(false);

  const [finalCoins, setFinalCoins] = useState(0);
  const [finalXP, setFinalXP] = useState(0);

  // 🎯 Current Question
  const [question, setQuestion] = useState({
    num1: 5,
    num2: 5,
    answer: 10,
  });
  const messages = [
    "Amazing 🔥",
    "Awesome 😍",
    "Super Fast ⚡",
    "Great Job 🎉",
    "Math Master 🧠",
  ];

  // 🔘 Options
  const [options, setOptions] = useState<number[]>([]);

  // 🎲 Generate Question + Options
  const generateQuestion = () => {
    let maxNumber = 20;

    // 🔥 Difficulty Increase
    if (score >= 30) {
      maxNumber = 40;
    }

    if (score >= 60) {
      maxNumber = 70;
    }

    if (score >= 90) {
      maxNumber = 100;
    }

    const num1 = Math.floor(Math.random() * maxNumber) + 1;

    const num2 = Math.floor(Math.random() * maxNumber) + 1;

    const correctAnswer = num1 + num2;

    const newOptions = [correctAnswer];

    while (newOptions.length < 4) {
      const randomOption = correctAnswer + Math.floor(Math.random() * 15) - 7;

      if (!newOptions.includes(randomOption) && randomOption > 0) {
        newOptions.push(randomOption);
      }
    }

    // 🎲 Shuffle Once
    newOptions.sort(() => Math.random() - 0.5);

    setQuestion({
      num1,
      num2,
      answer: correctAnswer,
    });

    setOptions(newOptions);
  };

  // 🚀 First Question
  useEffect(() => {
    generateQuestion();
  }, []);

  // ⏱ Timer
  useEffect(() => {
    if (showGameOverCard || showWinCard) return;
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setShowGameOverCard(true);
    }
  }, [timeLeft]);

  // 🎉 Win
  useEffect(() => {
    if (score >= 70) {
      const coins = 80;
      const xp = 40;

      addCoins(coins);
      addXP(xp);

      setFinalCoins(coins);
      setFinalXP(xp);

      setUser((prev) => ({
        ...prev,
        completedMissions: [...prev.completedMissions, 201],
      }));

      setShowWinCard(true);
    }
  }, [score]);

  // 💔 Game Over
  useEffect(() => {
    if (hearts === 0) {
      setShowGameOverCard(true);
    }
  }, [hearts]);

  // ✅ Check Answer
  const checkAnswer = (selected: number) => {
    if (showGameOverCard || showWinCard) return;
    if (selected === question.answer) {
      navigator.vibrate?.(100);

      setScore((prev) => prev + 10);

      setCombo((prev) => prev + 1);

      const randomMessage =
        messages[Math.floor(Math.random() * messages.length)];

      setMessage(randomMessage);

      setTimeout(() => {
        setMessage("");
      }, 1000);
    } else {
      setHearts((prev) => prev - 1);

      setCombo(0);
    }

    generateQuestion();
  };

  return (
    <PageWrapper>
      {showWinCard && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[30px] p-6 md:p-8 text-center shadow-2xl w-full max-w-md animate-[popup_0.4s_ease-out]">
            <div className="text-7xl mb-4">🏆</div>

            <h1 className="text-4xl font-black text-purple-700 mb-4">
              YOU WIN!
            </h1>

            <div className="text-2xl font-bold text-yellow-600 mb-3">
              🪙 Coins: {finalCoins}
            </div>

            <div className="text-2xl font-bold text-green-600 mb-6">
              ⚡ XP: {finalXP}
            </div>

            <button
              onClick={() => navigate("/dashboard")}
              className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-2xl text-xl font-bold"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {showGameOverCard && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[30px] p-6 md:p-8 text-center shadow-2xl w-full max-w-md">
            <div className="text-7xl mb-4">😢</div>

            <h1 className="text-4xl font-black text-red-600 mb-2">GAME OVER</h1>

            <p className="text-xl font-bold text-gray-600 mb-4">
              Better luck next time!
            </p>

            <button
              onClick={() => navigate("/dashboard")}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-2xl text-xl font-bold"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}

      {/* 🎉 Confetti */}
      {showWinCard && <Confetti />}

      <div className="min-h-screen pb-6 md:pb-8 bg-gradient-to-b from-purple-400 via-pink-300 to-yellow-200 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Main Card */}
        <div className="bg-white rounded-[40px] shadow-2xl p-6 md:p-10 w-full max-w-3xl text-center relative z-10 border-8 border-white">
          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-black mb-2 text-purple-700">
            Speed Math Battle
          </h1>

          {/* Hearts */}
          <div className="text-4xl mb-3">{"❤️".repeat(hearts)}</div>

          {/* Timer */}
          <div className="text-2xl font-bold text-red-500 mb-2">
            ⏱ {timeLeft}s
          </div>

          {/* Score */}
          <div className="text-xl font-bold text-yellow-600 mb-2">
            Score: {score} 🪙
          </div>

          {/* Goal */}
          <div className="text-lg font-bold text-blue-600 mb-1">
            Reach 70 Score To Win 🏆
          </div>

          {/* 📈 Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm font-bold mb-1">
              <span>Progress</span>

              <span>{score}/70</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-green-400 via-yellow-400 to-orange-500 h-5 rounded-full transition-all duration-500 "
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>

          {/* Combo */}
          <div className="text-xl font-bold text-purple-600 mb-4">
            Streak: {combo}
          </div>

          {/* Question */}
          <div className="bg-blue-100 rounded-[35px] p-8 mb-8 shadow-xl border-4 border-blue-200">
            <h2 className="text-5xl md:text-6xl font-black text-gray-800">
              {question.num1} + {question.num2}
            </h2>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-5">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => checkAnswer(option)}
                className="bg-green-400 active:scale-90 hover:scale-105 transition duration-300 text-white text-3xl font-black py-6 rounded-[30px] shadow-xl border-b-8 border-green-600"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

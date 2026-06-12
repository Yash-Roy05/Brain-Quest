import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.tsx";
import PageWrapper from "../components/PageWrapper.tsx";
import Confetti from "react-confetti";

export default function CodeBreakerGame() {
  const navigate = useNavigate();

  // Toggle History
  const [showHistory, setShowHistory] = useState(false);

  const { setUser, addCoins, addXP } = useUser();

  // 🎉 Result Screen
  const [showResult, setShowResult] = useState(false);

  // add coins and xp on win

  // 🔐 Secret Code
  const [secretCode, setSecretCode] = useState("");

  // 👤 User Guess
  const [guess, setGuess] = useState("");

  // 💡 Result Hint
  const [hint, setHint] = useState("");

  // 🧠 Smart Hints
  const [smartHints, setSmartHints] = useState<string[]>([]);

  // 🎯 Attempts
  const [attempts, setAttempts] = useState(15);

  // 🎉 Win State
  const [won, setWon] = useState(false);

  // Game Over State
  const [showGameOver, setShowGameOver] = useState(false);

  // ⏱ Timer
  const [time, setTime] = useState(0);

  // 🪙 Final Rewards
  const [finalCoins, setFinalCoins] = useState(0);

  const [finalXP, setFinalXP] = useState(0);

  // 📜 Guess History
  const [history, setHistory] = useState<
    {
      guess: string;
      result: string;
    }[]
  >([]);

  // 📈 Progress
  const progress = ((15 - attempts) / 15) * 100;

  // ⏱ Stopwatch
  useEffect(() => {
    if (won) return;

    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [won]);

  // 🚀 Start Game
  useEffect(() => {
    generateSecretCode();
  }, []);

  // 🧠 Generate Smart Hints
  const generateSmartHints = (code: string) => {
    const hints = [];

    const first = Number(code[0]);

    const second = Number(code[1]);

    const third = Number(code[2]);

    // 📈 Greater / Smaller
    if (Number(code) > 500) {
      hints.push("Number is greater than 500 📈");
    } else {
      hints.push("Number is smaller than 500 📉");
    }

    // 🔢 First Digit
    if (first % 2 === 0) {
      hints.push("First digit is even 🔢");
    } else {
      hints.push("First digit is odd 🔢");
    }

    // 🎯 Last Digit
    if (third < 5) {
      hints.push("Last digit is smaller than 5 🎯");
    } else {
      hints.push("Last digit is 5 or greater 🎯");
    }

    // 🧠 Odd Count
    const oddCount = [first, second, third].filter(
      (num) => num % 2 !== 0,
    ).length;

    hints.push(`${oddCount} odd digits present 🧠`);

    setSmartHints(hints);
  };

  // 🔐 Generate Secret Code
  const generateSecretCode = () => {
    let code = "";

    // ❌ No Repeat Digits
    while (code.length < 3) {
      const randomDigit = Math.floor(Math.random() * 10).toString();

      if (!code.includes(randomDigit)) {
        code += randomDigit;
      }
    }

    setSecretCode(code);

    generateSmartHints(code);
  };

  // 🎯 Check Guess
  const checkGuess = () => {
    if (guess.length !== 3) {
      setHint("Enter 3 Digits ⚠️");

      return;
    }

    // 🎉 Correct
    if (guess === secretCode) {
      let coins = 150;

      let xp = 80;

      // ⚡ Fast Bonus
      if (time <= 30) {
        coins = 220;

        xp = 120;
      } else if (time <= 60) {
        coins = 180;

        xp = 100;
      }

      addCoins(coins);

      addXP(xp);

      setFinalCoins(coins);

      setFinalXP(xp);

      setUser((prev) => ({
        ...prev,

        completedMissions: [...prev.completedMissions, 301],
      }));

      navigator.vibrate?.(200);

      setWon(true);

      setHint("Code Cracked 🎉");

      return;
    }

    let correctPosition = 0;

    let correctDigit = 0;

    // 🔍 Check Digits
    for (let i = 0; i < 3; i++) {
      if (guess[i] === secretCode[i]) {
        correctPosition++;
      } else if (secretCode.includes(guess[i])) {
        correctDigit++;
      }
    }

    navigator.vibrate?.([100, 50, 100]);

    const resultMessage = `✅ ${correctPosition} Correct Position | 🔄 ${correctDigit} Correct But Wrong Place`;

    setHint(resultMessage);

    // 📜 Save History
    setHistory((prev) => [
      {
        guess,
        result: resultMessage,
      },

      ...prev,
    ]);

    setAttempts((prev) => prev - 1);

    setGuess("");
  };

  // 💔 Game Over
  useEffect(() => {
    if (attempts === 0) {
      setShowGameOver(true);
    }
  }, [attempts]);

  return (
    <>
      {/* 🎉 Confetti */}
      {won && <Confetti />}

      {/* 🏆 Result Screen */}
      {won && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-[40px] p-10 text-center shadow-2xl w-[90%] max-w-md animate-[popup_0.4s_ease]">
            <div className="text-7xl mb-4">🔐</div>

            <h1 className="text-3xl md:text-5xl font-black text-green-600 mb-6">
              CODE CRACKED!
            </h1>

            <div className="text-2xl font-bold text-blue-600 mb-3">
              ⏱ Time: {time}s
            </div>

            <div className="text-2xl font-bold text-yellow-600 mb-3">
              🪙 Coins: {finalCoins}
            </div>

            <div className="text-2xl font-bold text-purple-600 mb-6">
              ⚡ XP: {finalXP}
            </div>

            <button
              onClick={() => navigate("/dashboard")}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 md:py-6 rounded-2xl text-lg md:text-3xl font-bold hover:scale-105 transition duration-300"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {showGameOver && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[30px] md:rounded-[40px] p-6 md:p-10 text-center shadow-2xl w-full max-w-[90%] md:max-w-md animate-[popup_0.4s_ease]">
            <div className="text-5xl md:text-7xl mb-4">😢</div>

            <h1 className="text-3xl md:text-5xl font-black text-red-600 mb-4">
              GAME OVER
            </h1>

            <p className="text-lg md:text-2xl font-bold text-gray-600 mb-6">
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

      <PageWrapper>
        <div className="min-h-screen pb-6 md:pb-8 bg-gradient-to-b from-gray-900 via-gray-800 to-black flex items-center justify-center p-6 relative overflow-hidden">
          {/* Main Card */}
          <div className="bg-white rounded-[25px] md:rounded-[40px] shadow-2xl p-4 md:p-10 w-full max-w-md md:max-w-xl text-center relative z-10">
            {/* Title */}
            <h1 className="text-5xl font-black text-gray-800 mb-2">
              Code Breaker
            </h1>

            {/* Attempts */}
            <div className="text-2xl font-bold text-red-500 mb-2">
              Attempts Left: {attempts}
            </div>

            {/* Timer */}
            <div className="text-2xl font-bold text-blue-600 mb-6">
              ⏱ Time: {time}s
            </div>

            {/* Goal */}
            <div className="text-lg font-bold text-green-600 mb-2">
              Crack The 3-Digit Secret Code
            </div>

            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-sm font-bold mb-2">
                <span>Attempts Used </span>

                <span>{15 - attempts}/15</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-red-400 via-yellow-400 to-green-500 h-5 rounded-full transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>
            </div>

            {/* 🧠 Smart Hints */}
            <div className="bg-blue-50 rounded-3xl p-6 mb-8 text-left shadow-inner">
              <h2 className="text-2xl font-black text-blue-700 mb-4 text-center">
                Smart Hints
              </h2>

              <div className="space-y-3">
                {smartHints.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl px-4 py-3 md:py-6 font-bold text-gray-700 shadow"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Input */}
            <input
              type="text"
              value={guess}
              maxLength={3}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");

                setGuess(value);
              }}
              placeholder="Enter 3 Digits"
              className="w-full text-xl md:text-4xl tracking-normal md:tracking-widest border-4 border-gray-300 focus:border-green-500 outline-none rounded-2xl px-6 py-3 md:py-6 font-bold text-center mb-6 p-3 md:p-6"
            />

            {/* Check Button */}
            <button
              onClick={checkGuess}
              className="bg-green-500 hover:bg-green-600 hover:scale-105 active:scale-95 transition duration-300 text-white text-lg md:text-3xl font-bold px-10 py-3 md:py-6 rounded-2xl shadow-xl mb-8"
            >
              Crack Code
            </button>

            {/* Hint */}
            <div className="bg-gray-100 rounded-3xl p-6 shadow-inner mb-8">
              <h2 className="text-2xl font-black text-purple-700 mb-3">
                Result 💡
              </h2>

              <p className="text-xl font-bold text-gray-700">
                {hint || "Start Guessing 🔍"}
              </p>
            </div>

            {/* 📜 Guess History */}
            <div className="bg-gray-50 rounded-3xl p-6 shadow-inner text-left">
              <h2 className="text-2xl font-black text-gray-800 mb-4 text-center">
                Guess History 📜
              </h2>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {history.length === 0 && (
                  <div className="text-center text-gray-500 font-bold">
                    No guesses yet 🤔
                  </div>
                )}

                {/* 📜 Guess History */}
                <div className="bg-gray-50 rounded-3xl p-6 shadow-inner text-left">
                  <h2 className="text-2xl font-black text-gray-800 mb-4 text-center">
                    Guess History 📜
                  </h2>

                  {/* Toggle Button */}
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="
      bg-blue-500
      hover:bg-blue-600
      text-white
      px-5
      py-3
      rounded-2xl
      font-bold
      shadow-lg
      mb-4
      w-full
    "
                  >
                    {showHistory
                      ? "Hide History "
                      : `Show History (${history.length})`}
                  </button>

                  {history.length === 0 ? (
                    <div className="text-center text-gray-500 font-bold">
                      No guesses yet 🤔
                    </div>
                  ) : (
                    showHistory && (
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {history.map((item, index) => (
                          <div
                            key={index}
                            className="bg-white rounded-2xl p-4 shadow flex flex-col md:flex-row md:items-center md:justify-between"
                          >
                            <div className="text-xl font-black text-blue-700 mb-5">
                              {item.guess}
                            </div>

                            <div className="text-sm md:text-base font-bold text-gray-700 mt-2 md:mt-0">
                              {item.result}
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
}

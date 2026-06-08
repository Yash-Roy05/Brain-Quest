import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.tsx";
import PageWrapper from "../components/PageWrapper.tsx";
import Confetti from "react-confetti";

export default function PatternMemoryGame() {
  const navigate = useNavigate();

  const { setUser, addCoins, addXP } = useUser();

  // ❤️ Hearts
  const [hearts, setHearts] = useState(3);

  // 🎯 Level
  const [level, setLevel] = useState(1);

  // 🔴 Pattern
  const [pattern, setPattern] = useState<string[]>([]);

  // 👆 Player Input
  const [playerInput, setPlayerInput] = useState<string[]>([]);

  // 👀 Showing Pattern
  const [showPattern, setShowPattern] = useState(true);

  // ✨ Active Color
  const [activeColor, setActiveColor] = useState("");

  // 🔄 Replay Trigger
  const [replayTrigger, setReplayTrigger] = useState(0);

  // 🎉 Result Screen
  const [showResult, setShowResult] = useState(false);

  // ⏱ Stopwatch
  const [time, setTime] = useState(0);

  // 🪙 Final Rewards
  const [finalCoins, setFinalCoins] = useState(0);

  const [finalXP, setFinalXP] = useState(0);

  // 🎨 Colors
  const colors = ["red", "green", "blue", "yellow"];

  // 💔 Game over
  const [showGameOver, setShowGameOver] = useState(false);

  // ⏱ Timer
  useEffect(() => {
    if (showResult) return;

    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [showResult]);

  // 🎲 Generate Pattern
  const generatePattern = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    setPattern((prev) => [...prev, randomColor]);
  };

  // 🚀 First Pattern
  useEffect(() => {
    generatePattern();
  }, []);

  // 👀 Show Pattern Animation
  useEffect(() => {
    if (pattern.length === 0) return;

    setShowPattern(true);

    let index = 0;

    const interval = setInterval(
      () => {
        setActiveColor(pattern[index]);

        // ✨ Remove Glow
        setTimeout(
          () => {
            setActiveColor("");
          },
          Math.max(150, 500 - level * 40),
        );

        index++;

        // ✅ Finish Pattern
        if (index >= pattern.length) {
          clearInterval(interval);

          setTimeout(() => {
            setShowPattern(false);
          }, 700);
        }
      },
      Math.max(250, 1000 - level * 80),
    );

    return () => clearInterval(interval);
  }, [pattern, level, replayTrigger]);

  // 🎯 Player Click
  const handleClick = (color: string) => {
    if (showPattern) return;

    navigator.vibrate?.(50);

    const newInput = [...playerInput, color];

    setPlayerInput(newInput);

    const currentIndex = newInput.length - 1;

    // ❌ Wrong
    if (newInput[currentIndex] !== pattern[currentIndex]) {
      navigator.vibrate?.([100, 50, 100]);

      setHearts((prev) => prev - 1);

      setPlayerInput([]);

      return;
    }

    // ✅ Level Complete
    if (newInput.length === pattern.length) {
      navigator.vibrate?.(200);

      setTimeout(() => {
        setLevel((prev) => prev + 1);

        setPlayerInput([]);

        generatePattern();
      }, 1000);
    }
  };

  // 🎉 Win Condition
  useEffect(() => {
    if (level > 7 && !showResult && !showGameOver) {
      let coins = 100;

      let xp = 50;

      // ⚡ Fast Finish
      if (time <= 40) {
        coins = 180;

        xp = 90;
      }

      // 🚀 Medium
      else if (time <= 70) {
        coins = 140;

        xp = 70;
      }

      addCoins(coins);

      addXP(xp);

      setFinalCoins(coins);

      setFinalXP(xp);

      setUser((prev) => ({
        ...prev,

        completedMissions: [...prev.completedMissions, 203],
      }));

      setShowResult(true);
    }
  }, [level]);

  // 💔 Game Over
  useEffect(() => {
    if (hearts === 0) {
      setShowGameOver(true);
    }
  }, [hearts]);

  return (
    <>
      {showGameOver && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[40px] p-10 text-center shadow-2xl w-[90%] max-w-md">
            <div className="text-7xl mb-4">😢</div>

            <h1 className="text-5xl font-black text-red-600 mb-4">GAME OVER</h1>

            <p className="text-xl font-bold text-gray-600 mb-6">
              Better luck next time!
            </p>

            <button
              onClick={() => navigate("/dashboard")}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-2xl text-xl font-bold"
            >
              Back To Dashboard
            </button>
          </div>
        </div>
      )}

      {/* 🎉 Result Screen */}
      {showResult && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-[40px] p-10 text-center shadow-2xl w-[90%] max-w-md animate-[popup_0.4s_ease]">
            <div className="text-7xl mb-4">🏆</div>

            <h1 className="text-5xl font-black text-purple-700 mb-2">
              MISSION COMPLETED!
            </h1>

            <div className="text-2xl font-bold text-blue-600 mb-3">
              ⏱ Time: {time}s
            </div>

            <div className="text-2xl font-bold text-yellow-600 mb-3">
              🪙 Coins: {finalCoins}
            </div>

            <div className="text-2xl font-bold text-green-600 mb-6">
              ⚡ XP: {finalXP}
            </div>

            <button
              onClick={() => navigate("/dashboard")}
              className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-2xl text-xl font-bold hover:scale-105 transition duration-300"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      <PageWrapper>
        {showResult && <Confetti />}

        <div className="min-h-screen pb-28 bg-gradient-to-b from-indigo-400 via-purple-400 to-pink-300 flex items-center justify-center p-6 relative overflow-hidden">
          {/* Main Card */}
          <div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-10 w-full max-w-3xl text-center relative z-10">
            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-black text-purple-700 mb-2">
              Memory Master
            </h1>
            {/* Hearts */}
            <div className="text-4xl mb-2">{"❤️".repeat(hearts)}</div>
            {/* Level */}
            <div className="text-2xl font-bold text-blue-600 mb-2">
              Level: {level}
            </div>
            {/* Difficulty */}
            <div className="text-lg font-bold text-red-500 mb-2">
              Difficulty:{" "}
              {level <= 2 ? "Easy 😊" : level <= 4 ? "Medium 😎" : "Hard 🔥"}
            </div>
            {/* Time */}
            <div className="text-2xl font-bold text-orange-500 mb-4">
              ⏱ Time: {time}s
            </div>
            {/* Status */}
            <div className="text-3xl md:text-3xl font-bold text-purple-700 mb-3 pt-3">
              {showPattern ? "Watch Carefully 👀" : "Your Turn 🎯"}
            </div>
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-sm font-bold mb-2">
                <span>Progress </span>

                <span>{level - 1}/7</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-500 h-5 rounded-full transition-all duration-500"
                  style={{
                    width: `${((level - 1) / 7) * 100}%`,
                  }}
                />
              </div>
            </div>
            {/* Replay button */}
            <div className="flex justify-end mt-3">
              <button
                onClick={() => {
                  if (!showPattern) {
                    setPlayerInput([]);

                    setReplayTrigger((prev) => prev + 1);
                  }
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-xl font-bold text-sm shadow-lg hover:scale-105 transition duration-300 mb-4"
              >
                🔄 Replay
              </button>
            </div>
            {/* Buttons */}
            <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
              {/* 🔴 Red */}
              <button
                onClick={() => handleClick("red")}
                className={`h-32 rounded-3xl shadow-xl transition duration-300 ${
                  activeColor === "red"
                    ? "bg-red-300 scale-110"
                    : "bg-red-500 hover:scale-105"
                }`}
              />

              {/* 🟢 Green */}
              <button
                onClick={() => handleClick("green")}
                className={`h-32 rounded-3xl shadow-xl transition duration-300 ${
                  activeColor === "green"
                    ? "bg-green-300 scale-110"
                    : "bg-green-500 hover:scale-105"
                }`}
              />

              {/* 🔵 Blue */}
              <button
                onClick={() => handleClick("blue")}
                className={`h-32 rounded-3xl shadow-xl transition duration-300 ${
                  activeColor === "blue"
                    ? "bg-blue-300 scale-110"
                    : "bg-blue-500 hover:scale-105"
                }`}
              />

              {/* 🟡 Yellow */}
              <button
                onClick={() => handleClick("yellow")}
                className={`h-32 rounded-3xl shadow-xl transition duration-300 ${
                  activeColor === "yellow"
                    ? "bg-yellow-300 scale-110"
                    : "bg-yellow-500 hover:scale-105"
                }`}
              />
            </div>
            {/* Player Input */}
            <div className="mt-8 text-xl font-bold text-purple-700">
              Your Pattern:{" "}
              {playerInput.map((item, index) => (
                <span key={index}>{item} </span>
              ))}
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
}

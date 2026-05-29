import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper.tsx";

export default function ReflexTapGame() {

  const navigate = useNavigate();

  // ❤️ Hearts
  const [hearts, setHearts] =
    useState(3);

  // 🪙 Score
  const [score, setScore] =
    useState(0);

  // 🎯 Target Position
  const [position, setPosition] =
    useState({
      top: 40,
      left: 40,
    });

  // 🎨 Target Type
  const [targetType, setTargetType] =
    useState<
      "good" | "bad"
    >("good");

  // 👀 Show Target
  const [showTarget, setShowTarget] =
    useState(true);

  // 🎉 Win
  const [won, setWon] =
    useState(false);

  // 💔 Game Over
  const [gameOver, setGameOver] =
    useState(false);

  // ⚡ Speed
  const speed =
    Math.max(
      400,
      1200 - score * 8
    );

  // 🚀 Move Target
  const moveTarget = () => {

    const randomTop =
  Math.random() * 60;

    const randomLeft =
  Math.random() * 65;

    setPosition({
      top: randomTop,
      left: randomLeft,
    });

    // 🎨 Random Type
    const randomType =
      Math.random() > 0.25
        ? "good"
        : "bad";

    setTargetType(
      randomType
    );

    setShowTarget(true);

  };

  // ⏳ Auto Spawn
  useEffect(() => {

    if (
      won ||
      gameOver
    ) return;

    moveTarget();

    const interval =
      setInterval(() => {

        // ❌ Missed Green
        if (
          showTarget &&
          targetType === "good"
        ) {

          setHearts(
            (prev) => {

              const newHearts =
                Math.max(
                  prev - 1,
                  0
                );

              if (
                newHearts === 0
              ) {

                setGameOver(
                  true
                );

              }

              return newHearts;

            }
          );

        }

        moveTarget();

      }, speed);

    return () =>
      clearInterval(
        interval
      );

  }, [
    score,
    showTarget,
    targetType,
    won,
    gameOver,
  ]);

  // 🎯 Handle Tap
  const handleTap = () => {

    setShowTarget(false);

    // ✅ GOOD TARGET
    if (
      targetType === "good"
    ) {

      navigator.vibrate?.(
        100
      );

      setScore(
        (prev) =>
          prev + 10
      );

    }

    // ❌ BAD TARGET
    else {

      navigator.vibrate?.([
        100,
        50,
        100,
      ]);

      setHearts(
        (prev) => {

          const newHearts =
            Math.max(
              prev - 1,
              0
            );

          if (
            newHearts === 0
          ) {

            setGameOver(
              true
            );

          }

          return newHearts;

        }
      );

    }

  };

  // 🎉 Win Condition
  useEffect(() => {

    if (
      score >= 100
    ) {

      setWon(true);

    }

  }, [score]);

  return (

    <PageWrapper>

<div className="min-h-screen overflow-hidden">
      {/* 🎉 WIN */}
      {won && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-white rounded-[40px] p-4 md:p-10text-center shadow-2xl w-[90%] max-w-[90%] md:max-w-md">

            <div className="text-8xl mb-4 animate-bounce">
              🏆
            </div>

            <h1 className="text-5xl font-black text-green-600 mb-4">
              You Win!
            </h1>

            <p className="text-xl font-bold text-gray-600 mb-8">
              Amazing Reflexes ⚡
            </p>

            <button
              onClick={() =>
                navigate("/dashboard")
              }
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl text-lg md:text-2xl font-black hover:scale-105 transition duration-300"
            >
              Continue 🚀
            </button>

          </div>

        </div>

      )}

      {/* 💔 GAME OVER */}
      {gameOver && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-white rounded-[40px] p-4 md:p-10 text-center shadow-2xl w-[90%] max-w-[90%] md:max-w-md">

            <div className="text-8xl mb-4">
              😢
            </div>

            <h1 className="text-5xl font-black text-red-500 mb-4">
              Game Over
            </h1>

            <p className="text-xl font-bold text-gray-600 mb-8">
              Try Again Faster ⚡
            </p>

            <button
              onClick={() =>
                window.location.reload()
              }
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-2xl text-lg md:text-2xl font-black hover:scale-105 transition duration-300"
            >
              Retry 🔄
            </button>

          </div>

        </div>

      )}

      <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black overflow-hidden relative">

        {/* Header */}
        <div className="flex justify-between items-center p-6">

          {/* Hearts */}
          <div className="text-4xl">
            {
              "❤️".repeat(
                Math.max(
                  hearts,
                  0
                )
              )
            }
          </div>

          {/* Score */}
          <div className="text-3xl font-black text-cyan-400">

            {score} ⚡

          </div>

        </div>

        {/* Title */}
        <div className="text-center mt-4">

          <h1 className="text-5xl text-3xl md:text-6xl font-black text-white mb-4">

            Reflex Tap ⚡

          </h1>

          <p className="text-xl font-bold text-purple-300">

            Tap Green • Avoid Red

          </p>

        </div>

        {/* Progress */}
        <div className="max-w-xl mx-auto mt-8 px-6">

          <div className="flex justify-between text-white font-bold mb-2">

            <span>
              Progress 🚀
            </span>

            <span>
              {score}/100
            </span>

          </div>

          <div className="w-full bg-gray-700 rounded-full h-5 overflow-hidden">

            <div
              className="bg-gradient-to-r from-cyan-400 via-green-400 to-yellow-400 h-5 rounded-full transition-all duration-500"
              style={{
                width: `${
                  Math.min(
                    score,
                    100
                  )
                }%`,
              }}
            />

          </div>

        </div>

        {/* Target */}
        {showTarget && (

          <button
            onClick={handleTap}
            className={`
              absolute
              w-24
              h-24
              rounded-full
              shadow-[0_0_40px]
              transition-all
              duration-200
              hover:scale-110
              active:scale-90
              animate-pulse
              ${
                targetType ===
                "good"
                  ? "bg-green-400 text-black shadow-green-400"
                  : "bg-red-500 text-white shadow-red-500"
              }
            `}
            style={{
              top: `${position.top}%`,
              left: `${position.left}%`,
            }}
          >

            <span className="text-4xl font-black">

              {targetType ===
              "good"
                ? "⚡"
                : "💣"}

            </span>

          </button>

        )}

        {/* Bottom Info */}
        <div className="absolute bottom-8 left-0 right-0 text-center">

          <p className="text-lg font-bold text-gray-300">

            Reach 100 Score To Win 🏆

          </p>

        </div>

      </div>
    </div>
    </PageWrapper>

  );

}
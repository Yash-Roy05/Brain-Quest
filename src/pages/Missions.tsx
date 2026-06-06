import { useState } from "react";
import { useUser } from "../context/UserContext.tsx";

export default function Missions() {
  const { user } = useUser();

  const [showAll, setShowAll] = useState(false);

  const totalMissions = 12;

  const completedMissions = user.completedMissions.length;

  const remainingMissions = totalMissions - completedMissions;

  const progress = (completedMissions / totalMissions) * 100;

  const activeMissions = [
    "🎮 Play 3 Games",
    "⚡ Earn 500 XP",
    "🏆 Win 5 Times",
    "🧠 Complete Quiz",
    "🔥 7 Day Streak",
    "⭐ Reach Level 5",
    "🎯 Earn 1000 Coins",
  ];

  const visibleMissions = showAll ? activeMissions : activeMissions.slice(0, 3);

  return (
    <div className="min-h-screen px-4 py-6 pb-6 pt-2 md:pb-8 md:pt-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-0 md:mb-2">
          <h1 className="text-4xl md:text-5xl font-black text-gray-800 ">
            Missions
          </h1>
        </div>

        <div className="text-center mb-3 md:mb-4">
          <p className="text-gray-700 mt-2 text-lg font-semibold">
            Track your learning progress
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 md:gap-2 mb-4 md:mb-4">
          <div className="bg-white rounded-3xl shadow-lg p-4 text-center">
            <h2 className="text-2xl font-black">{totalMissions}</h2>

            <p className="text-gray-500 text-sm">Total</p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-4 text-center">
            <h2 className="text-2xl font-black text-green-600">
              {completedMissions}
            </h2>

            <p className="text-gray-500 text-sm">Completed</p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-4 text-center">
            <h2 className="text-2xl font-black text-orange-500">
              {remainingMissions}
            </h2>

            <p className="text-gray-500 text-sm">Remaining</p>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-3xl shadow-lg p-4 mb-4 md:mb-4">
          <div className="flex justify-between mb-3 font-bold">
            <span>Overall Progress</span>

            <span>
              {completedMissions}/{totalMissions}
            </span>
          </div>

          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-3 bg-blue-500 rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        {/* Active Missions */}
        <div className="bg-white rounded-3xl shadow-lg p-4 mb-4 md:mb-4">
          <h2 className="text-xl font-black mb-4">Active Missions</h2>

          <div className="grid md:grid-cols-3 gap-3 md:gap-2">
            {visibleMissions.map((mission, index) => (
              <div
                key={index}
                className="
    bg-gray-100
    rounded-2xl
    p-5
    cursor-pointer
    transition-all
    duration-300
    hover:scale-105
    hover:shadow-xl
    hover:bg-white
    border
    border-transparent
    hover:border-blue-300
  "
              >
                {mission}
              </div>
            ))}
          </div>

          <div className="text-center mt-4 md:mt-0">
            <button
              onClick={() => setShowAll(!showAll)}
              className="
      bg-blue-500
      hover:bg-blue-600
      hover:scale-105
      transition
      text-white
      font-bold
      px-6
      py-3
      rounded-2xl
    "
            >
              {showAll ? "Show Less" : "View All Missions"}
            </button>
          </div>
        </div>

        {/* Completed */}
        <div className="bg-white rounded-3xl shadow-lg p-4 mb-16 md:mb-16">
          <h2 className="text-xl font-black mb-3">Completed</h2>

          <div
            className="
bg-gray-50
border
border-gray-200
rounded-3xl
p-4
shadow-sm
hover:shadow-lg
transition
"
          >
            ✅ {completedMissions} Missions Completed
          </div>
        </div>
      </div>
    </div>
  );
}

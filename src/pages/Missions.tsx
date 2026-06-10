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
    <div className="min-h-screen px-4 py-6 pb-6 pt-2 md:pb-8 md:pt-4 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-0 md:mb-2">
          <h1 className="text-4xl md:text-5xl font-black text-gray-800 dark:text-white">
            Missions
          </h1>
        </div>

        <div className="text-center mb-3 md:mb-4">
          <p className="text-gray-700 mt-2 text-lg font-semibold dark:text-white">
            Track your learning progress
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 md:gap-2 mb-4 md:mb-4 ">
          <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 text-center dark:bg-gray-700">
            <h2 className="text-2xl font-black dark:text-white">{totalMissions}</h2>

            <p className="text:black text-sm dark:text-white">Total</p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-4 text-center shadow-xl hover:shadow-2xl transition-all duration-300 dark:bg-gray-700">
            <h2 className="text-2xl font-black text-green-600">
              {completedMissions}
            </h2>

            <p className="text:black text-sm dark:text-white">Completed</p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-4 text-center shadow-xl hover:shadow-2xl transition-all duration-300 dark:bg-gray-700">
            <h2 className="text-2xl font-black text-orange-500">
              {remainingMissions}
            </h2>

            <p className="text:black text-sm dark:text-white">Remaining</p>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-3xl shadow-lg p-4 mb-4 md:mb-4 shadow-xl hover:shadow-2xl transition-all duration-300 dark:bg-gray-700">
          <div className="flex justify-between mb-3 font-bold dark:text-white">
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
        <div className="bg-white rounded-3xl shadow-lg p-4 mb-4 md:mb-4 shadow-xl hover:shadow-2xl transition-all duration-300 dark:bg-gray-700">
          <h2 className="text-xl font-black mb-4 dark:text-white">Active Missions</h2>

          <div className="grid md:grid-cols-3 gap-3 md:gap-2 dark:text-white">
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
    dark:bg-gray-600
  "
              >
                {mission}
              </div>
            ))}
          </div>

          <div className="text-center mt-4 md:mt-4">
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
        <div className="bg-white rounded-3xl shadow-lg p-4 mb-16 md:mb-16 shadow-xl hover:shadow-2xl transition-all duration-300 dark:bg-gray-700">
          <h2 className="text-xl font-black mb-3 dark:text-white">Completed</h2>

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
dark:text-white
dark:bg-gray-600
dark:border-0
"
          >
            ✅ {completedMissions} Missions Completed
          </div>
        </div>
      </div>
    </div>
  );
}

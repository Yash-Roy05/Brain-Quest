import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.tsx";
import { missions } from "../data/missions.ts";
import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper.tsx";
import { useEffect } from "react";

type Question = {
  question: string;
  answer: string;
};

type Mission = {
  id: number;
  title: string;
  reward: number;
  type?: string;
  questions?: Question[];
};

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    checkDailyStreak();
  }, []);

  const { user, checkDailyStreak } = useUser();

  const currentXP = user.xp % 50;

  const xpProgress = (currentXP / 50) * 100;

  const userMissions = (missions[user.age] || []).filter(
    (mission: Mission) => !user.completedMissions.includes(mission.id),
  );

  return (
    <PageWrapper>
      <div className="min-h-[250px] pb-24 md:pb-8 relative overflow-hidden bg-gradient-to-b from-sky-300 via-blue-400 to-green-300 p-6 min-h-[250px] pb-20 pt-4 md:pb-24 md:pt-5 dark:from-gray-900 dark:via-gray-900 dark:to-black">
        {/* 👤 User Info */}
        <div className="bg-white rounded-3xl shadow-2xl p-5 md:p-5 w-full max-w-7xl px-4 md:px-8 mx-auto mb-4 md:mb-4 dark:bg-gray-700">
          <div className="flex justify-between items-start p-6">
            <div className="flex items-center gap-2 md:gap-2">
              <div className="text-6xl">{user.avatar}</div>

              <div>
                <h1 className="text-3xl md:text-4xl font-black mb-0 dark:text-white">
                  Welcome, {user.name}
                </h1>

                <p className="opacity-80 dark:text-white">
                  Age Group: {user.age}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate("/parent-login")}
              className="
      bg-purple-500
      hover:bg-purple-600
      text-white
      px-4
      py-3
      rounded-xl
      font-bold
    "
            >
              🔒 Parent
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-0 md:gap-2 md:mt-0 ">
            {/* Level */}
            <div className="bg-green-100 p-4 rounded-2xl text-center dark:bg-gray-600">
              <h2 className="text-2xl md:text-3xl font-bold dark:text-white">
                {user.level}
              </h2>

              <p className="text:black dark:text-white">Level</p>
            </div>

            {/* Missions Completed */}
            <div className="bg-blue-100 p-4 rounded-2xl text-center dark:bg-gray-600">
              <h2 className="text-2xl md:text-3xl font-bold dark:text-white">
                {user.completedMissions.length}
              </h2>

              <p className="text:black dark:text-white">Missions</p>
            </div>

            {/* Daily Streak */}
            <div className="bg-purple-100 p-4 rounded-2xl text-center dark:bg-gray-600">
              <h3 className="text-2xl md:text-3xl font-bold dark:text-white">
                🔥 Daily Streak
              </h3>

              <p className="text-black dark:text-white">Coming Soon</p>
            </div>
          </div>
        </div>

        {/* 🎯 Missions */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl md:text-2xl font-black text-gray-800 dark:text-white">
              Available Missions
            </h1>
          </div>

          <div className="text-center mb-3 md:mb-4">
            <p className="text-gray-700 mt-0 text-lg font-semibold dark:text-white">
              Complete missions and earn rewards
            </p>
          </div>

          {userMissions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {userMissions.map((mission: Mission) => (
                <motion.div
                  key={mission.id}
                  initial={{
                    opacity: 0,
                    y: 50,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  whileHover={{
                    scale: 1.05,
                  }}
                  className="bg-white rounded-3xl shadow-xl p-6 dark:bg-gray-700"
                >
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 dark:text-white">
                    {mission.title}
                  </h3>

                  <p className="font-semibold text-lg mb-4 dark:text-white">
                    Reward: {mission.reward} 🪙
                  </p>

                  <motion.button
                    whileHover={{
                      scale: 1.05,
                    }}
                    whileTap={{
                      scale: 0.9,
                    }}
                    onClick={() => {
                      if (mission.type === "quiz") {
                        navigate("/mission", {
                          state: mission,
                        });
                      } else if (mission.type === "memory") {
                        navigate("/memory-game", {
                          state: mission,
                        });
                      } else if (mission.type === "difference") {
                        navigate("/difference-game", {
                          state: mission,
                        });
                      } else if (mission.type === "dragdrop") {
                        navigate("/dragdrop-game", {
                          state: mission,
                        });
                      } else if (mission.type === "word") {
                        navigate("/wordpuzzle-game", {
                          state: mission,
                        });
                      } else if (mission.type === "pattern") {
                        navigate("/pattern-memory", {
                          state: mission,
                        });
                      } else if (mission.type === "codebreaker") {
                        navigate("/code-breaker", {
                          state: mission,
                        });
                      } else if (mission.type === "sudoku") {
                        navigate("/sudoku-lite");
                      } else if (mission.type === "reflex-tap") {
                        navigate("/reflex-tap");
                      } else if (mission.type === "speedmath") {
                        navigate("/speedmath-game", {
                          state: mission,
                        });
                      } else if (mission.type === "activity") {
                        navigate("/mission", {
                          state: mission,
                        });
                      }
                    }}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl text-base md:text-lg font-semibold transition duration-300 "
                  >
                    Start Mission
                  </motion.button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-2xl mx-auto mt-3 md:mt-4 dark:bg-gray-700">
              <h2 className="text-3xl font-bold text-purple-700 mb-3">
                More Missions Coming Soon!
              </h2>

              <p className="text-green-600 text-lg">
                You completed all available missions. New challenges will be
                added soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}

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
      <div className="min-h-[250px] pb-40 relative overflow-hidden bg-gradient-to-b from-sky-300 via-blue-400 to-green-300 p-6 min-h-[250px] pb-28">
        {/* 👤 User Info */}
        <div className="bg-white rounded-3xl shadow-2xl p-4 md:p-8 w-full max-w-7xl px-4 md:px-8 mx-auto mb-8">
          {/* Avatar + Welcome */}
          <div className=" rounded-3xl p-6 text-black mb-6">
            <div className="flex items-center gap-4">
              <div className="text-6xl">{user.avatar}</div>

              <div>
                <h1 className="text-3xl md:text-4xl font-black">
                  Welcome, {user.name}
                </h1>

                <p className="opacity-80">Age Group: {user.age}</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {/* Level */}
            <div className="bg-green-100 p-4 rounded-2xl text-center">
              <h2 className="text-2xl md:text-3xl font-bold">{user.level}</h2>

              <p>Level</p>
            </div>

            {/* Missions Completed */}
            <div className="bg-blue-100 p-4 rounded-2xl text-center">
              <h2 className="text-2xl md:text-3xl font-bold">
                {user.completedMissions.length}
              </h2>

              <p>Missions</p>
            </div>

            {/* Daily Streak */}
            <div className="bg-purple-100 p-4 rounded-2xl text-center">
              <h3 className="text-2xl md:text-3xl font-bold">
                🔥 Daily Streak
              </h3>

              <p className="text-gray-500">Coming Soon</p>
            </div>
          </div>
        </div>

        {/* 🎯 Missions */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 text-center">
            Available Missions
          </h2>

          <p className="text-center text-white/90 mb-6 text-sm md:text-lg">
            Complete missions and earn rewards
          </p>

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
                className="bg-white rounded-3xl shadow-xl p-6"
              >
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
                  {mission.title}
                </h3>

                <p className="font-semibold text-lg mb-4">
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
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl text-base md:text-lg font-semibold transition duration-300"
                >
                  Start Mission 🚀
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

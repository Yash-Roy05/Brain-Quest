import { useUser } from "../context/UserContext.tsx";

export default function Missions() {
  const { user } = useUser();

  const missions = [
    {
      title: "Play 3 Games",
      progress: 80,
      reward: 100,
      completed: false,
      emoji: "🎮",
      color: "from-pink-400 to-rose-500",
    },

    {
      title: "Earn 500 XP",
      progress: 50,
      reward: 200,
      completed: false,
      emoji: "⚡",
      color: "from-cyan-400 to-blue-500",
    },

    {
      title: "Complete Sudoku",
      progress: 100,
      reward: 300,
      completed: true,
      emoji: "🧠",
      color: "from-purple-400 to-fuchsia-500",
    },

    {
      title: "Win 5 Times",
      progress: 30,
      reward: 150,
      completed: false,
      emoji: "🏆",
      color: "from-orange-400 to-pink-500",
    },
  ];

  return (
    <div className="min-h-screen px-4 py-6 pb-40">
      {/* Title */}
      <div className="text-center mb-8">
        <h1
          className="
          text-4xl
          md:text-5xl
          font-black
          text-yellow-600
        "
        >
          🏆 Missions
        </h1>

        <p
          className="
          text-gray-600
          font-semibold
          mt-2
          text-sm
          md:text-lg
        "
        >
          Complete missions & collect rewards 🚀
        </p>
      </div>

      {/* User Rewards */}
      <div
        className="
        bg-white
        rounded-[30px]
        shadow-2xl
        p-5
        mb-8
        flex
        justify-around
        items-center
      "
      >
        <div className="text-center">
          <div className="text-3xl">🪙</div>

          <div
            className="
            font-black
            text-xl
            text-yellow-600
          "
          >
            {user.coins}
          </div>

          <div className="text-sm font-bold">Coins</div>
        </div>

        <div className="text-center">
          <div className="text-3xl">⚡</div>

          <div
            className="
            font-black
            text-xl
            text-cyan-600
          "
          >
            {user.xp}
          </div>

          <div className="text-sm font-bold">XP</div>
        </div>
      </div>

      {/* Missions */}
      <div className="space-y-6">
        {missions.map((mission, index) => (
          <div
            key={index}
            className={`
              bg-gradient-to-r
              ${mission.color}
              rounded-[30px]
              p-5
              shadow-2xl
              text-white
              relative
              overflow-hidden
            `}
          >
            {/* Glow */}
            <div
              className="
              absolute
              -top-10
              -right-10
              w-32
              h-32
              bg-white/20
              rounded-full
              blur-3xl
            "
            />

            <div className="relative z-10">
              {/* Top */}
              <div
                className="
                flex
                justify-between
                items-center
                mb-4
              "
              >
                <div>
                  <h2
                    className="
                    text-2xl
                    font-black
                  "
                  >
                    {mission.emoji} {mission.title}
                  </h2>

                  <p
                    className="
                    font-semibold
                    text-white/90
                    mt-1
                  "
                  >
                    Reward: 🪙 {mission.reward}
                  </p>
                </div>

                {mission.completed ? (
                  <div
                    className="
                    bg-green-500
                    px-4
                    py-2
                    rounded-2xl
                    font-black
                  "
                  >
                    ✅ Done
                  </div>
                ) : (
                  <div
                    className="
                    bg-white/20
                    px-4
                    py-2
                    rounded-2xl
                    font-black
                  "
                  >
                    {mission.progress}%
                  </div>
                )}
              </div>

              {/* Progress */}
              <div
                className="
                w-full
                h-5
                bg-white/20
                rounded-full
                overflow-hidden
              "
              >
                <div
                  className="
                    h-5
                    bg-white
                    rounded-full
                    transition-all
                    duration-700
                  "
                  style={{
                    width: `${mission.progress}%`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

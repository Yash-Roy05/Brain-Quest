import { useNavigate } from "react-router-dom";

export default function Games() {
  const navigate = useNavigate();

  const games = [
    {
      title: "Find Difference",
      emoji: "🕵️",
      difficulty: "Easy",
      reward: 50,
      route: "/difference-game",
    },

    {
      title: "Drag & Drop",
      emoji: "🧩",
      difficulty: "Easy",
      reward: 60,
      color: "from-cyan-400 to-blue-500",
      route: "/dragdrop-game",
    },

    {
      title: "Word Puzzle",
      emoji: "🔤",
      difficulty: "Medium",
      reward: 100,
      color: "from-purple-400 to-fuchsia-500",
      route: "/wordpuzzle-game",
    },

    {
      title: "Pattern Memory",
      emoji: "🧠",
      difficulty: "Medium",
      reward: 120,
      color: "from-orange-400 to-pink-500",
      route: "/pattern-memory",
    },

    {
      title: "Code Breaker",
      emoji: "🔐",
      difficulty: "Hard",
      reward: 150,
      color: "from-green-400 to-emerald-500",
      route: "/code-breaker",
    },

    {
      title: "Sudoku Lite",
      emoji: "🎯",
      difficulty: "Hard",
      reward: 200,
      color: "from-yellow-400 to-orange-500",
      route: "/sudoku-lite",
    },
  ];

  return (
    <div className="min-h-screen px-6 py-6 pb-4 pt-2 md:pb-4 md:pt-4">
      {/* Title */}
      <div className="text-center mb-5 md:mb-6">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-black text-gray-800 dark:text-white">
            Game Zone
          </h1>
        </div>

        <div className="text-center mb-3 md:mb-2">
          <p className="text-gray-700 mt-2 text-lg font-semibold dark:text-white">
            Play games & earn rewards
          </p>
        </div>
      </div>

      {/* Cards */}
      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-4
        md:gap-4
        mb-20
      "
      >
        {games.map((game, index) => (
          <div
            key={index}
            className="
bg-white
rounded-3xl
p-5
min-h-[280px]
shadow-lg
hover:shadow-2xl
hover:-translate-y-2
transition-all
duration-300
dark:bg-gray-700
"
          >
            {/* Emoji */}
            <div
              className="
    w-16
    h-16
    mx-auto
    mb-3 
    md:mb-3
    rounded-full
    bg-blue-50
    flex
    items-center
    justify-center
    text-3xl
  "
            >
              {game.emoji}
            </div>

            {/* Title */}
            <h2
              className="
    text-xl
    font-black
    text-gray-800
    mb-3 
    md:mb-3
    text-center
    dark:text-white
  "
            >
              {game.title}
            </h2>

            {/* Difficulty */}
            <div className="flex justify-center mb-3">
              <div
                className="
      bg-blue-100
      text-blue-700
      px-4
      py-1
      rounded-full
      text-sm
      font-bold
      dark:text-white
      dark:bg-gray-500
    "
              >
                ⭐ {game.difficulty}
              </div>
            </div>

            {/* Reward */}
            <div className="text-gray-500 mb-3 md:mb-3 text-center dark:text-white">
              Reward • {game.reward} Coins
            </div>

            {/* Button */}
            <button
              onClick={() => navigate(game.route)}
              className="
  bg-blue-500
  hover:bg-blue-600
  text-white
  w-full
  py-2.5
  rounded-2xl
  font-bold
  transition
  hover:scale-105
"
            >
              Play Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

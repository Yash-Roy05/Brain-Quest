import { useNavigate } from "react-router-dom";

export default function Games() {

  const navigate = useNavigate();

  const games = [

    {
      title: "Find Difference",
      emoji: "🕵️",
      difficulty: "Easy",
      reward: 50,
      color: "from-pink-400 to-rose-500",
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

    <div className="min-h-screen px-4 py-6 pb-40">

      {/* Title */}
      <div className="text-center mb-8">

        <h1 className="
          text-4xl
          md:text-5xl
          font-black
          text-purple-700
        ">

          🎮 Games Zone

        </h1>

        <p className="
          text-gray-600
          font-semibold
          mt-2
          text-sm
          md:text-lg
        ">

          Play games & earn rewards 

        </p>

      </div>

      {/* Cards */}
      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-6
      ">

        {games.map((game, index) => (

          <div
            key={index}
            className={`
              bg-gradient-to-br
              ${game.color}
              rounded-[30px]
              p-6
              shadow-2xl
              text-white
              relative
              overflow-hidden
              hover:scale-105
              transition
              duration-300
            `}
          >

            {/* Glow */}
            <div className="
              absolute
              -top-10
              -right-10
              w-32
              h-32
              bg-white/20
              rounded-full
              blur-3xl
            " />

            {/* Emoji */}
            <div className="
              text-6xl
              mb-4
              relative
              z-10
            ">

              {game.emoji}

            </div>

            {/* Title */}
            <h2 className="
              text-2xl
              font-black
              mb-3
              relative
              z-10
            ">

              {game.title}

            </h2>

            {/* Difficulty */}
            <div className="
              bg-white/20
              inline-block
              px-4
              py-1
              rounded-full
              text-sm
              font-bold
              mb-3
              relative
              z-10
            ">

              ⭐ {game.difficulty}

            </div>

            {/* Reward */}
            <div className="
              text-lg
              font-bold
              mb-5
              relative
              z-10
            ">

              🪙 Reward: {game.reward}

            </div>

            {/* Button */}
            <button
              onClick={() =>
                navigate(game.route)
              }
              className="
                bg-white
                text-black
                w-full
                py-3
                rounded-2xl
                font-black
                text-lg
                hover:scale-105
                active:scale-95
                transition
                relative
                z-10
              "
            >

              Play Now 🚀

            </button>

          </div>

        ))}

      </div>

    </div>

  );

}
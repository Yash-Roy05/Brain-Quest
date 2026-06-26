import { useUser } from "../context/UserContext.tsx";

export default function Header() {
  const { user } = useUser();

  return (
    <header className="bg-yellow-400 shadow-lg px-3 py-3">
      {user.name && (
        <div className="flex items-center justify-center gap-3">
          {/* Profile */}
          <div
            className="
              bg-white
              rounded-2xl
              shadow-md
              h-20
              w-28
              md:w-40
              flex
              items-center
              justify-center
              gap-2
            "
          >
            <div className="text-3xl md:text-4xl">
              {user.avatar}
            </div>

            <div className="leading-tight">
              <p className="font-bold text-sm md:text-lg truncate">
                {user.name}
              </p>

              <p className="text-gray-500 text-xs md:text-sm">
                Level {user.level}
              </p>
            </div>
          </div>

          {/* Coins */}
          <div
            className="
              bg-white
              rounded-2xl
              shadow-md
              h-20
              w-28
              md:w-40
              flex
              items-center
              justify-center
              font-bold
              text-xl
            "
          >
            🪙 {user.coins}
          </div>

          {/* XP */}
          <div
            className="
              bg-white
              rounded-2xl
              shadow-md
              h-20
              w-28
              md:w-40
              flex
              items-center
              justify-center
              font-bold
              text-xl
            "
          >
            ⚡ {user.xp} XP
          </div>
        </div>
      )}
    </header>
  );
}
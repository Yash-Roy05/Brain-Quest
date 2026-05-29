import { useUser } from "../context/UserContext.tsx";

export default function Header() {
  const { user } = useUser();

  return (
    <header className="bg-yellow-400 shadow-lg px-4 md:px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
      {/* Logo */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Brain Quest</h1>

        <p className="text-sm font-medium">Learn & Play </p>
      </div>

      {/* User Section */}
      {user.name && (
        <div className="flex items-center justify-center gap-2 md:gap-4 overflow-x-auto w-full md:w-auto pb-2">
          {/* Avatar + Name */}
          <div className="bg-white w-28 h-16 rounded-2xl shadow flex items-center justify-center font-semibold">
            <div className="text-3xl">{user.avatar}</div>

            <div>
              <p className="font-bold">{user.name}</p>

              <p className="text-sm text-gray-500">Level {user.level}</p>
            </div>
          </div>

          {/* Coins */}
          <div className="bg-white min-w-[110px] h-16 rounded-2xl shadow flex items-center justify-center text-lg font-semibold">
            🪙 {user.coins}
          </div>

          {/* XP */}
          <div className="bg-white min-w-[110px] h-16 rounded-2xl shadow flex items-center justify-center text-lg font-semibold">
            ⚡ {user.xp} XP
          </div>
        </div>
      )}
    </header>
  );
}

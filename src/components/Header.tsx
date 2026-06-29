import { useUser } from "../context/UserContext.tsx";

export default function Header() {
  const { user } = useUser();

  return (
    <header className="bg-yellow-400 shadow-lg px-8 py-3 md:px-4 md:py-4 flex flex-col md:flex-row justify-between items-center gap-4 ">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-4xl shadow-lg">
            {user.avatar}
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold">{user.name}</h2>

            <p className="text-sm opacity-80">
              Keep learning and earning rewards
            </p>
          </div>
        </div>

        <div className="flex gap-3 flex-wrap justify-center">
          <div className="bg-white px-4 py-3 rounded-2xl shadow-md">
            🏆 Level {user.level}
          </div>

          <div className="bg-white px-4 py-3 rounded-2xl shadow-md">
            🪙 {user.coins}
          </div>

          <div className="bg-white px-4 py-3 rounded-2xl shadow-md">
            ⚡ {user.xp} XP
          </div>
        </div>
      </div>
    </header>
  );
}

import { useUser } from "../context/UserContext.tsx";
import fox from "../assets/avatars/fox.png";
import frog from "../assets/avatars/frog.png";
import lion from "../assets/avatars/lion.png";
import monkey from "../assets/avatars/monkey.png";
import panda from "../assets/avatars/panda.png";
import tiger from "../assets/avatars/tiger.png";

const avatarImages: Record<string, string> = {
  fox,
  frog,
  lion,
  monkey,
  panda,
  tiger,
};

export default function Header() {
  const { user } = useUser();

  return (
    <header className="bg-yellow-400 shadow-lg px-8 py-3 md:px-4 md:py-4 flex flex-col md:flex-row justify-between items-center gap-4 ">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg overflow-hidden">
            <img
              src={avatarImages[user.avatar]}
              alt={user.avatar}
              className="w-full h-full object-cover"
            />
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

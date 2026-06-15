import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.tsx";

export default function ParentDashboard() {
  const navigate = useNavigate();

  const { user } = useUser();

  return (
    <div className="min-h-screen pb-10 pt-8 md:pt-18 bg-gradient-to-r from-blue-400 to-purple-500 p-4 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-5 md:p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-black text-purple-700">
              Parent Dashboard
            </h1>

            <button
              onClick={() => navigate("/dashboard")}
              className="
              bg-green-500
              hover:bg-green-600
              text-white
              px-5
              py-3
              rounded-xl
              font-bold
              "
            >
              Back
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <div className="bg-green-100 p-5 rounded-2xl">
              <h2 className="font-bold text-xl">Child Name</h2>

              <p className="text-2xl">{user.name}</p>
            </div>

            <div className="bg-blue-100 p-5 rounded-2xl">
              <h2 className="font-bold text-xl">Age Group</h2>

              <p className="text-2xl">{user.age}</p>
            </div>

            <div className="bg-yellow-100 p-5 rounded-2xl">
              <h2 className="font-bold text-xl">Level</h2>

              <p className="text-2xl">{user.level}</p>
            </div>

            <div className="bg-purple-100 p-5 rounded-2xl">
              <h2 className="font-bold text-xl">Coins</h2>

              <p className="text-2xl">{user.coins}</p>
            </div>

            <div className="bg-pink-100 p-5 rounded-2xl">
              <h2 className="font-bold text-xl">XP</h2>

              <p className="text-2xl">{user.xp}</p>
            </div>

            <div className="bg-orange-100 p-5 rounded-2xl">
              <h2 className="font-bold text-xl">Missions</h2>

              <p className="text-2xl">{user.completedMissions.length}</p>
            </div>
            <div className="bg-cyan-100 p-5 rounded-2xl">
              <h2 className="font-bold text-xl">Screen Time Today</h2>

              <p className="text-2xl">{user.screenTimeToday} min</p>
            </div>
          </div>

          <div className="mt-8 bg-gray-100 rounded-2xl p-5">
            <h2 className="text-2xl font-bold mb-2">🔑 Parent PIN</h2>

            <p>Change PIN feature coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}

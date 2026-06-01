import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.tsx";
import PageWrapper from "../components/PageWrapper.tsx";

export default function Profile() {
  const navigate = useNavigate();

  const { user } = useUser();

  const currentLevelXP = user.xp % 50;
  const progress = (currentLevelXP / 50) * 100;

  return (
    <PageWrapper>
        
  <div className="min-h-screen bg-gradient-to-b from-blue-400 via-purple-300 to-pink-300 p-4 md:p-8 ">
    
    <div className="max-w-4xl mx-auto pb-36">

      {/* Profile Card */}
      <div className="bg-white rounded-[35px] shadow-2xl p-8 text-center mb-6">

        <div className="text-7xl mb-4">
          {user.avatar}
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-gray-800">
          {user.name}
        </h1>

        <p className="text-lg text-gray-500 mt-2">
          Age Group: {user.age}
        </p>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

        <div className="bg-white rounded-3xl shadow-xl p-5 text-center">
          <div className="text-3xl">🪙</div>
          <div className="font-black text-2xl">
            {user.coins}
          </div>
          <div className="text-gray-500">
            Coins
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-5 text-center">
          <div className="text-3xl">⚡</div>
          <div className="font-black text-2xl">
            {user.xp}
          </div>
          <div className="text-gray-500">
            XP
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-5 text-center">
          <div className="text-3xl">🏆</div>
          <div className="font-black text-2xl">
            {user.level}
          </div>
          <div className="text-gray-500">
            Level
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-5 text-center">
          <div className="text-3xl">🔥</div>
          <div className="font-black text-2xl">
            {user.streak}
          </div>
          <div className="text-gray-500">
            Streak
          </div>
        </div>

      </div>

      {/* XP Progress */}
      <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">

        <div className="flex justify-between mb-3 font-bold">

          <span>Level Progress 🚀</span>

          <span>{Math.floor(progress)}%</span>

        </div>

        <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden">

          <div
            className="h-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

      {/* Mission Progress */}
      <div className="bg-white rounded-3xl shadow-xl p-6 text-center mb-0">

        <h2 className="text-2xl font-black mb-3">

          Missions Completed

        </h2>

        <div className="text-4xl font-black text-green-600">

          {user.completedMissions.length}

        </div>

      </div>


    </div>

  </div>

   </PageWrapper>
  );
}
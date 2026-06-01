import { useNavigate } from "react-router-dom";

export default function Footer() {

  const navigate = useNavigate();

  return (

    <div className="
      fixed
      bottom-0
      left-0
      right-0
      z-50
      px-0
      pb-0
    ">
 
      <div className="
        bg-white/90
        backdrop-blur-xl
        shadow-2xl
        
        flex
        justify-around
        items-center
        py-3
      ">

        <button
          onClick={() => navigate("/dashboard")}
          className="flex flex-col items-center text-purple-700 font-bold"
        >
          <span className="text-2xl">🏠</span>
          <span className="text-xs">Home</span>
        </button>

        <button
          onClick={() => navigate("/games")}
          className="flex flex-col items-center text-pink-600 font-bold"
        >
          <span className="text-2xl">🎮</span>
          <span className="text-xs">Games</span>
        </button>

        <button
          onClick={() => navigate("/missions")}
          className="flex flex-col items-center text-yellow-600 font-bold"
        >
          <span className="text-2xl">🏆</span>
          <span className="text-xs">Missions</span>
        </button>

        <button
          onClick={() => navigate("/Profile")}
          className="flex flex-col items-center text-cyan-600 font-bold"
        >
          <span className="text-2xl">👤</span>
          <span className="text-xs">Profile</span>
        </button>

      </div>

    </div>

  );

}
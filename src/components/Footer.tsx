import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  const location = useLocation();

  return (
    <div
      className="
      fixed
      bottom-0
      left-0
      right-0
      z-50
      px-0
      pb-0
    "
    >
      <div
        className="
        bg-white/90
        backdrop-blur-xl
        shadow-2xl
        flex
        justify-around
        items-center
        py-2
        dark:bg-gray-700
      "
      >
        <button
          onClick={() => navigate("/dashboard")}
          className="relative flex flex-col items-center font-bold"
        >
          <span className="text-2xl dark:w-10 dark:h-10 dark:rounded-full dark:bg-yellow-100 dark:flex dark:items-center dark:justify-center">🏠</span>
          <span
            className={`text-xs dark:text-white ${
              location.pathname === "/dashboard"
                ? "text-blue-600"
                : "text-gray-500"
            }`}
          >
            Home
          </span>

          {location.pathname === "/dashboard" && (
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-1 bg-blue-600 rounded-full animate-footerLine" />
          )}
        </button>

        <button
          onClick={() => navigate("/games")}
          className="relative flex flex-col items-center font-bold"
        >
          <span className="text-2xl dark:w-10 dark:h-10 dark:rounded-full dark:bg-blue-100 dark:flex dark:items-center dark:justify-center">🎮</span>
          <span
            className={`text-xs dark:text-white ${
              location.pathname === "/games" ? "text-blue-600" : "text-gray-500"
            }`}
          >
            Games
          </span>

          {location.pathname === "/games" && (
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-1 bg-blue-600 rounded-full animate-footerLine" />
          )}
        </button>

        <button
          onClick={() => navigate("/missions")}
          className="relative flex flex-col items-center font-bold"
        >
          <span className="text-2xl dark:w-10 dark:h-10 dark:rounded-full dark:bg-orange-100 dark:flex dark:items-center dark:justify-center">🏆</span>
          <span
            className={`text-xs dark:text-white ${
              location.pathname === "/missions"
                ? "text-blue-600"
                : "text-gray-500"
            }`}
          >
            Missions
          </span>

          {location.pathname === "/missions" && (
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-1 bg-blue-600 rounded-full animate-footerLine" />
          )}
        </button>

        <button
          onClick={() => navigate("/Profile")}
          className="relative flex flex-col items-center font-bold"
        >
          <span className="text-2xl dark:w-10 dark:h-10 dark:rounded-full dark:bg-red-100 dark:flex dark:items-center dark:justify-center text-2xl">👤</span>
          <span
            className={`text-xs dark:text-white ${
              location.pathname === "/Profile"
                ? "text-blue-600"
                : "text-gray-500"
            }`}
          >
            Profile
          </span>

          {location.pathname === "/Profile" && (
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-1 bg-blue-600 rounded-full animate-footerLine" />
          )}
        </button>
      </div>
    </div>
  );
}

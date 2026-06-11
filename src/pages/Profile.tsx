import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.tsx";
import PageWrapper from "../components/PageWrapper.tsx";
import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext.tsx";

export default function Profile() {
  const navigate = useNavigate();

  const [isSaving, setIsSaving] = useState(false);

  const { user, setUser } = useUser();

  const currentLevelXP = user.xp % 50;
  const progress = (currentLevelXP / 50) * 100;

  const [showSettings, setShowSettings] = useState(false);

  const [showEditProfile, setShowEditProfile] = useState(false);
  const [newName, setNewName] = useState(user.name);
  const [newAvatar, setNewAvatar] = useState(user.avatar);
  const [newAge, setNewAge] = useState(user.age);

  // dark/light mode
  const { darkMode, setDarkMode } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "d") {
        e.preventDefault();

        setDarkMode(!darkMode);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setDarkMode]);

  // about us
  const [showAbout, setShowAbout] = useState(false);

  // contact us
  const [showContact, setShowContact] = useState(false);

  const avatars = ["🐼", "🦊", "🦁", "🐸", "🐵", "🐯"];

  const handleSaveProfile = () => {
    setIsSaving(true);

    setTimeout(() => {
      setUser((prev) => {
        const updatedProfiles = {
          ...prev.savedProfiles,

          [prev.age]: {
            coins: prev.coins,
            xp: prev.xp,
            level: prev.level,
            completedMissions: prev.completedMissions,
          },
        };

        const newAgeProfile = updatedProfiles[newAge];

        return {
          ...prev,

          name: newName,
          avatar: newAvatar,
          age: newAge,

          coins: newAgeProfile?.coins ?? 0,
          xp: newAgeProfile?.xp ?? 0,
          level: newAgeProfile?.level ?? 1,
          completedMissions: newAgeProfile?.completedMissions ?? [],

          savedProfiles: updatedProfiles,
        };
      });

      setIsSaving(false);
      setShowEditProfile(false);
    }, 1000);
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-b from-blue-400 via-purple-300 to-pink-300 dark:from-gray-900 dark:via-gray-900 dark:to-black px-4 pt-4 pb-6 md:px-8 md:pt-4 md:pb-8">
        <div className="max-w-4xl mx-auto pb-16 md:pb-14">
          {/* Profile Card */}

          <div className="relative bg-white rounded-[35px] shadow-2xl px-8 py-5 text-center mb-4 md:mb-4 dark:bg-gray-700">
            <div className="text-7xl mb-2">{user.avatar}</div>

            <button
              onClick={() => setShowSettings(true)}
              className="absolute top-5 left-4 bg-gray-100 hover:bg-gray-200 p-3 rounded-full text-xl dark:bg-gray-600"
            >
              ⚙️
            </button>

            <h1 className="text-3xl md:text-4xl font-black text-gray-800 mb-1 dark:text-white">
              {user.name}
            </h1>

            <p className="text-lg text-gray-500 mb-1 dark:text-white">
              Age Group: {user.age}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4 md:mb-4">
            <div className="bg-white rounded-3xl shadow-xl p-5 text-center dark:bg-gray-700">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-yellow-100 flex items-center justify-center text-3xl">
                🪙
              </div>
              <div className="font-black text-2xl dark:text-white">
                {user.coins}
              </div>
              <div className="text-gray-500 dark:text-white">Coins</div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-5 text-center dark:bg-gray-700">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-blue-100 flex items-center justify-center text-3xl">
                ⚡
              </div>
              <div className="font-black text-2xl dark:text-white">
                {user.xp}
              </div>
              <div className="text-gray-500 dark:text-white">XP</div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-5 text-center dark:bg-gray-700">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-orange-100 flex items-center justify-center text-3xl">
                🏆
              </div>
              <div className="font-black text-2xl dark:text-white">
                {user.level}
              </div>
              <div className="text-gray-500 dark:text-white">Level</div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-5 text-center dark:bg-gray-700">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-red-100 flex items-center justify-center text-3xl">
                🔥
              </div>
              <div className="font-black text-2xl dark:text-white">
                {user.streak}
              </div>
              <div className="text-gray-500 dark:text-white">Streak</div>
            </div>
          </div>

          {/* XP Progress */}
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-4 md:mb-4 dark:bg-gray-700">
            <div className="flex justify-between mb-3 font-bold dark:text-white">
              <span>Level Progress</span>

              <span>{Math.floor(progress)}%</span>
            </div>

            <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden ">
              <div
                className="h-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>

          {/* Mission Progress */}
          <div className="bg-white rounded-3xl shadow-xl p-6 text-center mb-0 md:mb-0 dark:bg-gray-700">
            <h2 className="text-2xl font-black mb-3 dark:text-white">
              Missions Completed
            </h2>

            <div className="text-4xl font-black text-green-600 ">
              {user.completedMissions.length}
            </div>
          </div>
        </div>
      </div>

      {showSettings && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-40 "
            onClick={() => setShowSettings(false)}
          />

          {/* Drawer */}
          <div
            className="
        fixed
        top-0
        left-0
        h-full
        w-[75%]
        max-w-sm
        bg-white
        shadow-2xl
        z-50
        p-6
        animate-slideIn
        dark:bg-gray-700
        dark:twxt-white
      "
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black dark:text-white">Settings</h2>

              <button
                onClick={() => setShowSettings(false)}
                className="text-2xl dark:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => {
                  setShowEditProfile(true);
                  setShowSettings(false);
                }}
                className="w-full text-left p-4 rounded-2xl bg-gray-100 dark:text-white dark:bg-gray-600"
              >
                👤 Edit Profile
              </button>

              <button
                onClick={() => alert("🔥 DAILY STREAK feature coming soon!")}
                className="w-full text-left p-4 rounded-2xl bg-gray-100 dark:text-white dark:bg-gray-600"
              >
                🔥 Streak Details
              </button>

              <button
                onClick={() => alert(" ACHIEVEMENTS feature coming soon!")}
                className="w-full text-left p-4 rounded-2xl bg-gray-100 dark:text-white dark:bg-gray-600"
              >
                🏆 Achievements
              </button>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="w-full text-left p-4 rounded-2xl bg-gray-100 dark:text-white dark:bg-gray-600"
              >
                {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </button>

              <button
                onClick={() => setShowAbout(true)}
                className="w-full text-left p-4 rounded-2xl bg-gray-100 dark:text-white dark:bg-gray-600"
              >
                ℹ️ About Brain Quest
              </button>

              <button
                onClick={() => setShowContact(true)}
                className="w-full text-left p-4 rounded-2xl bg-gray-100 dark:text-white dark:bg-gray-600"
              >
                📩 Contact Us
              </button>
            </div>
          </div>
        </>
      )}

      {showEditProfile && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-50"
            onClick={() => setShowEditProfile(false)}
          />

          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 ">
            <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-md dark:bg-gray-800">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black dark:text-white">
                  Edit Profile
                </h2>

                <button
                  onClick={() => setShowEditProfile(false)}
                  className="text-2xl dark:text-white"
                >
                  ✕
                </button>
              </div>

              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-2xl p-3 mb-6 dark:text-whit dark:bg-gray-800 dark:text-white"
              />

              <select
                value={newAge}
                onChange={(e) => setNewAge(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-2xl p-3 mb-6 dark:bg-gray-800 dark:text-white"
              >
                <option value="8-10">8-10 Years</option>

                <option value="11-13">11-13 Years</option>

                <option value="14-15">14-15 Years</option>
              </select>

              <div className="flex justify-center gap-3 flex-wrap mb-6">
                {avatars.map((avatar) => (
                  <button
                    key={avatar}
                    onClick={() => setNewAvatar(avatar)}
                    className={`text-4xl p-3 rounded-2xl  ${
                      newAvatar === avatar ? "bg-blue-500" : "bg-gray-100"
                    }`}
                  >
                    {avatar}
                  </button>
                ))}
              </div>

              <button
                onClick={handleSaveProfile}
                disabled={isSaving}
                className="w-full bg-green-500 text-white py-3 rounded-2xl font-bold"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </>
      )}

      {showAbout && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-50"
            onClick={() => setShowAbout(false)}
          />

          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center dark:bg-gray-700">
              <div className="text-5xl mb-4">🧠</div>

              <h2 className="text-2xl font-black mb-4 dark:text-white">
                About Brain Quest
              </h2>

              <p className="text-gray-600 dark:text-white">
                Brain Quest is a fun learning platform designed to improve
                memory, focus, logic, and problem-solving skills through
                interactive games.
              </p>

              <button
                onClick={() => setShowAbout(false)}
                className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}

      {showContact && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-50"
            onClick={() => setShowContact(false)}
          />

          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center dark:bg-gray-700">
              <div className="text-5xl mb-4">📩</div>

              <h2 className="text-2xl font-black mb-4 dark:text-white">
                Contact Us
              </h2>

              <p className="text-gray-600 mb-2 dark:text-white">
                Email: support@brainquest.com
              </p>

              <p className="text-gray-600 dark:text-white">
                Instagram: @brainquest
              </p>

              <button
                onClick={() => setShowContact(false)}
                className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </PageWrapper>
  );
}

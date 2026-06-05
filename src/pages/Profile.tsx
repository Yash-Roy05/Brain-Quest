import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.tsx";
import PageWrapper from "../components/PageWrapper.tsx";
import { useState } from "react";

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

  // about us
  const [showAbout, setShowAbout] = useState(false);

  // contact us
  const [showContact, setShowContact] = useState(false);

  const avatars = ["🐼", "🦊", "🦁", "🐸", "🐵", "🐯"];

  const handleSaveProfile = () => {
    setIsSaving(true);

    setTimeout(() => {
      setUser((prev) => ({
        ...prev,
        name: newName,
        avatar: newAvatar,
      }));

      setIsSaving(false);
      setShowEditProfile(false);
    }, 1000);
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-b from-blue-400 via-purple-300 to-pink-300 p-4 md:p-8 ">
        <div className="max-w-4xl mx-auto pb-36">
          {/* Profile Card */}

          <div className="relative bg-white rounded-[35px] shadow-2xl p-8 text-center mb-6">
            <div className="text-7xl mb-4">{user.avatar}</div>

            <button
              onClick={() => setShowSettings(true)}
              className="
    absolute
    top-5
    left-4
    bg-gray-100
    hover:bg-gray-200
    p-3
    rounded-full
    text-xl
  "
            >
              ⚙️
            </button>

            <h1 className="text-3xl md:text-4xl font-black text-gray-800">
              {user.name}
            </h1>

            <p className="text-lg text-gray-500 mt-2">Age Group: {user.age}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-3xl shadow-xl p-5 text-center">
              <div className="text-3xl">🪙</div>
              <div className="font-black text-2xl">{user.coins}</div>
              <div className="text-gray-500">Coins</div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-5 text-center">
              <div className="text-3xl">⚡</div>
              <div className="font-black text-2xl">{user.xp}</div>
              <div className="text-gray-500">XP</div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-5 text-center">
              <div className="text-3xl">🏆</div>
              <div className="font-black text-2xl">{user.level}</div>
              <div className="text-gray-500">Level</div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-5 text-center">
              <div className="text-3xl">🔥</div>
              <div className="font-black text-2xl">{user.streak}</div>
              <div className="text-gray-500">Streak</div>
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
            <h2 className="text-2xl font-black mb-3">Missions Completed</h2>

            <div className="text-4xl font-black text-green-600">
              {user.completedMissions.length}
            </div>
          </div>
        </div>
      </div>

      {showSettings && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
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
      "
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black">Settings</h2>

              <button
                onClick={() => setShowSettings(false)}
                className="text-2xl"
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
                className="w-full text-left p-4 rounded-2xl bg-gray-100"
              >
                👤 Edit Profile
              </button>

              <button
                onClick={() => alert("🔥 DAILY STREAK feature coming soon!")}
                className="w-full text-left p-4 rounded-2xl bg-gray-100"
              >
                🔥 Streak Details
              </button>

              <button
                onClick={() => alert(" ACHIEVEMENTS feature coming soon!")}
                className="w-full text-left p-4 rounded-2xl bg-gray-100"
              >
                🏆 Achievements
              </button>

              <button
                onClick={() => alert("DARK MODE feature coming soon!")}
                className="w-full text-left p-4 rounded-2xl bg-gray-100"
              >
                🌙 Dark Mode
              </button>

              <button
                onClick={() => setShowAbout(true)}
                className="w-full text-left p-4 rounded-2xl bg-gray-100"
              >
                ℹ️ About Brain Quest
              </button>

              <button
                onClick={() => setShowContact(true)}
                className="w-full text-left p-4 rounded-2xl bg-gray-100"
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

          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-md">
              <h2 className="text-2xl font-black mb-6 text-center">
                Edit Profile
              </h2>

              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-2xl p-3 mb-6"
              />

              <div className="flex justify-center gap-3 flex-wrap mb-6">
                {avatars.map((avatar) => (
                  <button
                    key={avatar}
                    onClick={() => setNewAvatar(avatar)}
                    className={`text-4xl p-3 rounded-2xl ${
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
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center">
              <div className="text-5xl mb-4">🧠</div>

              <h2 className="text-2xl font-black mb-4">About Brain Quest</h2>

              <p className="text-gray-600">
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
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center">
              <div className="text-5xl mb-4">📩</div>

              <h2 className="text-2xl font-black mb-4">Contact Us</h2>

              <p className="text-gray-600 mb-2">
                Email: support@brainquest.com
              </p>

              <p className="text-gray-600">Instagram: @brainquest</p>

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
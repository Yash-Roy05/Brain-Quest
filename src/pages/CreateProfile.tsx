import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.tsx";
import PageWrapper from "../components/PageWrapper.tsx";

export default function Profile() {
  const navigate = useNavigate();

  const { setUser } = useUser();

  // 🧍 Avatar List
  const avatars = ["🐼", "🦊", "🦁", "🐸", "🐵", "🐯"];

  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  // ⭐ Selected Avatar
  const [avatar, setAvatar] = useState("🐼");

  const handleStart = () => {
    if (!name || !age) {
      alert("Please enter all details ❗");
      return;
    }

setUser({
  name,
  age,
  coins: 0,
  xp: 0,
  level: 1,
  completedMissions: [],
  avatar,

  streak: 1,
  lastLoginDate: new Date().toDateString(),
});

    navigate("/dashboard");
  };

  return (
    <PageWrapper>
      <div className="flex items-center justify-center py-10 px-4 bg-gradient-to-r from-blue-400 to-purple-500 min-h-[80vh] pb-28 ">
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full max-w-xl text-center">
          {/* Hero Avatar */}
          <div className="mb-6">
            <div className="text-7xl mb-3">{avatar}</div>

            <h1 className="text-3xl md:text-5xl font-black text-purple-700">
              Brain Quest
            </h1>

            <p className="text-gray-500 mt-2">
              Create your learning profile 🚀
            </p>
          </div>

          {/* Name Input */}
          <input
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-50 border-2 border-gray-100 rounded-3xl p-4 text-lg shadow-sm focus:outline-none focus:border-purple-500 mb-4"
          />
          

          {/* Age Group */}
          <select
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full bg-gray-50 border-2 border-gray-100 rounded-3xl p-4 text-lg shadow-sm focus:outline-none focus:border-purple-500 mb-4"
          >
            <option value="">Select Age Group</option>

            <option value="8-10">8-10</option>

            <option value="11-13">11-13</option>

            <option value="14-15">14-15</option>
          </select>

          {/* 🧍 Avatar Selection */}
          <div className="mb-8">
            <h2 className="text-lg md:text-xl font-bold mb-4 text-center">
              Choose Your Avatar
            </h2>

            <div className="flex justify-center gap-3 flex-wrap">
              {avatars.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setAvatar(item)}
                  className={`
text-5xl
w-20
h-20
flex
items-center
justify-center
rounded-3xl
transition-all
duration-300
shadow-md ${
                    avatar === item
                      ? "bg-blue-500 scale-110"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={handleStart}
            className="
w-full
bg-gradient-to-r
from-yellow-400
to-orange-500
hover:scale-105
active:scale-95
transition
duration-300
text-xl
font-black
py-4
rounded-3xl
shadow-xl
text-white
"
          >
            Start Adventure
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}

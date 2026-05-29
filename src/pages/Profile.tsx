import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.tsx";
import PageWrapper from "../components/PageWrapper.tsx";

export default function Profile() {

  const navigate = useNavigate();

  const { setUser } = useUser();

  // 🧍 Avatar List
  const avatars = [
    "🐼",
    "🦊",
    "🦁",
    "🐸",
    "🐵",
    "🐯",
  ];

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
    });

    navigate("/dashboard");

  };

  return (
    <PageWrapper>

      <div className="flex items-center justify-center py-10 px-4 bg-gradient-to-r from-blue-400 to-purple-500 min-h-[80vh]">

        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full max-w-xl text-center">

          {/* Title */}
          <h1 className="text-2xl md:text-4xl font-bold text-center mb-6">
            Create Your Profile 
          </h1>

          <p className="text-gray-500 mb-8 text-lg">
            Start your learning adventure 
          </p>

          {/* Name Input */}
          <input
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-2xl p-3 md:p-4 text-base md:text-lg mb-5 focus:outline-none focus:border-purple-500"
          />

          {/* Age Group */}
          <select
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-2xl p-3 md:p-4 text-base md:text-lg mb-8 focus:outline-none focus:border-purple-500"
          >

            <option value="">
              Select Age Group
            </option>

            <option value="8-10">
              8-10
            </option>

            <option value="11-13">
              11-13
            </option>

            <option value="14-15">
              14-15
            </option>

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
                  className={`text-4xl p-3 rounded-2xl transition duration-300 ${
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
            className="w-full bg-yellow-400 hover:bg-yellow-500 hover:scale-105 active:scale-95 transition duration-300 text-lg md:text-xl font-bold py-3 md:py-4 rounded-2xl"
          >
            Start Adventure 
          </button>

        </div>

      </div>

    </PageWrapper>
  );
}
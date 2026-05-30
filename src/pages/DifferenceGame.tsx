import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.tsx";
import PageWrapper from "../components/PageWrapper.tsx";
import jungle1 from "../assets/difference/jungle1.png";
import jungle2 from "../assets/difference/jungle2.png";

export default function DifferenceGame() {
  const navigate = useNavigate();

  const { user, setUser, addCoins, addXP } = useUser();

  // ✅ Found Differences
  const [found, setFound] = useState<number[]>([]);
  const [hearts, setHearts] = useState(3);

  // 🎯 Click Difference
  const handleFind = (id: number) => {
    if (!found.includes(id)) {
      setFound((prev) => [...prev, id]);
    }
  };

  // ❌ Wrong Click
  const handleWrongClick = () => {
    if (hearts > 0) {
      setHearts((prev) => prev - 1);
    }
  };

  // 🎉 Complete Game
  useEffect(() => {
    if (found.length === 3) {

      // 🪙 Add Rewards
      addCoins(50);

      addXP(25);

      // ✅ Save Mission
      setUser((prev) => ({
        ...prev,

        completedMissions: [
          ...prev.completedMissions,
          101,
        ],
      }));

      // 🎊 Success Message
      setTimeout(() => {
        alert("Difference Game Completed 🎉");

        navigate("/dashboard");

      }, 700);
    }
  }, [found]);

  // 💔 Game Over
  useEffect(() => {
    if (hearts === 0) {

      alert("Game Over 😢");

      navigate("/dashboard");
    }
  }, [hearts]);

  return (
    <PageWrapper>
      
      <div className="min-h-screen pb-28 bg-gradient-to-b from-sky-300 via-blue-200 to-green-300 flex items-center justify-center p-4 md:p-10 relative overflow-x-hidden">

        {/* ☁ Clouds */}
        <div className="absolute top-10 left-10 w-32 h-16 bg-white rounded-full opacity-60"></div>

        <div className="absolute top-16 left-20 w-20 h-20 bg-white rounded-full opacity-60"></div>

        <div className="absolute top-10 right-20 w-40 h-20 bg-white rounded-full opacity-60"></div>

        {/* 🌳 Hills */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-green-400 rounded-t-[100%]"></div>

        {/* Main Card */}
        <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-4 md:p-10 w-full max-w-5xl text-center">

          {/* Title */}
          <h1 className="text-3xl md:text-6xl font-bold mb-4">
            Find the Difference 🔍
          </h1>

          <p className="text-base md:text-lg text-gray-600 mb-6">
            Find 3 hidden differences!
          </p>

          {/* ❤️ Hearts */}
          <div className="text-4xl mb-4">
            {"❤️".repeat(hearts)}
          </div>

          {/* 🎯 Progress */}
          <div className="mb-6 text-xl font-bold text-purple-700">
            Found: {found.length}/3 🎯
          </div>

          {/* 🖼 Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">

            {/* Left Image */}
            <div className="relative">
              <img
                src={jungle1}
                alt="Jungle Left"
                className="w-full h-auto rounded-3xl shadow-xl"
              />
            </div>

            {/* Right Image */}
            <div
              className="relative"
              onClick={handleWrongClick}
            >

              <img
                src={jungle2}
                alt="Jungle Right"
                className="w-full h-auto rounded-3xl shadow-xl"
              />

              {/* 🦜 Bird Difference */}
              <button
                onClick={(e) => {
                  e.stopPropagation();

                  handleFind(1);
                }}
                className={`absolute top-[28%] right-[20%] z-20 w-8 h-8 md:w-5 md:h-5 rounded-full transition duration-300 ${
                  found.includes(1)
                    ? "bg-green-500 border-4 border-white opacity-100 scale-110"
                    : "opacity-0 hover:opacity-20 hover:bg-white"
                }`}
              />

              {/* 🌸 Flower Difference */}
              <button
                onClick={(e) => {
                  e.stopPropagation();

                  handleFind(2);
                }}
                className={`absolute bottom-[8%] left-[15%] z-20 w-8 h-8 md:w-5 md:h-5 rounded-full transition duration-300 ${
                  found.includes(2)
                    ? "bg-green-500 border-4 border-white opacity-100 scale-110"
                    : "opacity-0 hover:opacity-20 hover:bg-white"
                }`}
              />

              {/* ☁ Cloud Difference */}
              <button
                onClick={(e) => {
                  e.stopPropagation();

                  handleFind(3);
                }}
                className={`absolute top-[16%] right-[12%] z-20 w-8 h-8 md:w-5 md:h-5 rounded-full transition duration-300 ${
                  found.includes(3)
                    ? "bg-green-500 border-4 border-white opacity-100 scale-110"
                    : "opacity-0 hover:opacity-20 hover:bg-white"
                }`}
              />

            </div>

          </div>

        </div>

      </div>

    </PageWrapper>
  );
}